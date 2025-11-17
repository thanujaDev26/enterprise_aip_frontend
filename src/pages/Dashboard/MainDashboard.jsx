import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import StatDashboard from "./StatDashboard";
import LatestNews from "./LatestNews";



export default function MainDashboard() {
  return (
    <DashboardLayout>
      <Box
        sx={{
          mb: 3,
          p: 3,
          borderRadius: 0,
          background: "linear-gradient(135deg, #0A0F1F, #1E2A47)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="700">
          Project Dashboard
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Project Status Overview
        </Typography>
      </Box>
      <StatDashboard/>
    </DashboardLayout>
  );
}
