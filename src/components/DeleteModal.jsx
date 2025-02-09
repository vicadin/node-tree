import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

export const DeleteModal = ({ isOpen, onClose, onConfirm, nodeName }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete the node &quot;{nodeName}&quot;?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
