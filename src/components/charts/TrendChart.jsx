import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function TrendChart({ data = [], title = "Trend" }) {
  const max = Math.max(...data, 1);

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: "18px",
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={2}>
        {title}
      </Typography>

      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "flex-end",
          height: 120,
        }}
      >
        {data.map((v, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: `${(v / max) * 100}%`,
              background: "linear-gradient(180deg,#34d399,#059669)",
              borderRadius: "6px",
              boxShadow: "0 4px 12px rgba(16,185,129,0.45)",
              transition: "0.4s",
            }}
          />
        ))}
      </div>
    </Paper>
  );
}
