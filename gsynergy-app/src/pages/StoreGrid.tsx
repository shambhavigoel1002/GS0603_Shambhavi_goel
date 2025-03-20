import React, { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ClientSideRowModelModule } from "ag-grid-community";
import { RowData, createColumnDefs } from "../components/StoreGrid/columnDefs";
import AddStoreDialog from "../components/StoreGrid/AddStoreDialog";
import Loader from "../components/Commons/Loader";
import {
  loadExcelData,
  updateSequenceNumbers,
  getNextSequenceNumber,
} from "../services/dataService";
import GridItem from "../components/Commons/GridItem/GridItem";

const StoreGrid: React.FC = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [gridApi, setGridApi] = useState<any>(null);
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newStore, setNewStore] = useState<RowData>({
    Sno: 0,
    Label: "",
    City: "",
    State: "",
  });

  // Load data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await loadExcelData("/assets/SampleData.xlsx");
        setRowData(data);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle removing a row
  const onRemove = (params: any) => {
    const newData = rowData.filter((row) => row !== params.data);
    setRowData(updateSequenceNumbers(newData));
  };

  // Handle adding a new store
  const handleAddStore = () => {
    const nextSeqNo = getNextSequenceNumber(rowData);

    const storeToAdd = {
      Sno: nextSeqNo,
      Label: newStore.Label,
      City: newStore.City,
      State: newStore.State,
    };

    setRowData([...rowData, storeToAdd]);
    setAddDialogOpen(false);
    setNewStore({
      Sno: 0,
      Label: "",
      City: "",
      State: "",
    });
  };

  // Handle opening the add dialog
  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  // Handle cell value changes (editing)
  const onCellValueChanged = (params: any) => {
    console.log("Cell value changed:", params);
    // Add your validation or API call here if needed
  };

  // Handle row drag end for reordering
  const onRowDragEnd = () => {
    if (gridApi) {
      const currentData: RowData[] = [];
      gridApi.forEachNode((node: any) => {
        currentData.push(node.data);
      });
      setRowData(updateSequenceNumbers(currentData));
    }
  };

  // Grid ready event handler
  const onGridReady = (params: { api: any; columnApi: any }) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  // Create column definitions with the onRemove callback
  const columnDefs = createColumnDefs(onRemove);
  console.log(columnDefs, "columnDefs", rowData);
  if (loading) {
    return <Loader message="Loading store data..." />;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
        <h3>Error</h3>
        <p>{error}</p>
        <button
          style={{
            backgroundColor: "#f97316",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
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
          showAddButton={true}
          buttonText="New Store"
          buttonPosition="bottom"
          onButtonClick={handleOpenAddDialog}
          buttonStyle={{
            marginTop: "10px",
            backgroundColor: "#2f8a9c",
          }}
        />
      </div>

      <AddStoreDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        newStore={newStore}
        setNewStore={setNewStore}
        onAddStore={handleAddStore}
      />
    </>
  );
};

export default StoreGrid;
