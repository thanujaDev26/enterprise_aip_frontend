import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

export default function PageHeader({ title, breadcrumbs = [] }) {
  return (
    <Box mb={3}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
        <Link component={RouterLink} to="/">Home</Link>
        {breadcrumbs.map((b, i) =>
          b.link ? (
            <Link key={i} component={RouterLink} to={b.link}>{b.label}</Link>
          ) : (
            <Typography key={i} color="text.primary">{b.label}</Typography>
          )
        )}
      </Breadcrumbs>
      <Typography variant="h5">{title}</Typography>
    </Box>
  );
}
