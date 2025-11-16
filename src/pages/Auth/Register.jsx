import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextFieldControl from '../../components/common/TextFieldControl';
import { authApi } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', fullName: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await authApi.register(form);
      alert('Registered successfully — please login.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper sx={{ p: 4, width: 420 }} elevation={3}>
        <Typography variant="h6" mb={2}>Register</Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextFieldControl label="Full name" name="fullName" value={form.fullName} onChange={handleChange} />
          </Box>
          <Box mb={2}>
            <TextFieldControl label="Email" name="email" value={form.email} onChange={handleChange} />
          </Box>
          <Box mb={2}>
            <TextFieldControl label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
          </Box>
          <Button type="submit" variant="contained" fullWidth disabled={loading}>
            {loading ? 'Please wait...' : 'Register'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
