import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import DashboardLayout from '../../components/layouts/DashboardLayout';

export default function DecisionDashboard() {
  return (
    <DashboardLayout>
      <Typography variant="h5" mb={2}>Decision Dashboard</Typography>
      <Box display="flex" gap={2}>
        <Button variant="contained" component={RouterLink} to="/decisions/prioritize">Prioritize Projects</Button>
        <Button variant="outlined" component={RouterLink} to="/decisions/optimize">Budget Optimizer</Button>
      </Box>
    </DashboardLayout>
  );
}
