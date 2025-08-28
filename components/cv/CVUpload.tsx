"use client";

import { useState } from "react";
import { Button } from "../ui/Button";

export default function CVUpload() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    console.log("Analyzing file:", file.name);
  };
  return (
    <div className="bg-teal-50 p-4 rounded-lg mt-2">
      <div className="flex gap-2 mb-2">
        <Button variant="outline">Type/Paste</Button>
        <label className="px-4 py-2 border rounded cursor-pointer">
          Upload File
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
        </label>
      </div>

      <div className="border-2 border-dashed rounded p-6 text-center">
        {file ? (
          <p>{file.name}</p>
        ) : (
          <p className="text-gray-500">Drag files to upload…</p>
        )}
      </div>

      <Button onClick={handleAnalyze} className="mt-4 w-full">
        Analyze My CV
      </Button>
    </div>
  );
}
