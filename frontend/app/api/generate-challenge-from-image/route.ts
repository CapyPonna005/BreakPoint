import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { checkRateLimit } from "@/lib/rateLimit";

type Difficulty = "Easy" | "Medium" | "Hard";

const SYSTEM_PROMPT = `You are BreakPoint's challenge generator. BreakPoint is a coding practice platform where users learn by debugging real code, not writing from scratch.

You will be given a screenshot containing code. First, carefully read the code from the image. Then:
1. Introduce exactly ONE realistic, findable bug into the code (an off-by-one error, a wrong comparison operator, a swapped variable, a missing edge case, etc.) — never something contrived or impossible to reasonably find.
2. Write a "description" that explains what the code is SUPPOSED to do, without revealing what the bug is or where it is.
3. Write 2-3 sensible "constraints" (rules the user must follow while fixing it, e.g. "do not change the function signature").
4. Write 1-2 "examples" showing input/expected-output pairs that demonstrate the CORRECT (bug-free) behavior.
5. Choose a short, clear "title" describing the challenge (not "Fix the bug", something specific like "Fix the Off-by-One Loop").
6. Set "tags" — 1-3 short lowercase topic words relevant to the code (e.g. "loops", "arrays", "recursion").
7. Return the buggy version of the code as "starterCode" — this is what the user will see and need to fix.

If the image does not contain readable code, respond with:
{ "error": "No readable code found in the image." }

Otherwise, respond with ONLY valid JSON matching this exact shape, no other text:
{
  "title": string,
  "blurb": string (one short sentence teaser),
  "description": string,
  "tags": string[],
  "constraints": string[],
  "examples": [{ "input": string, "output": string }],
  "starterCode": string
}`;

export async function POST(request: NextRequest) {
  const identifier = request.headers.get("x-forwarded-for") ?? "anonymous";
  const rateLimit = checkRateLimit(identifier);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: `Too many requests. Please try again in ${rateLimit.retryAfterSeconds} seconds.` },
      { status: 429 }
    );
  }

  const formData = await request.formData();
  const image = formData.get("image") as File | null;
  const difficulty = formData.get("difficulty") as Difficulty | null;

  if (!image) {
    return NextResponse.json(
      { error: "No image provided." },
      { status: 400 }
    );
  }

  if (!difficulty) {
    return NextResponse.json(
      { error: "No difficulty provided." },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(await image.arrayBuffer());
    const base64Image = buffer.toString("base64");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const result = await model.generateContent([
      `${SYSTEM_PROMPT}\n\nDifficulty: ${difficulty}`,
      {
        inlineData: {
          mimeType: image.type,
          data: base64Image,
        },
      },
    ]);

    const text = result.response.text();
    const generated = JSON.parse(text);

    if (generated.error) {
      return NextResponse.json({ error: generated.error }, { status: 422 });
    }

    return NextResponse.json({ ...generated, difficulty });
  } catch (error) {
    console.error("Gemini vision generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate challenge from image." },
      { status: 500 }
    );
  }
}