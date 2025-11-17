import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

export default function AssetDeleteConfirm({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Asset</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this asset? This action cannot be undone.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => { onConfirm(); onClose(); }} variant="contained" color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
