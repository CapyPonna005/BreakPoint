"use client";

const languages = ["JavaScript", "TypeScript", "Python"];

type LanguageSelectorProps = {
  language: string;
  onChange: (language: string) => void;
};

export default function LanguageSelector({
  language,
  onChange,
}: LanguageSelectorProps) {
  return (
    <select
      value={language}
      onChange={(e) => onChange(e.target.value)}
      className="text-sm border rounded-md px-2 py-1 bg-white"
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
}