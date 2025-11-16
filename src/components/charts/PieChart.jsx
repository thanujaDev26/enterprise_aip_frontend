import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function PieChart({ data = [], title = "Pie Chart" }) {
  const total = data.reduce((sum, d) => sum + (d.value || 0), 0) || 1;

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

      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: `conic-gradient(
              #38bdf8 ${(data[0]?.value / total) * 100 || 0}%,
              #34d399 ${(data[1]?.value / total) * 100 + (data[0]?.value / total) * 100 || 0}%,
              #f472b6 0
            )`,
            display: "grid",
            placeItems: "center",
            position: "relative",
            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              width: 70,
              height: 70,
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(6px)",
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
            }}
          >
            {total}
          </div>
        </div>

        <div style={{ color: "#e2e8f0" }}>
          {data.map((d) => (
            <div key={d.label} style={{ marginBottom: 6, fontSize: 15 }}>
              {d.label}: {(100 * d.value / total).toFixed(1)}%
            </div>
          ))}
        </div>
      </div>
    </Paper>
  );
}
