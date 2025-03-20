import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ClientSideRowModelModule } from "ag-grid-community";
import GridItem from "../components/Commons/GridItem/GridItem";
import AddSkuForm from "../components/SkuGrid/AddSkuDialog";
import Loader from "../components/Commons/Loader";
import { SkuData } from "../components/SkuGrid/TypesDifination";
import { getSkuColumnDefs } from "../components/SkuGrid/columnDefs";

const SkuGrid: React.FC = () => {
  const [skuData, setSkuData] = useState<SkuData[]>([]);
  const [gridApi, setGridApi] = useState<any>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialNewSku] = useState<SkuData>({
    ID: 0,
    Label: "",
    Price: 0,
    Cost: 0,
  });
  const [newSku, setNewSku] = useState<SkuData>({ ...initialNewSku });

  useEffect(() => {
    loadSkuData();
  }, []);

  const loadSkuData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/assets/SampleData.xlsx");
      const data = await response.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[1]];
      const jsonData = XLSX.utils.sheet_to_json<SkuData>(firstSheet);

      const dataWithIds = jsonData.map((item, index) => ({
        ...item,
        ID: item.ID || index + 1,
      }));

      setSkuData(dataWithIds);
    } catch (error) {
      console.error("Error loading Excel file:", error);
    } finally {
      setLoading(false);
    }
  };

  // Event handlers
  const handleRemoveSku = (params: any) => {
    const newData = skuData.filter((row) => row !== params.data);
    // Update IDs after removal
    const updatedData = newData.map((row, index) => ({
      ...row,
      ID: index + 1,
    }));
    setSkuData(updatedData);
  };

  const handleAddSku = () => {
    const nextId =
      skuData.length > 0
        ? Math.max(...skuData.map((row) => Number(row.ID || 0))) + 1
        : 1;

    const skuToAdd = {
      ...newSku,
      ID: nextId,
    };

    setSkuData([...skuData, skuToAdd]);
    handleCloseDialog();
  };

  const handleOpenDialog = () => {
    setNewSku({ ...initialNewSku });
    setAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setAddDialogOpen(false);
    setNewSku({ ...initialNewSku });
  };

  const handleSkuInputChange = (field: keyof SkuData, value: any) => {
    setNewSku({
      ...newSku,
      [field]:
        field === "Price" || field === "Cost" ? parseFloat(value) : value,
    });
  };

  const handleCellValueChanged = (params: any) => {
    console.log("Cell value changed:", params);
    // Implement any validation or backend sync here if needed
  };

  const handleRowDragEnd = () => {
    if (gridApi) {
      const rowData: SkuData[] = [];
      gridApi.forEachNode((node: any) => {
        rowData.push(node.data);
      });

      // Update IDs
      const updatedData = rowData.map((row, index) => ({
        ...row,
        ID: index + 1,
      }));

      setSkuData(updatedData);
    }
  };

  const onGridReady = (params: { api: any; columnApi: any }) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  // Get column definitions
  const columnDefs = getSkuColumnDefs(handleRemoveSku);
  if (loading) {
    return <Loader message="Loading store data..." />;
  }
  return (
    <>
      <div
        className="ag-theme-alpine"
        style={{ height: "500px", width: "100%", padding: "20px" }}
      >
        <GridItem
          onGridReady={onGridReady}
          rowData={skuData}
          rowSelection="single"
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
          rowDragManaged={true}
          animateRows={true}
          modules={[ClientSideRowModelModule]}
          suppressMovableColumns={true}
          onCellValueChanged={handleCellValueChanged}
          onRowDragEnd={handleRowDragEnd}
          showAddButton={true}
          buttonText="New Sku"
          buttonPosition="bottom"
          onButtonClick={handleOpenDialog}
          buttonStyle={{
            marginTop: "10px",
          }}
        />
      </div>

      {/* Using the modular AddSkuForm component */}
      <AddSkuForm
        open={addDialogOpen}
        onClose={handleCloseDialog}
        onAdd={handleAddSku}
        skuData={newSku}
        onSkuChange={handleSkuInputChange}
      />
    </>
  );
};

export default SkuGrid;
