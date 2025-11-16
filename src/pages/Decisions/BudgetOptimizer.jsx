import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { decisionApi } from '../../api/decisionApi';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import TextFieldControl from '../../components/common/TextFieldControl';
import EmptyState from '../../components/common/EmptyState';

export default function BudgetOptimizer() {
  const [form, setForm] = useState({ projectCode: '', budgetCap: 0, weightHealth: 0.6, weightROI: 0.3, weightCost: 0.1 });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await decisionApi.optimizeAssets(form);
      setResult(res?.data?.data || null);
    } catch (err) {
      console.error(err);
      alert('Optimization failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Typography variant="h5" mb={2}>Budget Optimizer</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box display="flex" gap={2} mb={2}>
            <TextFieldControl label="Project Code" name="projectCode" value={form.projectCode} onChange={handleChange} />
            <TextFieldControl label="Budget Cap" name="budgetCap" type="number" value={form.budgetCap} onChange={handleChange} />
          </Box>
          <Button variant="contained" type="submit" disabled={loading}>Run</Button>
        </form>
      </Paper>

      <Paper sx={{ p: 2 }}>
        {!result ? <EmptyState title="No result" subtitle="Run optimizer to get results" /> : (
          <>
            <Typography>Total Selected Cost: {result.totalSelectedCost}</Typography>
            <Typography>Total Score: {result.totalScore}</Typography>
            {result.selectedAssets?.map((a) => (
              <Box key={a.id} mt={1}>
                <Typography>{a.name} — Score: {a.score}</Typography>
              </Box>
            ))}
          </>
        )}
      </Paper>
    </DashboardLayout>
  );
}
