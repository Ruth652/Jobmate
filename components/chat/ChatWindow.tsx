"use client"; 
import { useState } from "react";
import MessageList from '@/components/chat/MessageList'
import ChatInput from "./ChatInput";
import { FiDownload } from "react-icons/fi";
export default function CVUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [useTextarea, setUseTextarea] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUseTextarea(false); 
    }
  };
  const handleAnalyze = () => {
    if (useTextarea && text.trim() !== "") {
      console.log("Analyzing text:", text);
    } else if (file) {
      console.log("Analyzing file:", file.name);
    } else {
      alert("Please provide a CV either by typing or uploading a file.");
    }
  };
  return (
    <div className="bg-teal-50 p-4 rounded-lg mt-2">
      <MessageList/>
      <div className="flex gap-2 mb-2">
        <button
          className="px-4 py-2 border rounded"
          onClick={() => setUseTextarea(!useTextarea)}
        >
          Type/Paste
        </button>

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

      {useTextarea ? (
        <textarea
          className="w-full border-2 rounded p-2 h-[200px] resize-none"
          placeholder="Paste your CV here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <div className="border-2 border-dashed rounded p-6 text-center">
          {file ? (
            <p>{file.name}</p>
          ) : (
             <div className="flex flex-col items-center">
              <FiDownload size={50} className="text-gray-500" />
            <p className="text-gray-500">Drag files to upload…</p></div>
          )}
        </div>
      )}

      <button
        className="mt-4 w-full px-4 py-2 bg-teal-500 text-white rounded"
        onClick={handleAnalyze}
      >Analyze My CV
      </button>
       <ChatInput />
    </div>
  );
}
