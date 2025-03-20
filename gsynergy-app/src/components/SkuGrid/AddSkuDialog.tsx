import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { SkuData } from "./TypesDifination";

interface AddSkuFormProps {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
  skuData: SkuData;
  onSkuChange: (field: keyof SkuData, value: any) => void;
}

const AddSkuForm: React.FC<AddSkuFormProps> = ({
  open,
  onClose,
  onAdd,
  skuData,
  onSkuChange,
}) => {
  const formFields = [
    { label: "SKU Name", field: "Label", type: "text" },
    { label: "Price", field: "Price", type: "number" },
    { label: "Cost", field: "Cost", type: "number" },
  ];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New SKU</DialogTitle>
      <DialogContent>
        {formFields.map((field) => (
          <TextField
            key={field.field}
            margin="dense"
            label={field.label}
            fullWidth
            variant="outlined"
            type={field.type}
            value={skuData[field.field as keyof SkuData] || ""}
            onChange={(e) =>
              onSkuChange(field.field as keyof SkuData, e.target.value)
            }
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onAdd} color="primary" disabled={!skuData.Label}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSkuForm;
