import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

export const AddEditModal = ({ isOpen, onClose, isEditing, onSubmit, nodeName, setNodeName }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{isEditing ? "Edit Node" : "Add Node"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Node Name"
          fullWidth
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} color="primary">
          {isEditing ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
