import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function BarChart({ data = [], title = "Bar Chart" }) {
  const max = Math.max(...data.map((d) => d.value), 1);

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
          gap: 14,
          alignItems: "end",
          height: 180,
        }}
      >
        {data.map((d) => (
          <div
            key={d.label}
            style={{ textAlign: "center", width: 60 }}
          >
            <div
              style={{
                height: `${(d.value / max) * 100}%`,
                background: "linear-gradient(180deg,#38bdf8,#0ea5e9)",
                borderRadius: "12px",
                transition: "0.4s",
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              }}
            />

            <div
              style={{
                marginTop: 6,
                fontSize: 13,
                fontWeight: 600,
                color: "#e2e8f0",
              }}
            >
              {d.label}
            </div>
          </div>
        ))}
      </div>
    </Paper>
  );
}
