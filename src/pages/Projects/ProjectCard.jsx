import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Link as RouterLink } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: 360,     
        flex: 2,           
        height: 360,       
        p: 3,
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        background: "#FFFFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "0.2s ease",
        "&:hover": {
          border: "1px solid",
          borderColor: "#000",
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
            borderRadius: "6px",
            bgcolor: "#000",
            color: "#fff",
          }}
        >
          {project.status}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography fontSize={14} fontWeight={600}>
          Budget
        </Typography>
        <Typography fontSize={14}>{project.approvedBudget}</Typography>
      </Box>

      <Button
        fullWidth
        component={RouterLink}
        to={`/projects/${project.code}`}
        sx={{
          mt: 2,
          border: "1px solid #000",
          borderRadius: "8px",
          textTransform: "none",
          color: "#000",
          fontWeight: 600,
          "&:hover": {
            background: "#000",
            color: "#fff",
          },
        }}
      >
        View Details
      </Button>
    </Paper>
  );
}
