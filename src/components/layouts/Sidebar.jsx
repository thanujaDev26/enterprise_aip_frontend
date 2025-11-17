import { NavLink, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

export default function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "Projects", icon: <WorkIcon />, path: "/projects" },
    { label: "Assets", icon: <AccountTreeIcon />, path: "/assets" },
    { label: "Decisions", icon: <AssessmentIcon />, path: "/decisions" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          border: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(8px)",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", 
          height: "100%",
        },
      }}
    >

      <Box>
        <Box
          sx={{
            p: 3,
            textAlign: "center",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <img
            src="/main.png"
            alt="Logo"
            style={{
              width: "100%",
              height: "70%",
              filter: "drop-shadow(0px 0px 10px rgba(0,255,255,0.35))",
            }}
          />
        </Box>

        <List sx={{ px: 2, mt: 2 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.label}
              component={NavLink}
              to={item.path}
              end
              sx={{
                mb: 1.5,
                borderRadius: 0,
                paddingY: 1.3,
                paddingLeft: 2,
                textDecoration: "none",
                color: "#000",
                background: "#ffffff",
                border: "2px solid #000",

                "&:hover": {
                  background: "#ffffff",
                  transform: "none",
                  color: "#000",
                },

                "&.active": {
                  background: "#000",
                  border: "2px solid #000",
                  color: "#fff",
                  boxShadow: "0 0 10px rgba(0,0,0,0.4)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 44 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  "& span": {
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "inherit",
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ px: 2, pb: 3 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 0,
            paddingY: 1.3,
            paddingLeft: 2,
            color: "#000",
            background: "#fff",
            border: "2px solid #000",
            "&:hover": {
              background: "#fff",
              transform: "none",
              color: "#000",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 44 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            sx={{
              borderRadius: 0,
              "& span": {
                fontSize: "1rem",
                fontWeight: 600,
                color: "inherit",
              },
            }}
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
}
