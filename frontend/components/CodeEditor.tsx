"use client";

import Editor, { BeforeMount } from "@monaco-editor/react";

type CodeEditorProps = {
  language: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  fontSize?: number;
};

const languageMap: Record<string, string> = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  Python: "python",
  Java: "java",
  "C++": "cpp",
  "C#": "csharp",
};

const handleBeforeMount: BeforeMount = (monaco) => {
  monaco.editor.defineTheme("breakpoint-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#3A2650",
      "editor.lineHighlightBackground": "#452E5A",
      "editorLineNumber.foreground": "#A7A4C4",
      "editorGutter.background": "#3A2650",
    },
  });
};

export default function CodeEditor({
  language,
  value,
  onChange,
  readOnly = false,
  fontSize = 14,
}: CodeEditorProps) {
  return (
    <div className="w-full h-[300px] md:h-[400px] border border-border-subtle rounded-input overflow-hidden">
      <Editor
        height="100%"
        language={languageMap[language]}
        value={value}
        theme="breakpoint-dark"
        beforeMount={handleBeforeMount}
        onChange={(newValue) => onChange?.(newValue ?? "")}
        options={{
          minimap: { enabled: false },
          fontSize,
          readOnly,
        }}
      />
    </div>
  );
}