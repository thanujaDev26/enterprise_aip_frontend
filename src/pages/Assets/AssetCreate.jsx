import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { assetApi } from '../../api/assetApi';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import TextFieldControl from '../../components/common/TextFieldControl';

export default function AssetCreate() {
  const [form, setForm] = useState({ name: '', type: '', replacementCost: 0, currentValue: 0, healthIndex: 100, initialInvestment: 0, roi: 0, projectCode: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await assetApi.create(form);
      alert('Asset created');
      navigate('/assets');
    } catch (err) {
      console.error(err);
      alert('Create failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Typography variant="h5" mb={2}>Create Asset</Typography>
      <Paper sx={{ p: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextFieldControl label="Name" name="name" value={form.name} onChange={handleChange} sx={{ mb: 2 }} />
          <TextFieldControl label="Type" name="type" value={form.type} onChange={handleChange} sx={{ mb: 2 }} />
          <TextFieldControl label="Replacement Cost" name="replacementCost" type="number" value={form.replacementCost} onChange={handleChange} sx={{ mb: 2 }} />
          <TextFieldControl label="Current Value" name="currentValue" type="number" value={form.currentValue} onChange={handleChange} sx={{ mb: 2 }} />
          <TextFieldControl label="Project Code" name="projectCode" value={form.projectCode} onChange={handleChange} sx={{ mb: 2 }} />
          <Button type="submit" variant="contained" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
        </form>
      </Paper>
    </DashboardLayout>
  );
}
