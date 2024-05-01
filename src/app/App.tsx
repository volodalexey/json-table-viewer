import React, { useEffect, useState } from "react";
import { Table } from "../widgets/table/Table";
import { FileInput } from "@/shared/ui/FileInput";
import { TTransformed, transformData } from "@/shared/lib/transform";
import { parseData } from "@/shared/lib/parse";

export function App() {
  const [rawData, setRawData] = useState("");
  const [parsedData, setParsedData] = useState<TTransformed>({
    columns: new Map(),
    data: [],
  });
  useEffect(() => {
    const result = parseData(rawData);
    if (result.success) {
      const transformed = transformData(result.returned);
      setParsedData(transformed);
    }
  }, [rawData]);
  return (
    <>
      <FileInput setRawData={setRawData} />
      <span>Total: [{parsedData.data.length}]</span>
      <Table parsedData={parsedData} />
    </>
  );
}
