import React, { useState } from "react";
import { assetApi } from "../../api/assetApi";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AssetCard from "./AssetCard";
import AssetCreate from "./AssetCreate";

export default function AssetList() {
  const [projectCode, setProjectCode] = useState("PRJ-001");
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openCreate, setOpenCreate] = useState(false);

  const loadAssets = async () => {
    try {
      setLoading(true);
      const res = await assetApi.listByProject(projectCode);
      setAssets(res?.data?.data?.content || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load assets");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" fontWeight={700} mb={3} color="#000">
        Assets
      </Typography>

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
              borderRadius: "10px",
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
            <Typography variant="body1" fontWeight={700} color="#000" sx={{ mr: 1 }}>
              PRJ-
            </Typography>

            <input
              value={projectCode.replace("PRJ-", "")}
              onChange={(e) => setProjectCode(`PRJ-${e.target.value}`)}
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

          <Button
            variant="contained"
            onClick={loadAssets}
            sx={{
              px: 4,
              fontWeight: 600,
              borderRadius: "10px",
              background: "#000",
              "&:hover": { background: "#333" },
            }}
          >
            Search
          </Button>

          <Button
            variant="outlined"
            onClick={() => setOpenCreate(true)}
            sx={{
              border: "1px solid black",
              color: "black",
              px: 4,
              fontWeight: 600,
              borderRadius: "10px",
            }}
          >
            Create Asset
          </Button>
        </Box>
      </Paper>

      {loading ? (
        <Loader />
      ) : assets.length === 0 ? (
        <EmptyState title="No assets found" />
      ) : (
        <Grid container spacing={3}>
          {assets.map((a) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={a.id}
              display="flex"
              justifyContent="center"
            >
              <AssetCard asset={a} />
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create New Asset</DialogTitle>
        <DialogContent dividers>
          <AssetCreate onCreated={() => { setOpenCreate(false); loadAssets(); }} />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
