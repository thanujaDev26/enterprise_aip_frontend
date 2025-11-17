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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" 
    >
      <Paper
        sx={{
          p: 5,
          width: 420,
          borderRadius: 0,
          backgroundColor: '#fff',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Box mb={3}>
          <img
            src="/main.png" 
            alt="Logo"
            style={{ width: 200, height: 'auto', display: 'block', margin: '0 auto' }}
          />
        </Box>

        <Typography variant="h5" fontWeight={700} mb={4} color="#000">
          Welcome to Loop - AIP Portal
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box mb={3}>
            <TextFieldControl
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              sx={{
                '& .MuiInputBase-root': { color: '#000' },
                '& .MuiInputLabel-root': { color: '#555' },
              }}
            />
          </Box>
          <Box mb={3}>
            <TextFieldControl
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              sx={{
                '& .MuiInputBase-root': { color: '#000' },
                '& .MuiInputLabel-root': { color: '#555' },
              }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              borderRadius: 0,
              backgroundColor: '#000',
              color: '#fff',
              py: 1.5,
              fontWeight: 600,
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            {loading ? 'Please wait...' : 'Login'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
