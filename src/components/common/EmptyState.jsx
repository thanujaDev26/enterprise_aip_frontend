import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function EmptyState({ title = 'No data', subtitle = '' }) {
  return (
    <Box textAlign="center" py={6}>
      <Typography variant="h6">{title}</Typography>
      {subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}
    </Box>
  );
}
