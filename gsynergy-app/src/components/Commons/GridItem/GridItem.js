import React, { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  MenuItem,
  Select,
  Typography,
  Pagination,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ClientSideRowModelModule } from "ag-grid-community";
import { provideGlobalGridOptions } from "ag-grid-community";
import "./AgGrid.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import AddIcon from "@mui/icons-material/Add";

// Register modules
ModuleRegistry.registerModules([AllCommunityModule]);
provideGlobalGridOptions({ theme: "legacy" });

const theme = createTheme({
  palette: {
    primary: {
      main: "#0075ff",
      contrastText: "#FFFFFF",
    },
  },
});

const rowHeight = 40;

const GridItem = (props) => {
  const [gotData, setGotData] = React.useState(false);
  const [type, setType] = React.useState("");
  const gridRef = useRef(null);

  const handleChange = (event, value) => {
    if (props.setPage) {
      props.setPage(value);
    }
  };

  const getRowStyle = (params) => {
    if (params.node.rowIndex % 2 !== 0) {
      return { background: "#F8F8F8" };
    }
    return null;
  };

  // Default button style that can be overridden by props
  const defaultButtonStyle = {
    backgroundColor: "#2f8a9c",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px 0",
  };

  // Render button based on props
  const renderButton = () => {
    if (!props.showAddButton) return null;

    return (
      <Button
        startIcon={<AddIcon />}
        style={{ ...defaultButtonStyle, ...(props.buttonStyle || {}) }}
        onClick={props.onButtonClick}
      >
        {props.buttonText || "Add"}
      </Button>
    );
  };

  return (
    <div
      className={
        props.height === "main"
          ? "ag-theme-alpine grid-container-home"
          : "ag-theme-alpine grid-container"
      }
    >
      {/* Top positioned button */}
      {props.showAddButton && props.buttonPosition === "top" && renderButton()}

      <AgGridReact
        ref={props.gridRef || gridRef}
        rowHeight={rowHeight}
        rowData={props.rowData}
        columnDefs={props.columnDefs}
        defaultColDef={props.defaultColDef}
        getRowStyle={getRowStyle}
        onGridReady={props.onGridReady}
        autoGroupColumnDef={props.autoGroupColumnDef}
        suppressRowClickSelection={props.suppressRowClickSelection}
        groupSelectsChildren={props.groupSelectsChildren}
        rowSelection={props.rowSelection}
        rowGroupPanelShow={props.rowGroupPanelShow}
        pivotPanelShow={props.pivotPanelShow}
        enableRangeSelection={props.enableRangeSelection}
        pagination={props.pagination}
        paginationPageSize={props.paginationPageSize}
        onSelectionChanged={props.onSelectionChanged}
        modules={props.modules}
        localeText={props.localeText}
        onFilterChanged={props.onFilterChanged}
        rowDragManaged={props.rowDragManaged}
        animateRows={props.animateRows}
        suppressMovableColumns={props.suppressMovableColumns}
        domLayout="autoHeight"
        onCellValueChanged={props.onCellValueChanged}
        onRowDragEnd={props.onRowDragEnd}
      />

      {props.showAddButton &&
        (!props.buttonPosition || props.buttonPosition === "bottom") &&
        renderButton()}
    </div>
  );
};

export default GridItem;
