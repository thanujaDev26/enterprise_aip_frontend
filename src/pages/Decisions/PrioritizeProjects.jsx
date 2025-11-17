import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { decisionApi } from "../../api/decisionApi";
import { projectApi } from "../../api/projectApi"; 
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TextFieldControl from "../../components/common/TextFieldControl";
import EmptyState from "../../components/common/EmptyState";
import { Link as RouterLink } from "react-router-dom";

export default function PrioritizeProjects() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    weightRisk: 0.4,
    weightHealth: 0.2,
    weightROI: 0.3,
    weightUtil: 0.1,
    topN: 10,
  });

  const [results, setResults] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: parseFloat(e.target.value) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await decisionApi.prioritize(form);
      setResults(res?.data?.data || []);
      setSelectedProject(null);
      setSummary(null);
    } catch (err) {
      console.error(err);
      alert("Prioritization failed");
    }
  };

  const fetchSummary = async (projectCode) => {
    setSummaryLoading(true);
    try {
      const res = await projectApi.getAssetSummary(projectCode);
      setSummary(res?.data?.data || null);
    } catch (err) {
      console.error(err);
      alert("Failed to load project summary");
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    fetchSummary(project.projectCode);
  };

  // ──────────────────────────────────────
  // Dynamically highlight the factor(s) that contributed most
  // ──────────────────────────────────────
  const getMaxContributors = (row) => {
    // assuming row has risk, avgHealth, roi, utilization
    const contributions = {
      Risk: row.risk,
      Health: row.avgHealth,
      ROI: row.roi,
      Utilization: row.utilization,
    };
    const maxVal = Math.max(...Object.values(contributions));
    return Object.keys(contributions).filter((key) => contributions[key] === maxVal);
  };

  return (
    <DashboardLayout>
      <Button
        variant="outlined"
        component={RouterLink}
        to="/decisions"
        sx={{ fontWeight: 600, background: "black", color: "white" }}
      >
        Back
      </Button>

      <Typography variant="h4" fontWeight={700} mt={2} mb={4}>
        Prioritize Projects
      </Typography>

      <Box display="flex" gap={3} flexDirection={{ xs: "column", md: "row" }}>
        {/* LEFT PANEL – FORM */}
        <Box flex={1}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>
            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap={2} mb={3}>
                <TextFieldControl label="Risk Weight" name="weightRisk" value={form.weightRisk} onChange={handleChange} type="number" />
                <TextFieldControl label="Health Weight" name="weightHealth" value={form.weightHealth} onChange={handleChange} type="number" />
                <TextFieldControl label="ROI Weight" name="weightROI" value={form.weightROI} onChange={handleChange} type="number" />
                <TextFieldControl label="Utilization Weight" name="weightUtil" value={form.weightUtil} onChange={handleChange} type="number" />
                <TextFieldControl label="Top N" name="topN" value={form.topN} onChange={handleChange} type="number" />
              </Box>

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  background: "#000",
                  "&:hover": { background: "#333" },
                }}
              >
                Run Prioritization
              </Button>
            </form>
          </Paper>
        </Box>

        {/* RIGHT PANEL – SUMMARY */}
        <Box flex={1}>
          <Paper sx={{ p: 3, minHeight: "320px", borderRadius: 3, boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Project Summary
            </Typography>

            {!selectedProject ? (
              <EmptyState title="No project selected" subtitle="Click a project from the table to see full details." />
            ) : summaryLoading ? (
              <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
              </Box>
            ) : (
              summary && (
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell><strong>Project Name</strong></TableCell>
                        <TableCell>{selectedProject.projectName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Project Code</strong></TableCell>
                        <TableCell>{summary.projectCode}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Asset Count</strong></TableCell>
                        <TableCell>{summary.assetCount}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Total Replacement Cost</strong></TableCell>
                        <TableCell>{summary.totalReplacementCost.toLocaleString()}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Total Current Value</strong></TableCell>
                        <TableCell>{summary.totalCurrentValue.toLocaleString()}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Budget Utilization (%)</strong></TableCell>
                        <TableCell>{summary.budgetUtilizationPct}%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )
            )}
          </Paper>
        </Box>
      </Box>

      {/* ────────────────────────────── */}
      {/* RESULTS TABLE */}
      {/* ────────────────────────────── */}
      {results.length === 0 ? (
        <EmptyState title="No results" subtitle="Run the prioritization to see results" sx={{ mt: 5 }} />
      ) : (
        <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 3, boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Project Code</strong></TableCell>
                <TableCell><strong>Project Name</strong></TableCell>
                <TableCell align="right"><strong>Score</strong></TableCell>
                <TableCell align="right"><strong>Risk</strong></TableCell>
                <TableCell align="right"><strong>Health</strong></TableCell>
                <TableCell align="right"><strong>ROI</strong></TableCell>
                <TableCell align="right"><strong>Utilization</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {results.map((r) => {
                const maxContributors = getMaxContributors(r);
                return (
                  <TableRow key={r.projectCode} hover sx={{ cursor: "pointer" }} onClick={() => handleProjectSelect(r)}>
                    <TableCell>{r.projectCode}</TableCell>
                    <TableCell>{r.projectName}</TableCell>
                    <TableCell align="right">{r.score.toFixed(4)}</TableCell>
                    <TableCell align="right">
                      <Tooltip title={`Contribution: ${r.risk}`} arrow>
                        <span style={{ color: maxContributors.includes("Risk") ? "green" : "inherit", fontWeight: maxContributors.includes("Risk") ? 600 : 400 }}>
                          {r.risk}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title={`Contribution: ${r.avgHealth}`} arrow>
                        <span style={{ color: maxContributors.includes("Health") ? "green" : "inherit", fontWeight: maxContributors.includes("Health") ? 600 : 400 }}>
                          {r.avgHealth}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title={`Contribution: ${r.roi}`} arrow>
                        <span style={{ color: maxContributors.includes("ROI") ? "green" : "inherit", fontWeight: maxContributors.includes("ROI") ? 600 : 400 }}>
                          {r.roi}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title={`Contribution: ${r.utilization}`} arrow>
                        <span style={{ color: maxContributors.includes("Utilization") ? "green" : "inherit", fontWeight: maxContributors.includes("Utilization") ? 600 : 400 }}>
                          {r.utilization}
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DashboardLayout>
  );
}
