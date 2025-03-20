import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { ColDef } from "ag-grid-community";

export interface ColumnDef extends ColDef {
  field: string;
  headerName: string;
  width?: number;
  flex?: number;
  sortable?: boolean;
  filter?: boolean;
  editable?: boolean;
  cellRenderer?: (params: any) => React.ReactElement;
  rowDrag?: boolean;
}

export const getSkuColumnDefs = (
  onRemove: (params: any) => void
): ColumnDef[] => [
  {
    headerName: "",
    field: "drag",
    width: 60,
    rowDrag: true,
    cellRenderer: () => (
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
    editable: false,
  },
  {
    headerName: "SKU",
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
