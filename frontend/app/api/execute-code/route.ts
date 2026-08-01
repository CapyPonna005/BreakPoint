import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";

const glotLanguageMap: Record<string, { language: string; version: string }> = {
  JavaScript: { language: "javascript", version: "latest" },
  TypeScript: { language: "typescript", version: "latest" },
  Python: { language: "python", version: "latest" },
  Java: { language: "java", version: "latest" },
  "C++": { language: "cpp", version: "latest" },
  "C#": { language: "csharp", version: "latest" },
};

export async function POST(request: NextRequest) {
  const identifier = request.headers.get("x-forwarded-for") ?? "anonymous";
  const rateLimit = checkRateLimit(identifier);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: `Too many requests. Please try again in ${rateLimit.retryAfterSeconds} seconds.` },
      { status: 429 }
    );
  }

  const { code, language, stdin } = await request.json();

  const glotLang = glotLanguageMap[language];
  if (!glotLang) {
    return NextResponse.json(
      { error: `Unsupported language: ${language}` },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://glot.io/api/run/${glotLang.language}/${glotLang.version}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${process.env.GLOT_API_TOKEN}`,
        },
        body: JSON.stringify({
          files: [{ name: fileNameForLanguage(language), content: code }],
          stdin: stdin ?? "",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`glot.io returned ${response.status}`);
    }

    const result = await response.json();

    return NextResponse.json({
      stdout: result.stdout ?? "",
      stderr: result.stderr ?? "",
      error: result.error ?? null,
    });
  } catch (error) {
    console.error("Code execution error:", error);
    return NextResponse.json(
      { error: "Failed to execute code." },
      { status: 500 }
    );
  }
}

function fileNameForLanguage(language: string): string {
  const extensions: Record<string, string> = {
    JavaScript: "main.js",
    TypeScript: "main.ts",
    Python: "main.py",
    Java: "Main.java",
    "C++": "main.cpp",
    "C#": "main.cs",
  };
  return extensions[language] ?? "main.txt";
}