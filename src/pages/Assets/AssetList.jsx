import React, { useState } from "react";
import { assetApi } from "../../api/assetApi";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import TextFieldControl from "../../components/common/TextFieldControl";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AssetCard from "./AssetCard";

export default function AssetList() {
  const [projectCode, setProjectCode] = useState("PRJ-001");
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openCreate, setOpenCreate] = useState(false);
  const [newAsset, setNewAsset] = useState({
    name: "",
    type: "",
    replacementCost: 0,
    currentValue: 0,
    healthIndex: 0,
    initialInvestment: 0,
    roi: 0,
    projectCode: projectCode,
  });

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

  const handleCreateChange = (e) =>
    setNewAsset({ ...newAsset, [e.target.name]: e.target.value });

  const handleCreateAsset = async () => {
    try {
      setLoading(true);
      await assetApi.create({ ...newAsset, projectCode });
      alert("Asset created successfully");
      setOpenCreate(false);
      setNewAsset({
        name: "",
        type: "",
        replacementCost: 0,
        currentValue: 0,
        healthIndex: 0,
        initialInvestment: 0,
        roi: 0,
        projectCode: projectCode,
      });
      loadAssets();
    } catch (err) {
      console.error(err);
      alert("Failed to create asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Typography variant="h4" fontWeight={700} mb={3} color="#000">
        Assets
      </Typography>

      {/* Search Bar & Buttons */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          backgroundColor: "#fafafa",
          width: "100%",
        }}
      >
        <Box display="flex" gap={2} flexWrap="wrap" width="100%">
          <TextFieldControl
            label="Project Code"
            name="projectCode"
            value={projectCode}
            onChange={(e) => setProjectCode(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={loadAssets}
            sx={{ px: 4, fontWeight: 600 }}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            onClick={() => setOpenCreate(true)}
            sx={{ px: 4, fontWeight: 600 }}
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
            <Grid item xs={12} key={a.id}>
              <AssetCard asset={a} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Create Asset Dialog */}
      <Dialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogTitle>Create New Asset</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextFieldControl
              label="Asset Name"
              name="name"
              value={newAsset.name}
              onChange={handleCreateChange}
              fullWidth
            />
            <TextFieldControl
              label="Type"
              name="type"
              value={newAsset.type}
              onChange={handleCreateChange}
              fullWidth
            />
            <TextFieldControl
              label="Replacement Cost"
              type="number"
              name="replacementCost"
              value={newAsset.replacementCost}
              onChange={handleCreateChange}
              fullWidth
            />
            <TextFieldControl
              label="Current Value"
              type="number"
              name="currentValue"
              value={newAsset.currentValue}
              onChange={handleCreateChange}
              fullWidth
            />
            <TextFieldControl
              label="Health Index"
              type="number"
              name="healthIndex"
              value={newAsset.healthIndex}
              onChange={handleCreateChange}
              fullWidth
            />
            <TextFieldControl
              label="Initial Investment"
              type="number"
              name="initialInvestment"
              value={newAsset.initialInvestment}
              onChange={handleCreateChange}
              fullWidth
            />
            <TextFieldControl
              label="ROI"
              type="number"
              name="roi"
              value={newAsset.roi}
              onChange={handleCreateChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
          <Button variant="outlined" onClick={() => setOpenCreate(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleCreateAsset}>
            Save Asset
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}
