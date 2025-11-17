import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { decisionApi } from "../../api/decisionApi";
import DecisionMaker from "./DecisionMaker";

export default function BudgetOptimizer() {
  const [form, setForm] = useState({
    projectCode: "",
    budgetCap: "",
    weightHealth: 0.6,
    weightROI: 0.3,
    weightCost: 0.1,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const runOptimizer = async () => {
    try {
      setLoading(true);
      const res = await decisionApi.optimizeAssets(form);
      setResult(res?.data?.data || null);
    } catch (err) {
      console.error(err);
      alert("Optimization failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Button
          variant="outlined"
          sx={{
            border: "1px solid black",
            color: "black",
            px: 3,
            borderRadius: 0,
            fontWeight: 600,
            "&:hover": { background: "#f3f3f3" },
          }}
          href="/decisions"
        >
          Back
        </Button>

        <Typography variant="h4" fontWeight={700} color="#000">
          Budget Optimizer
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          backgroundColor: "#fff",
          border: "1px solid #e0e0e0",
        }}
      >
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          gap={2}
          width="100%"
        >

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #d0d0d0",
              borderRadius: 0,
              px: 2,
              py: 1.2,
              flex: 1,
              background: "#fafafa",
              transition: "0.2s",
              "&:focus-within": {
                borderColor: "#000",
                background: "#fff",
              },
            }}
          >
            <Typography
              variant="body1"
              fontWeight={700}
              color="#000"
              sx={{ mr: 1 }}
            >
              PRJ - 
            </Typography>

            <input
              value={form.projectCode.replace("PRJ-", "")}
              name="projectCode"
              onChange={(e) =>
                setForm({ ...form, projectCode: `PRJ-${e.target.value}` })
              }
              placeholder="Enter project code..."
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontSize: "16px",
                background: "transparent",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #d0d0d0",
              borderRadius: 0,
              px: 2,
              py: 1.2,
              width: "200px",
              background: "#fafafa",
              "&:focus-within": {
                borderColor: "#000",
                background: "#fff",
              },
            }}
          >
            <input
              name="budgetCap"
              type="number"
              value={form.budgetCap}
              onChange={handleChange}
              placeholder="Budget cap"
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontSize: "16px",
                background: "transparent",
              }}
            />
          </Box>

          <Button
            variant="contained"
            onClick={runOptimizer}
            sx={{
              px: 4,
              fontWeight: 600,
              borderRadius: 0,
              background: "#000",
              "&:hover": { background: "#333" },
            }}
          >
            Run
          </Button>
        </Box>
      </Paper>

      {loading ? (
        <Loader />
      ) : !result ? (
        <EmptyState title="No results" subtitle="Run optimizer to see results" />
      ) : (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 0,
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h6" fontWeight={700} mb={2}>
            Optimization Summary
          </Typography>

          <Typography mb={1}>
            <strong>Total Selected Cost:</strong> {result.totalSelectedCost}
          </Typography>

          <Typography mb={3}>
            <strong>Total Score:</strong> {result.totalScore}
          </Typography>

          <TableContainer
            component={Paper}
            sx={{ borderRadius: 0, overflow: "hidden" }}
          >
            <Table>
              <TableHead sx={{ background: "#f5f5f5", borderRadius:0 }}>
                <TableRow>
                  <TableCell>
                    <strong>Asset Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Score</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Cost</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {result.selectedAssets?.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>{a.name}</TableCell>
                    <TableCell>{a.score}</TableCell>
                    <TableCell>{a.replacementCost}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <DecisionMaker
            selectedAssets={result.selectedAssets}
            budgetCap={form.budgetCap}
          />
        </Paper>
      )}
    </DashboardLayout>
  );
}
