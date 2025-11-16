import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assetApi } from '../../api/assetApi';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import EmptyState from '../../components/common/EmptyState';
import Loader from '../../components/common/Loader';

export default function AssetSummary() {
  const { projectCode } = useParams();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await assetApi.summary(projectCode);
        setSummary(res?.data?.data || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (projectCode) load();
  }, [projectCode]);

  return (
    <DashboardLayout>
      <Typography variant="h5" mb={2}>Asset Summary for {projectCode}</Typography>
      <Paper sx={{ p: 2 }}>
        {loading ? <Loader /> : !summary ? <EmptyState title="No summary" /> : (
          <Box>
            <Typography>Asset Count: {summary.assetCount}</Typography>
            <Typography>Total Replacement Cost: {summary.totalReplacementCost}</Typography>
            <Typography>Total Current Value: {summary.totalCurrentValue}</Typography>
            <Typography>Budget Utilization: {summary.budgetUtilizationPct}%</Typography>
          </Box>
        )}
      </Paper>
    </DashboardLayout>
  );
}
