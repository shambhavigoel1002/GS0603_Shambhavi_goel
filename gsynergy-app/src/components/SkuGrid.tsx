import React, { useEffect, useState, JSX } from "react";
import * as XLSX from "xlsx";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ClientSideRowModelModule, ColDef } from "ag-grid-community";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import GridItem from "./GridItem/GridItem";
import "./GridItem/AgGrid.css";

const SkuGrid = () => {
  interface RowData {
    "Seq No."?: number;
    Label?: string;
    City?: string;
    State?: string;
    [key: string]: any;
  }

  const [rowData, setRowData] = useState<RowData[]>([]);
  const [gridApi, setGridApi] = useState<any>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newStore, setNewStore] = useState<RowData>({
    "Seq No.": 0,
    Label: "",
    City: "",
    State: "",
  });

  interface ColumnDef extends ColDef {
    field: string;
    headerName: string;
    width?: number;
    flex?: number;
    sortable?: boolean;
    filter?: boolean;
    editable?: boolean;
    cellRenderer?: (params: any) => JSX.Element;
    rowDrag?: boolean;
  }

  const columnDefs: ColumnDef[] = [
    {
      headerName: "",
      field: "drag",
      width: 60,
      rowDrag: true, // Enable row dragging
      cellRenderer: (params) => (
        <DragIndicatorIcon style={{ cursor: "grab", color: "grey" }} />
      ),
    },
    {
      headerName: "",
      field: "delete",
      width: 60,
      cellRenderer: (params) => (
        <DeleteIcon
          style={{ cursor: "pointer", color: "grey" }}
          onClick={() => onRemove(params)}
        />
      ),
    },
    {
      headerName: "Id",
      field: "ID",
      sortable: true,
      filter: true,
      width: 80,
      editable: false, // Make sequence number not editable
    },
    {
      headerName: "Store",
      field: "Label",
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
    },
    {
      headerName: "Price",
      field: "Price",
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
    },
    {
      headerName: "Cost",
      field: "Cost",
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
    },
  ];

  // Load and parse the Excel file on component mount
  useEffect(() => {
    fetch("/assets/SampleData.xlsx")
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[1]];
        const jsonData = XLSX.utils.sheet_to_json<RowData>(firstSheet);
        setRowData(jsonData);
      })
      .catch((error) => console.error("Error loading Excel file:", error));
  }, []);

  // Handle removing a row from the AG Grid
  const onRemove = (params: any) => {
    const newData = rowData.filter((row) => row !== params.data);
    // Update sequence numbers after removal
    const updatedData = newData.map((row, index) => ({
      ...row,
      "Seq No.": index + 1,
    }));
    setRowData(updatedData);
  };

  // Handle adding a new store
  const handleAddStore = () => {
    const nextSeqNo =
      rowData.length > 0
        ? Math.max(...rowData.map((row) => Number(row["Seq No."]))) + 1
        : 1;

    const storeToAdd = {
      "Seq No.": nextSeqNo,
      Label: newStore.Label,
      City: newStore.City,
      State: newStore.State,
      Price: newStore.Price || 0,
      Cost: newStore.Cost || 0,
    };

    setRowData([...rowData, storeToAdd]);
    setAddDialogOpen(false);
    setNewStore({
      "Seq No.": 0,
      Label: "",
      City: "",
      State: "",
      Price: 0,
      Cost: 0,
    });
  };

  // Handle cell value changes (editing)
  const onCellValueChanged = (params: any) => {
    // You can add validation here if needed
    console.log("Cell value changed:", params);

    // If you need to sync the data with a backend, you could make an API call here
  };

  // Handle row drag end for reordering
  const onRowDragEnd = (params: any) => {
    // Get the new order of rows
    if (gridApi) {
      const rowData: RowData[] = [];
      gridApi.forEachNode((node: any) => {
        rowData.push(node.data);
      });

      // Update sequence numbers
      const updatedData = rowData.map((row, index) => ({
        ...row,
        "Seq No.": index + 1,
      }));

      setRowData(updatedData);
    }
  };

  function onGridReady(params: { api: any; columnApi: any }) {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  }

  return (
    <>
      <div
        className="ag-theme-alpine"
        style={{ height: "500px", width: "100%", padding: "20px" }}
      >
        <GridItem
          onGridReady={onGridReady}
          rowData={rowData}
          rowSelection="single"
          columnDefs={columnDefs}
          pagination={false}
          rowDragManaged={true}
          animateRows={true}
          modules={[ClientSideRowModelModule]}
          suppressMovableColumns={true}
          onCellValueChanged={onCellValueChanged}
          onRowDragEnd={onRowDragEnd}
        />
      </div>

      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <Button
          startIcon={<AddIcon />}
          style={{
            backgroundColor: "#f97316",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => setAddDialogOpen(true)}
        >
          New SKU
        </Button>
      </div>

      {/* Add Store Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add New Store</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Store Name"
            fullWidth
            variant="outlined"
            value={newStore.Label}
            onChange={(e) =>
              setNewStore({ ...newStore, Label: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="City"
            fullWidth
            variant="outlined"
            value={newStore.City}
            onChange={(e) => setNewStore({ ...newStore, City: e.target.value })}
          />
          <TextField
            margin="dense"
            label="State"
            fullWidth
            variant="outlined"
            value={newStore.State}
            onChange={(e) =>
              setNewStore({ ...newStore, State: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Price"
            fullWidth
            variant="outlined"
            type="number"
            value={newStore.Price}
            onChange={(e) =>
              setNewStore({ ...newStore, Price: parseFloat(e.target.value) })
            }
          />
          <TextField
            margin="dense"
            label="Cost"
            fullWidth
            variant="outlined"
            type="number"
            value={newStore.Cost}
            onChange={(e) =>
              setNewStore({ ...newStore, Cost: parseFloat(e.target.value) })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAddStore}
            color="primary"
            disabled={!newStore.Label}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SkuGrid;
