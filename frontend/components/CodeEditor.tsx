"use client";

import Editor, { BeforeMount } from "@monaco-editor/react";
import { useTheme } from "@/context/ThemeContext";

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
      "editor.background": "#010409",
      "editor.lineHighlightBackground": "#161B22",
      "editorLineNumber.foreground": "#8B949E",
      "editorGutter.background": "#010409",
    },
  });

  monaco.editor.defineTheme("breakpoint-light", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#EDEAF6",
      "editor.lineHighlightBackground": "#FFFFFF",
      "editorLineNumber.foreground": "#7A7295",
      "editorGutter.background": "#EDEAF6",
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
  const { darkMode } = useTheme();

  return (
    <div className="w-full h-[300px] md:h-[400px] border border-border-subtle rounded-input overflow-hidden">
      <Editor
        height="100%"
        language={languageMap[language]}
        value={value}
        theme={darkMode ? "breakpoint-dark" : "breakpoint-light"}
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