import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function DecisionDashboard() {
  const actions = [
    {
      title: "Prioritize Projects",
      description: "Rank and prioritize your projects based on importance and ROI.",
      link: "/decisions/prioritize",
      type: "contained",
    },
    {
      title: "Budget Optimizer",
      description: "Optimize your budget allocation across projects for maximum efficiency.",
      link: "/decisions/optimize",
      type: "outlined",
    },
  ];

  return (
    <div style={{justifyContent: "center", alignItems: "center", 
    display: "flex"}}>
      <DashboardLayout>
      <Typography variant="h4" fontWeight={700} mb={4}>
        Data Driven - Decision Dashboard
      </Typography>

      <Grid container spacing={4}>
        {actions.map((action) => (
          <Grid key={action.title} item xs={12}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 0,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {action.title}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {action.description}
                </Typography>
              </Box>

              <Box mt={3}>
                <Button
                  variant={action.type}
                  component={RouterLink}
                  to={action.link}
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    borderRadius: 0,
                    textTransform: "none",
                    ...(action.type === "contained"
                      ? { background: "#000", "&:hover": { background: "#333" } }
                      : { borderColor: "#000", color: "#000", "&:hover": { background: "#f5f5f5" } }),
                  }}
                >
                  Go
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </DashboardLayout>
    </div>
  );
}
