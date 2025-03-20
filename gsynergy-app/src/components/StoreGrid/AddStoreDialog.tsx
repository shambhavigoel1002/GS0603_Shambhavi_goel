import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { RowData } from "./columnDefs";

interface AddStoreDialogProps {
  open: boolean;
  onClose: () => void;
  newStore: RowData;
  setNewStore: React.Dispatch<React.SetStateAction<RowData>>;
  onAddStore: () => void;
}

const AddStoreDialog: React.FC<AddStoreDialogProps> = ({
  open,
  onClose,
  newStore,
  setNewStore,
  onAddStore,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Store</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Store Name"
          fullWidth
          variant="outlined"
          value={newStore.Label}
          onChange={(e) => setNewStore({ ...newStore, Label: e.target.value })}
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
          onChange={(e) => setNewStore({ ...newStore, State: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onAddStore} color="primary" disabled={!newStore.Label}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStoreDialog;
