import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

export default function AssetCard({ asset }) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: 360,
        height: 360,
        p: 3,
        border: "1px solid #e0e0e0",
        borderRadius: 0,
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "0.2s ease",
        "&:hover": {
          borderColor: "#000",
          background: "#fff",
        },
      }}
    >
      <Box>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
          {asset.name}
        </Typography>

        <Typography variant="body2" sx={{ color: "#717171", fontWeight: 600 }}>
          {asset.type}
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
          {asset.description || "No description"}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box display="flex" justifyContent="space-between">
        <Typography fontSize={14} fontWeight={600}>
          Current Value
        </Typography>
        <Typography fontSize={14} fontWeight={700}>
          ${asset.currentValue?.toLocaleString() || 0}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={1}>
        <Typography fontSize={14} fontWeight={600}>
          Health Index
        </Typography>
        <Typography fontSize={14} fontWeight={700}>
          {asset.healthIndex || 0}%
        </Typography>
      </Box>

      <Button
        fullWidth
        component={RouterLink}
        to={`/assets/${asset.id}`}
        sx={{
          mt: 2,
          border: "1px solid #000",
          borderRadius: 0,
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
