"use client";

import Editor from "@monaco-editor/react";

type CodeEditorProps = {
  language: string;
};

const languageMap: Record<string, string> = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  Python: "python",
};

export default function CodeEditor({ language }: CodeEditorProps) {
  return (
    <div className="w-full h-[300px] md:h-[400px] border rounded-lg overflow-hidden">
      <Editor
        height="100%"
        language={languageMap[language]}
        defaultValue={`function example() {\n  // your code here\n}`}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
    </div>
  );
}