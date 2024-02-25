import React, { useEffect, useState } from "react";

type Props = {
  setRawData?: (rawData: string) => void;
};

export function FileInput({ setRawData }: Props) {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [reading, setReading] = useState<FileReader | null>(null);
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = ({ target }) => {
        if (
          typeof setRawData === "function" &&
          target &&
          typeof target.result === "string"
        ) {
          setRawData(target.result);
        }
      };
      reader.onerror = (error) => {
        alert(error);
      };
      setReading(reading);
    }
  }, [setRawData, file, setReading]);
  return (
    <>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_input"
      >
        Select file or drop file
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
        disabled={Boolean(reading)}
        value={fileName}
        onChange={({ currentTarget: { value, files } }) => {
          setFileName(value);
          if (files?.length) {
            setFile(files[0]);
          } else {
            setFile(null);
          }
        }}
        onDrop={({ currentTarget: { value, files } }) => {
          setFileName(value);
          if (files?.length) {
            setFile(files[0]);
          } else {
            setFile(null);
          }
        }}
      />
    </>
  );
}
