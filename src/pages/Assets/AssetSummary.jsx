import React, { useEffect, useState } from 'react';
import { assetApi } from '../../api/assetApi';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';

export default function AssetSummary({ projectCode }) {
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
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" mb={1}>Project Summary</Typography>
      {!projectCode ? <EmptyState title="No project specified" /> : loading ? <Loader /> : !summary ? <EmptyState title="No summary" /> : (
        <Box>
          <Typography><strong>Project:</strong> {summary.projectCode}</Typography>
          <Typography><strong>Assets:</strong> {summary.assetCount}</Typography>
          <Typography><strong>Total Replacement:</strong> ${summary.totalReplacementCost?.toLocaleString()}</Typography>
          <Typography><strong>Total Current Value:</strong> ${summary.totalCurrentValue?.toLocaleString()}</Typography>
          <Typography><strong>Budget Utilization:</strong> {summary.budgetUtilizationPct}%</Typography>
        </Box>
      )}
    </Paper>
  );
}
