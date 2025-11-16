import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function AssetCard({ asset }) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        width: '100%',
        backgroundColor: '#fff',
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" fontWeight={700} gutterBottom>
        {asset.name}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Type: {asset.type}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1" fontWeight={600}>
          Current Value
        </Typography>
        <Typography variant="body1" fontWeight={700}>
          ${asset.currentValue.toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  );
}
