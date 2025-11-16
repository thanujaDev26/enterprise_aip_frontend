import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { projectApi } from "../../api/projectApi";

export default function ProjectEdit() {
  const { code } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "",
    approvedBudget: "",
    riskScore: "",
  });

  const statuses = [
    "DRAFT",
    "PLANNING",
    "APPROVED",
    "EXECUTING",
    "ON_HOLD",
    "CLOSED",
    "CANCELLED",
  ];

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await projectApi.get(code);
        const p = res?.data?.data;
        if (p) {
          setForm({
            name: p.name || "",
            description: p.description || "",
            status: p.status || "",
            approvedBudget: p.approvedBudget || "",
            riskScore: p.riskScore || "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (code) load();
  }, [code]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    navigate(-1);
  };

    const handleSubmit = async () => {
    try {
        setLoading(true);
        const payload = {
        name: form.name,
        description: form.description,
        status: form.status, 
        approvedBudget: Number(form.approvedBudget),
        currency: "USD",
        riskScore: Number(form.riskScore),
        };
        await projectApi.update(code, payload);
        navigate(`/projects/${code}`);
    } catch (err) {
        console.error(err);
        alert("Failed to update project: " + err?.response?.data?.message || err.message);
    } finally {
        setLoading(false);
    }
    };


  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{ sx: {
        borderRadius : 4, overflow: "hidden"
    } }}>
      <DialogTitle>Edit Project</DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Project Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />

          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            fullWidth
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status.replace("_", " ")}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Approved Budget"
            type="number"
            name="approvedBudget"
            value={form.approvedBudget}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Risk Score"
            type="number"
            name="riskScore"
            value={form.riskScore}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
        <Button onClick={handleClose} disabled={loading}>
            Cancel
        </Button>
        <Button
            variant="contained"
            sx={{ background: "#000", "&:hover": { background: "#333" } }}
            onClick={handleSubmit}
            disabled={loading}
        >
            Save
        </Button>
      </DialogActions>

    </Dialog>
  );
}
