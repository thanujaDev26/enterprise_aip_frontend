import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assetApi } from "../../api/assetApi";
import {
  Box,
  Button,
  Paper,
  Typography,
  Divider,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import AssetEdit from "./AssetEdit";
import AssetDeleteConfirm from "./AssetDeleteConfirm";
import { Link as RouterLink } from "react-router-dom";

export default function AssetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    try {
      setLoading(true);
      const res = await assetApi.get(id);
      const response = res?.data?.data
      setAsset(res?.data?.data || null);
      console.log(response)
    } catch (err) {
      console.error(err);
      alert("Failed to load asset");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await assetApi.delete(id);
      alert("Asset deleted");
      navigate("/assets");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleUpdated = (updated) => {
    setAsset(updated);
    setTab(0);
  };

  if (loading) return <DashboardLayout><Loader /></DashboardLayout>;

  return (
    <DashboardLayout>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={700}>Asset Details</Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            component={RouterLink}
            to="/assets"
            sx={{ fontWeight: 600, background: "black", color: "white",borderRadius: 0, }}
          >
            Back
          </Button>
          <Button
            variant="outlined"
            sx={{
              px: 3,
              fontWeight: 600,
              borderRadius: 0,
              "&:hover": { background: "#f5f5f5" },
            }}
            onClick={() => setTab(1)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{
              px: 3,
              fontWeight: 600,
              borderRadius: 0,
              "&:hover": { background: "#c70000" },
            }}
            onClick={() => setOpenDelete(true)}
          >
            Delete
          </Button>
        </Box>
      </Box>

      {!asset ? (
        <EmptyState title="Asset not found" />
      ) : (
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            background: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            width: "100%",
          }}
        >
          {/* <Tabs
            value={tab}
            onChange={(e, v) => setTab(v)}
            sx={{
              mb: 3,
              "& .MuiTabs-indicator": { height: 4, borderRadius: 2, background: "#000" },
              "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
            }}
          >
            <Tab label="Details" />
            <Tab label="Edit" />
          </Tabs> */}

          {tab === 0 && (
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h6" fontWeight={700}>{asset.name}</Typography>
            <Typography color="text.secondary">{asset.type}</Typography>
            <Divider sx={{ my: 1 }} />

            <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6} md={2}>
                <Paper sx={{ p: 3, borderRadius: 0, background: "#fafafa", textAlign: "center" }}>
                  <Typography variant="subtitle2" color="text.secondary">Asset Code</Typography>
                  <Typography fontWeight={700} fontSize={18}>{asset.id}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper sx={{ p: 3, borderRadius: 0, background: "#fafafa", textAlign: "center" }}>
                  <Typography variant="subtitle2" color="text.secondary">Project Code</Typography>
                  <Typography fontWeight={700} fontSize={18}>{asset.projectCode}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper sx={{ p: 3, borderRadius: 0, background: "#fafafa", textAlign: "center" }}>
                  <Typography variant="subtitle2" color="text.secondary">Replacement Cost</Typography>
                  <Typography fontWeight={700} fontSize={18}>${asset.replacementCost?.toLocaleString()}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper sx={{ p: 3, borderRadius: 0, background: "#fafafa", textAlign: "center" }}>
                  <Typography variant="subtitle2" color="text.secondary">Current Value</Typography>
                  <Typography fontWeight={700} fontSize={18}>${asset.currentValue?.toLocaleString()}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper sx={{ p: 3, borderRadius: 0, background: "#fafafa", textAlign: "center" }}>
                  <Typography variant="subtitle2" color="text.secondary">Initial Investment</Typography>
                  <Typography fontWeight={700} fontSize={18}>${asset.initialInvestment?.toLocaleString()}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper sx={{ p: 3, borderRadius: 0, background: "#fafafa", textAlign: "center" }}>
                  <Typography variant="subtitle2" color="text.secondary">ROI</Typography>
                  <Typography fontWeight={700} fontSize={18}>${asset.roi?.toLocaleString()}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Paper sx={{ p: 3, borderRadius: 0, background: "#fafafa", textAlign: "center" }}>
                  <Typography variant="subtitle2" color="text.secondary">Health Index</Typography>
                  <Typography fontWeight={700} fontSize={18}>{asset.healthIndex}%</Typography>
                </Paper>
              </Grid> 
            </Grid>
          </Box>
          )}


          {tab === 1 && (
            <Box>
              <AssetEdit asset={asset} onUpdated={handleUpdated} />
            </Box>
          )}
        </Paper>
      )}

      <AssetDeleteConfirm
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </DashboardLayout>
  );
}
