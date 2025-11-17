import React from "react";
import { Box, Typography, Paper, Chip } from "@mui/material";

export default function DecisionMaker({ selectedAssets = [], budgetCap }) {
  if (!selectedAssets.length) return null;

  const sorted = [...selectedAssets].sort((a, b) => b.score - a.score);

  let remaining = Number(budgetCap);
  let canBuy = [];
  let cannotBuy = [];

  sorted.forEach((asset) => {
    if (asset.replacementCost <= remaining) {
      canBuy.push(asset);
      remaining -= asset.replacementCost;
    } else {
      cannotBuy.push(asset);
    }
  });

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 3,
        border: "1px solid #dcdcdc",
        background: "#fafafa",
      }}
    >
      {/* Title */}
      <Typography variant="h5" fontWeight={700} mb={2} color="#000">
        Automatic Decision Maker
      </Typography>

      {/* Explanation */}
      <Typography mb={3} color="#444" fontSize="15px">
        Based on the scores and your budget limit, here is a clear and simple 
        explanation of which assets should be considered first, and how your 
        available budget affects the purchasing order.
      </Typography>

      {/* Priority Order */}
      <Box mb={2}>
        <Typography fontWeight={700} mb={1}>
          Priority Order (from most important to least important):
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={1}>
          {sorted.map((a, index) => (
            <Chip
              key={a.id}
              label={`${index + 1}. ${a.name}`}
              sx={{
                background: "#fff",
                border: "1px solid #000",
                fontWeight: 600,
              }}
            />
          ))}
        </Box>
      </Box>

      {/* What You Can Buy */}
      <Box
        mt={3}
        p={2}
        sx={{
          borderRadius: 2,
          border: "1px solid black",
          background: "#fff",
        }}
      >
        <Typography fontWeight={700} mb={1} color="#000">
          Assets You Can Afford Now
        </Typography>

        {canBuy.length > 0 ? (
          <>
            <Typography mb={1} color="#444">
              These assets fit within your budget and are recommended to focus 
              on first:
            </Typography>

            <ul style={{ marginLeft: "20px", color: "#333" }}>
              {canBuy.map((a) => (
                <li key={a.id}>
                  <strong>{a.name}</strong> — Cost: {a.replacementCost}, Score:{" "}
                  {a.score}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Typography color="#444">
            None of the assets can be purchased within the current budget.
          </Typography>
        )}

        <Typography mt={2} fontWeight={600}>
          Remaining Budget: {remaining}
        </Typography>
      </Box>

      {/* What You Cannot Buy */}
      {cannotBuy.length > 0 && (
        <Box
          mt={3}
          p={2}
          sx={{
            borderRadius: 2,
            border: "1px solid #d0d0d0",
            background: "#f8f8f8",
          }}
        >
          <Typography fontWeight={700} mb={1} color="#000">
            Assets That Exceed Your Budget
          </Typography>

          <Typography mb={1} color="#444">
            These assets are important, but the cost is too high for your 
            current budget:
          </Typography>

          <ul style={{ marginLeft: "20px", color: "#333" }}>
            {cannotBuy.map((a) => (
              <li key={a.id}>
                <strong>{a.name}</strong> — Cost: {a.replacementCost}, Score:{" "}
                {a.score}
              </li>
            ))}
          </ul>

          <Typography mt={2} fontSize="14px" color="#666">
            You can plan these for future upgrades or a higher budget cycle.
          </Typography>
        </Box>
      )}

      {/* Final Recommendation */}
      <Box mt={4} p={2} sx={{ background: "#fff", borderRadius: 2 }}>
        <Typography fontWeight={700} mb={1}>
          Final Recommendation
        </Typography>

        <Typography color="#444" lineHeight="1.6">
          Focus on the assets you can afford now. These provide the highest 
          value for your limited budget. If your goal is to maximize score 
          improvement, start with{" "}
          <strong>
            {canBuy.length > 0 ? canBuy[0].name : sorted[0].name}
          </strong>
          .  
          {canBuy.length === 0 && (
            <span>
              {" "}
              Since none fit within the budget, increasing your budget is 
              recommended to begin improvements.
            </span>
          )}
        </Typography>
      </Box>
    </Paper>
  );
}
