import React, { useState } from "react";
import { assetApi } from "../../api/assetApi";
import { Box, Button, Paper, Typography } from "@mui/material";
import TextFieldControl from "../../components/common/TextFieldControl";

export default function AssetEdit({ asset, onUpdated }) {
  const [form, setForm] = useState({
    name: asset.name || "",
    type: asset.type || "",
    replacementCost: asset.replacementCost || 0,
    currentValue: asset.currentValue || 0,
    healthIndex: asset.healthIndex || 0,
    initialInvestment: asset.initialInvestment || 0,
    roi: asset.roi || 0,
    projectCode: asset.projectCode || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        replacementCost: Number(form.replacementCost || 0),
        currentValue: Number(form.currentValue || 0),
        healthIndex: Number(form.healthIndex || 0),
        initialInvestment: Number(form.initialInvestment || 0),
        roi: Number(form.roi || 0),
      };

      if (!payload.projectCode?.startsWith("PRJ-")) {
        payload.projectCode = `PRJ-${payload.projectCode}`;
      }

      const res = await assetApi.update(asset.id, payload);
      const updated = res?.data?.data;
      if (onUpdated) onUpdated(updated);
      alert("Asset updated");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        <Typography variant="h6" fontWeight={700} mb={3} textAlign="center">
          Edit Asset
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextFieldControl
            label="Asset Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextFieldControl
            label="Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextFieldControl
            label="Replacement Cost"
            name="replacementCost"
            type="number"
            value={form.replacementCost}
            onChange={handleChange}
            fullWidth
          />

          <TextFieldControl
            label="Current Value"
            name="currentValue"
            type="number"
            value={form.currentValue}
            onChange={handleChange}
            fullWidth
          />

          <TextFieldControl
            label="Initial Investment"
            name="initialInvestment"
            type="number"
            value={form.initialInvestment}
            onChange={handleChange}
            fullWidth
          />

          <TextFieldControl
            label="ROI"
            name="roi"
            type="number"
            value={form.roi}
            onChange={handleChange}
            fullWidth
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: 2,
              px: 2,
              py: 1.5,
              background: "#fafafa",
              boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
              transition: "0.2s",
              "&:focus-within": { borderColor: "#000", background: "#fff" },
            }}
          >
            <Typography sx={{ mr: 1, fontWeight: 600 }}>PRJ-</Typography>
            <input
              value={(form.projectCode || "").replace("PRJ-", "")}
              onChange={(e) =>
                setForm({ ...form, projectCode: `PRJ-${e.target.value}` })
              }
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "16px",
                background: "transparent",
              }}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              px: 5,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              background: "#000",
              "&:hover": { background: "#333" },
            }}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Box>
      </Paper>
    </form>
  );
}
