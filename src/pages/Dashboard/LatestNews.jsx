import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import axios from "axios";

const cardStyle = {
  p: 2,
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
};

export default function YouTubeVideos() {
  const [videos, setVideos] = useState([]);
  const YT_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  const ytQuery = [
    "asset investment industry",
    "oil and gas",
    "fuel",
    "supply chain",
    "logistic",
    "aerospace and defence",
    "field service management",
    "rails",
    "roads"
  ].join("|");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const ytRes = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
            ytQuery
          )}&type=video&order=date&maxResults=12&key=${YT_API_KEY}`
        );
        setVideos(ytRes.data.items || []);
      } catch (err) {
        console.error("Failed to load videos:", err);
      }
    };

    fetchVideos();
  }, []);

  return (
    <Box mt={4}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Latest Industry Videos
      </Typography>

      <Grid container spacing={3}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={video.id.videoId}>
            <Paper sx={cardStyle}>
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ mt: 1 }}
              >
                {video.snippet.title.length > 60
                  ? video.snippet.title.slice(0, 60) + "…"
                  : video.snippet.title}
              </Typography>
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#2196f3", fontWeight: 600, marginTop: "4px" }}
              >
                Watch Video →
              </a>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
