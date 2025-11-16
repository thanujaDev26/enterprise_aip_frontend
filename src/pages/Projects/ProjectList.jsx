import React, { useEffect, useState } from "react";
import { projectApi } from "../../api/projectApi";
import { Box, Button, Typography, Divider, Grid } from "@mui/material";
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#000" }}>
          Projects
        </Typography>

        <Button
          variant="contained"
          component={RouterLink}
          to="/projects/create"
          sx={{
            background: "#000",
            fontWeight: 600,
            borderRadius: "10px",
            "&:hover": { background: "#000" },
          }}
        >
          Create
        </Button>
      </Box>

      {loading ? (
        <Loader />
      ) : projects.length === 0 ? (
        <EmptyState title="No projects" />
      ) : (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={project.code}
              sx={{ display: "flex" }}  
            >
              <ProjectCard project={project} sx={{ flex: 1 }} />  
            </Grid>
          ))}
        </Grid>
      )}
    </DashboardLayout>
  );
}
