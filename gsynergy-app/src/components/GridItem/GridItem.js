import React, { ReactElement, FC, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MenuItem, Select, Typography, Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ClientSideRowModelModule } from "ag-grid-community";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0075ff",
      contrastText: "#FFFFFF"
    }
  }
});
const rowHeight = 40;

const GridItem = (props) => {
  const [gotData, setGotData] = React.useState(false);
  const [type, setType] = React.useState("");
  console.log("props", props);
  useEffect(() => {}, []);

  const handleChange = (event, value) => {
    props.setPage(value);
  };

  const getRowStyle = (params) => {
    if (params.node.rowIndex % 2 != 0) {
      return { background: "#F8F8F8" };
    }
  };

  return (
    <div
      className={
        props.height == "main"
          ? "ag-theme-alpine grid-container-home"
          : "ag-theme-alpine grid-container"
      }
    >
      fgbfgv fgb gf cfgv bf
      <AgGridReact
        ref={props.gridRef}
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
        onSelectionChanged={props.onSelectionChanged}
        modules={props.modules}
        localeText={props.localeText}
        // rowModelType="serverSide"
        // modules={[ClientSideRowModelModule]}
        // serverSideStoreType="partial"
        onFilterChanged={props.onFilterChanged}
        rowDragManaged={props.rowDragManaged}
        animateRows={props.animateRows}
        suppressMovableColumns={props.suppressMovableColumns}
      />
      {props.pagination != false && (
        <ThemeProvider theme={theme}>
          <Pagination
            count={props.count}
            shape="rounded"
            color="primary"
            onChange={handleChange}
            page={props.page}
          />
        </ThemeProvider>
      )}
    </div>
  );
};

export default GridItem;
