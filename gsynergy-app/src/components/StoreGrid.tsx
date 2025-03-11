import React, { useEffect, useState, JSX } from "react";
import * as XLSX from "xlsx";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ClientSideRowModelModule, ColDef } from "ag-grid-community";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import GridItem from "./GridItem/GridItem";
import "./GridItem/AgGrid.css";
const StoreGrid = () => {
  interface RowData {
    "S.No": number;
    Store: string;
    City: string;
    State: string;
  }

  const [rowData, setRowData] = useState<RowData[]>([]); // Data for the AG Grid
  interface ColumnDef extends ColDef {
    field: string;
    headerName: string;
    width?: number;
    flex?: number;
    sortable?: boolean;
    filter?: boolean;
    editable?: boolean;
    cellRenderer?: (params: any) => JSX.Element;
  }

  const columnDefs: ColumnDef[] = [
    {
      headerName: "",
      field: "drag",
      width: 60,
      cellRenderer: () => <DragIndicatorIcon />
    },
    {
      headerName: "S.No",
      field: "S.No",
      sortable: true,
      filter: true,
      width: 80
    },
    {
      headerName: "Store",
      field: "Store",
      sortable: true,
      filter: true,
      editable: true,
      flex: 1
    },
    {
      headerName: "City",
      field: "City",
      sortable: true,
      filter: true,
      editable: true,
      flex: 1
    },
    {
      headerName: "State",
      field: "State",
      sortable: true,
      filter: true,
      editable: true,
      flex: 1
    },
    {
      headerName: "",
      field: "delete",
      width: 60,
      cellRenderer: (params) => (
        <DeleteIcon
          style={{ cursor: "pointer", color: "red" }}
          onClick={() => onRemove(params)}
        />
      )
    }
  ];

  // Load and parse the Excel file on component mount
  useEffect(() => {
    fetch("/assets/SampleData.xlsx") // Fetch the Excel file from public folder
      .then((response) => response.arrayBuffer()) // Read it as array buffer
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" }); // Parse workbook
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]; // Get the first sheet
        const jsonData = XLSX.utils.sheet_to_json<RowData>(firstSheet); // Convert sheet to JSON
        setRowData(jsonData as RowData[]); // Set data to be displayed in AG Grid
      })
      .catch((error) => console.error("Error loading Excel file:", error));
  }, []);

  // Handle removing a row from the AG Grid
  const onRemove = (params: any) => {
    const newData = rowData.filter((row) => row !== params.data);
    setRowData(newData);
  };
  const [gridApi, setGridApi] = useState(null);

  const RowSelectionType = "single";

  function onGridReady(params: { api: any; columnApi: any }) {
    setGridApi(params.api);
  }

  return (
    <div>
      <div
        className="ag-theme-alpine"
        style={{ height: "500px", width: "100%", padding: "20px" }}
      >
        <GridItem
          onGridReady={onGridReady}
          rowData={rowData}
          rowSelection={RowSelectionType}
          columnDefs={columnDefs}
          pagination={false}
          rowDragManaged={true} // Enable row reordering
          animateRows={true}
          modules={[ClientSideRowModelModule]}
          suppressMovableColumns={true}
        />
        {/* <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowDragManaged={true} // Enable row reordering
          animateRows={true}
          modules={[ClientSideRowModelModule]}
          suppressMovableColumns={true} // Prevent column dragging
        /> */}
      </div>
      <button
        style={{
          backgroundColor: "#f97316",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        New Store
      </button>
    </div>
  );
};

export default StoreGrid;
