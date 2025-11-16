import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextFieldControl from '../../components/common/TextFieldControl';
import { authApi } from '../../api/authApi';
import useAuthStore from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await authApi.login(form);
      const token = res?.data?.data?.accessToken;
      const fullName = res?.data?.data?.fullName;
      if (token) {
        localStorage.setItem('accessToken', token);
        setAuth(token);
        setUser({ fullName });
        navigate('/dashboard');
      } else {
        alert('Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper sx={{ p: 4, width: 420 }} elevation={3}>
        <Typography variant="h6" mb={2}>Login</Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextFieldControl label="Email" name="email" value={form.email} onChange={handleChange} />
          </Box>
          <Box mb={2}>
            <TextFieldControl label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
          </Box>
          <Button type="submit" variant="contained" fullWidth disabled={loading}>
            {loading ? 'Please wait...' : 'Login'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
