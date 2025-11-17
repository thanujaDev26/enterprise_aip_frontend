import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Link as RouterLink } from "react-router-dom";


const getStatusStyle = (status) => {
  const styles = {
    DRAFT: { backgroundColor: "gray", color: "white" },
    PLANNING: { backgroundColor: "#3d98d6", color: "white" },
    APPROVED: { backgroundColor: "#31a768", color: "white" },
    EXECUTING: { backgroundColor: "#c1ff72", color: "black" },
    ON_HOLD: { backgroundColor: "#e8678f", color: "white" },
    CLOSED: { backgroundColor: "#ff751f", color: "black", border: "1px solid #ccc" },
    CANCELLED: { backgroundColor: "#f93d3a", color: "white" },
  };

  return styles[status] || { backgroundColor: "gray", color: "white" };
};

export default function ProjectCard({ project }) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: 360,
        flex: 2,
        height: 360,
        p: 3,
        border: "1px solid #338BC5FF",
        borderRadius: 0,
        background: "#FFFFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "0.2s ease",
        "&:hover": {
          border: "1px solid #338BC5FF",
          background: "#fff",
        },
      }}
    >
      <Box>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
          {project.name}
        </Typography>

        <Typography variant="body2" sx={{ color: "#717171", fontWeight: 600 }}>
          {project.code}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1.5,
            color: "#333",
            minHeight: 48,
            maxHeight: 48,
            overflow: "hidden",
          }}
        >
          {project.description}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* ⭐ STATUS WITH COLOR MAP */}
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography fontSize={14} fontWeight={600}>
          Status
        </Typography>

        <Typography
          fontSize={13}
          fontWeight={700}
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 0,
            textTransform: "uppercase",
            ...getStatusStyle(project.status),  // APPLY COLORS HERE
          }}
        >
          {project.status}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography fontSize={14} fontWeight={600}>
          Budget
        </Typography>

        <Typography fontSize={14}>
          ${Number(project.approvedBudget || 0).toLocaleString()}
        </Typography>
      </Box>

      <Button
        fullWidth
        component={RouterLink}
        to={`/projects/${project.code}`}
        sx={{
          mt: 2,
          border: "1px solid black",
          borderRadius: 0,
          textTransform: "none",
          color: "#000",
          fontWeight: 600,
          "&:hover": {
            background: "black",
            color: "#fff",
          },
        }}
      >
        View Details
      </Button>
    </Paper>
  );
}
