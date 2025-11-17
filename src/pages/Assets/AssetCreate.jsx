import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import { assetApi } from "../../api/assetApi";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TextFieldControl from "../../components/common/TextFieldControl";

export default function AssetCreate({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    replacementCost: "",
    currentValue: "",
    healthIndex: 100,
    initialInvestment: "",
    roi: "",
    projectCode: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

      await assetApi.create(payload);

      if (onCreated) onCreated();
      else {
        alert("Asset created successfully");
        navigate("/assets");
      }
    } catch (error) {
      console.error("Create Asset Error:", error);
      const msg = error?.response?.data?.message || "Failed to create asset";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextFieldControl label="Asset Name" name="name" value={form.name} onChange={handleChange} required />
        <TextFieldControl label="Type" name="type" value={form.type} onChange={handleChange} required />

        <Divider sx={{ my: 1 }} />

        <TextFieldControl label="Replacement Cost" name="replacementCost" type="number" value={form.replacementCost} onChange={handleChange} />
        <TextFieldControl label="Current Value" name="currentValue" type="number" value={form.currentValue} onChange={handleChange} />
        <TextFieldControl label="Initial Investment" name="initialInvestment" type="number" value={form.initialInvestment} onChange={handleChange} />
        <TextFieldControl label="ROI" name="roi" type="number" value={form.roi} onChange={handleChange} />

        <Divider sx={{ my: 1 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ddd",
            borderRadius: 2,
            px: 2,
            py: 1.2,
          }}
        >
          <Typography fontWeight={700} color="#000" sx={{ mr: 1 }}>
            PRJ-
          </Typography>

          <input
            name="projectCode"
            value={form.projectCode.replace("PRJ-", "")}
            onChange={(e) => setForm({ ...form, projectCode: `PRJ-${e.target.value}` })}
            placeholder="e.g. 102"
            style={{ flex: 1, border: "none", outline: "none", fontSize: "16px", background: "transparent" }}
            required
          />
        </Box>

        <Button type="submit" variant="contained" disabled={loading} sx={{ mt: 1 }}>
          {loading ? "Saving..." : "Create Asset"}
        </Button>
      </Box>
    </form>
  );
}
