import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { projectApi } from "../../api/projectApi";
import {
  Paper,
  Typography,
  Box,
  Divider,
  Chip,
  Grid,
  Button,
} from "@mui/material";
import Loader from "../../components/common/Loader";
import DashboardLayout from "../../components/layouts/DashboardLayout";

export default function ProjectDetails() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await projectApi.get(code);
        setProject(res?.data?.data || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (code) load();
  }, [code]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;

    try {
      await projectApi.delete(code);
      navigate("/projects");
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  const getStatusStyle = (status) => {
    const colors = {
      PLANNING: { bgcolor: "#000", color: "#fff" },
      InProgress: { bgcolor: "#555", color: "#fff" },
      Completed: { bgcolor: "#00a000", color: "#fff" },
      OnHold: { bgcolor: "#999", color: "#fff" },
      Cancelled: { bgcolor: "#f00", color: "#fff" },
    };
    return colors[status] || { bgcolor: "#eee", color: "#000" };
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" fontWeight={700} mb={3} color="#000">
        Project Details
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          background: "#fafafa",
          maxWidth: 800,
          mx: "auto",
        }}
      >
        {loading ? (
          <Loader />
        ) : !project ? (
          <Typography>No project found</Typography>
        ) : (
          <Box>
            <Box
              mb={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {project.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", fontWeight: 500 }}
                >
                  Code: {project.code}
                </Typography>
              </Box>

              <Box display="flex" gap={1}>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to={`/projects`}
                  sx={{ fontWeight: 600, background: "black", color: "white" }}
                >
                  Back
                </Button>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to={`/projects/edit/${project.code}`}
                  sx={{ fontWeight: 600 }}
                >
                  Edit
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    background: "#c70000",
                    "&:hover": { background: "#a00000" },
                    fontWeight: 600,
                  }}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Box>
            </Box>

            <Divider sx={{ mb: 3, borderColor: "#e0e0e0" }} />

            <Box mb={3}>
              <Typography variant="body1" sx={{ color: "#333" }}>
                {project.description}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600} mb={1}>
                    Status
                  </Typography>
                  <Chip
                    label={project.status}
                    sx={{
                      ...getStatusStyle(project.status),
                      fontWeight: 700,
                      textTransform: "uppercase",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "6px",
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600} mb={1}>
                    Approved Budget
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    ${project.approvedBudget.toLocaleString()}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600} mb={1}>
                    Risk Score
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {project.riskScore}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </DashboardLayout>
  );
}
