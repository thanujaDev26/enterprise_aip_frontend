import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { decisionApi } from '../../api/decisionApi';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import TextFieldControl from '../../components/common/TextFieldControl';
import EmptyState from '../../components/common/EmptyState';

export default function PrioritizeProjects() {
  const [form, setForm] = useState({ weightRisk: 0.4, weightHealth: 0.2, weightROI: 0.3, weightUtil: 0.1, topN: 10 });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: parseFloat(e.target.value) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await decisionApi.prioritize(form);
      setResults(res?.data?.data || []);
    } catch (err) {
      console.error(err);
      alert('Prioritization failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Typography variant="h5" mb={2}>Prioritize Projects</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box display="flex" gap={2} mb={2}>
            <TextFieldControl label="Risk Weight" name="weightRisk" value={form.weightRisk} onChange={handleChange} />
            <TextFieldControl label="Health Weight" name="weightHealth" value={form.weightHealth} onChange={handleChange} />
            <TextFieldControl label="ROI Weight" name="weightROI" value={form.weightROI} onChange={handleChange} />
            <TextFieldControl label="Util Weight" name="weightUtil" value={form.weightUtil} onChange={handleChange} />
          </Box>
          <Button variant="contained" type="submit" disabled={loading}>Run</Button>
        </form>
      </Paper>

      <Paper sx={{ p: 2 }}>
        {results.length === 0 ? <EmptyState title="No results" subtitle="Run the prioritization to see results" /> : (
          results.map((r) => (
            <Box key={r.projectCode} mb={2}>
              <Typography variant="subtitle1">{r.projectName} ({r.projectCode})</Typography>
              <Typography>Score: {r.score.toFixed(4)} • Risk: {r.risk} • Avg Health: {r.avgHealth}</Typography>
            </Box>
          ))
        )}
      </Paper>
    </DashboardLayout>
  );
}
