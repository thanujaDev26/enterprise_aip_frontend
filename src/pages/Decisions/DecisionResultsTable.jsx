import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

export default function DecisionResultsTable({ rows = [] }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="subtitle1" mb={1}>Decision Results</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Project</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Risk</TableCell>
            <TableCell>Avg Health</TableCell>
            <TableCell>ROI</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.projectCode}>
              <TableCell>{r.projectName} ({r.projectCode})</TableCell>
              <TableCell>{r.score.toFixed(4)}</TableCell>
              <TableCell>{r.risk}</TableCell>
              <TableCell>{r.avgHealth}</TableCell>
              <TableCell>{r.roi}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
