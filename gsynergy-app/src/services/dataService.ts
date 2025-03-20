import * as XLSX from "xlsx";
import { RowData } from     "../components/StoreGrid/columnDefs";

export const loadExcelData = async (filePath: string): Promise<RowData[]> => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status}`);
    }
    
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json<RowData>(firstSheet);
    
    return jsonData;
  } catch (error) {
    console.error("Error loading Excel file:", error);
    throw error;
  }
};

export const updateSequenceNumbers = (data: RowData[]): RowData[] => {
  return data.map((row, index) => ({
    ...row,
    "Sno": index + 1,
  }));
};

export const getNextSequenceNumber = (data: RowData[]): number => {
  return data.length > 0
    ? Math.max(...data.map((row) => Number(row["Sno"]))) + 1
    : 1;
};