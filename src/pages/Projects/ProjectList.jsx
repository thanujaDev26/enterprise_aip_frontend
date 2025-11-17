import React, { useEffect, useState } from "react";
import { projectApi } from "../../api/projectApi";
import { Box, Button, Typography, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ProjectCard from "./ProjectCard";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await projectApi.list();
        const projectsArray = res?.data?.data?.content || [];
        setProjects(projectsArray);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <DashboardLayout>
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={3}
      >
        <Typography variant="h4" sx={{ 
          fontWeight: 800, 
          color: "#000", 
          letterSpacing: "-0.5px"
        }}>
          Projects
        </Typography>

        <Button
          variant="contained"
          component={RouterLink}
          to="/projects/create"
          sx={{
            background: "#000",
            color: "white",
            fontWeight: 700,
            px: 3,
            py: 1,
            borderRadius: 0,
            "&:hover": {
              background: "#282828FF",
              color: "#fff"
            },
          }}
        >
          + New Project
        </Button>
      </Box>

      {/* Content: Loader / Empty / Grid */}
      {loading ? (
        <Loader />
      ) : projects.length === 0 ? (
        <EmptyState title="No projects available" />
      ) : (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid 
              item 
              xs={12} sm={6} md={4} 
              key={project.code}
            >
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      )}
    </DashboardLayout>
  );
}
