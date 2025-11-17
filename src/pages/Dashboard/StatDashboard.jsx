import { Grid, LinearProgress, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { dashboardApi } from '../../api/dashboardApi';

const statusColors = {
  DRAFT: "#9e9e9e",
  PLANNING: "#2196f3",
  APPROVED: "#4caf50",
  EXECUTING: "#ff9800",
  ON_HOLD: "#f44336",
  CLOSED: "#673ab7",
  CANCELLED: "#e91e63",
};

const glassCard = {
  p: 4,
  borderRadius: "20px",
  backdropFilter: "blur(12px)",
  background: "rgba(255, 255, 255, 0.12)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  transition: "0.3s ease",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

function StatDashboard() {
  const [projectStats, setProjectStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await dashboardApi.get()
        setProjectStats(response.data.data);
      } catch (err) {
        console.error("Failed to fetch project stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const totalProjects =
    projectStats &&
    Object.values(projectStats).reduce((sum, val) => sum + val, 0);

    const formatStatus = (str) => {
        if (!str) return "";
        return str
            .toLowerCase()
            .split("_")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };


  return (
    <div>
      {loading ? (
        <Typography sx={{ textAlign: "center", mt: 4 }}>
          Loading project stats...
        </Typography>
      ) : projectStats && totalProjects > 0 ? (
        
        <Grid 
          container 
          spacing={3} 
          justifyContent="center" 
          alignItems="center"
        >
          {Object.entries(projectStats).map(([key, value]) => {
            const statusName = key.replace("_count", "").replace("_", " ");
            const progress = Math.round((value / totalProjects) * 100);
            const color = statusColors[statusName.toUpperCase()] || "#ccc";

            return (
              <Grid 
                item 
                xs={12} sm={6} md={4} 
                key={key}
                sx={{ height: "100%", width: "200px" }}
              >
                <Paper sx={glassCard}>
                  <Typography variant="subtitle1" fontWeight="600">
                    {formatStatus(statusName)}
                  </Typography>

                  <Typography variant="h5" fontWeight="700" sx={{ mt: 1, mb: 1 }}>
                    {value}
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "rgba(255,255,255,0.2)",
                      "& .MuiLinearProgress-bar": { backgroundColor: color },
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{ mt: 0.5, textAlign: "right", opacity: 0.8 }}
                  >
                    {progress}%
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

      ) : (
        <Typography sx={{ textAlign: "center", mt: 4 }}>
          No project data available
        </Typography>
      )}
    </div>
  );
}

export default StatDashboard;
