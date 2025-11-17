import React, { useState } from "react";
import { Box, Button, Paper, Typography, Divider, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TextFieldControl from "../../components/common/TextFieldControl";
import { projectApi } from "../../api/projectApi";

export default function ProjectCreate() {
  const [form, setForm] = useState({
    code: "",
    name: "",
    description: "",
    status: "PLANNING",
    approvedBudget: 0,
    currency: "USD",
    riskScore: 0,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await projectApi.create(form);
      alert("Project created successfully");
      navigate("/projects");
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" fontWeight={700} mb={4} color="#000">
        Create New Project
      </Typography>

      <Paper
        elevation={1}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: "16px",
          background: "#fff",
          maxWidth: 700,
          mx: "auto",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextFieldControl
              label="Project Code"
              name="code"
              value={form.code}
              onChange={handleChange}
              fullWidth
              placeholder="e.g., PRJ-003"
            />
          </Box>

          <Box mb={3}>
            <TextFieldControl
              label="Project Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              placeholder="e.g., IT/SCADA Modernization"
            />
          </Box>

          <Box mb={3}>
            <TextFieldControl
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              placeholder="Describe the project scope..."
            />
          </Box>

          <Box mb={3} display="flex" gap={2} flexWrap="wrap">
            <TextFieldControl
              label="Approved Budget"
              name="approvedBudget"
              type="number"
              value={form.approvedBudget}
              onChange={handleChange}
              fullWidth
              placeholder="e.g., 6000000"
            />

            <TextFieldControl
              select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="PLANNING">Planning</MenuItem>
              <MenuItem value="EXECUTING">In Progress</MenuItem>
              <MenuItem value="APPROVED">Approved</MenuItem>
              <MenuItem value="ON_HOLD">On Hold</MenuItem>
              <MenuItem value="CLOSED">Closed</MenuItem>
              <MenuItem value="CANCELLED">Cancelled</MenuItem>
            </TextFieldControl>
          </Box>

          <Box mb={3} display="flex" gap={2} flexWrap="wrap">
            <TextFieldControl
              select
              label="Currency"
              name="currency"
              value={form.currency}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
              <MenuItem value="LKR">LKR</MenuItem>
            </TextFieldControl>

            <TextFieldControl
              type="number"
              label="Risk Score"
              name="riskScore"
              value={form.riskScore}
              onChange={handleChange}
              fullWidth
              inputProps={{ min: 0, max: 100 }}
              placeholder="0 - 100"
            />
          </Box>

          <Divider sx={{ mb: 3, borderColor: "#e0e0e0" }} />

          <Box display="flex" gap={2} mt={3}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/projects")}
              sx={{
                borderRadius: 0,
                textTransform: "none",
                py: 1.5,
                fontSize: "16px",
                color: "#000",
                borderColor: "#000",
                "&:hover": { background: "#f0f0f0" },
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                background: "#000",
                fontWeight: 600,
                borderRadius: 0,
                textTransform: "none",
                py: 1.5,
                fontSize: "16px",
                "&:hover": { background: "#333" },
              }}
            >
              {loading ? "Saving Project..." : "Save Project"}
            </Button>
          </Box>

        </form>
      </Paper>
    </DashboardLayout>
  );
}
