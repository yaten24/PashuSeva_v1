import { useLocation, useNavigate } from "react-router-dom";
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DashboardIcon from "@mui/icons-material/Dashboard";

const NAV_HEIGHT = 64;

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Paper
      square
      elevation={18}
      sx={{
        display: { xs: "block", md: "none" },
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        zIndex: (theme) => theme.zIndex.modal + 1,
        borderTop: "1px solid #f3f4f6",
        background: "#ffffff",
      }}
    >
      <BottomNavigation
        showLabels
        value={location.pathname}
        onChange={(_, newValue) => navigate(newValue)}
        sx={{
          height: `${NAV_HEIGHT}px`,
          width: "100%",
          backgroundColor: "#ffffff",

          "& .MuiBottomNavigationAction-root": {
            minWidth: 0,
            flex: 1,
            padding: "6px 0",
            color: "#6b7280",
            transition: "all .25s ease",
            borderTop: "2px solid transparent",
          },

          "& .MuiBottomNavigationAction-root.Mui-selected": {
            color: "#eab308",
            borderTop: "2px solid #eab308",
            backgroundColor: "#fefce8",
          },

          "& .MuiBottomNavigationAction-label": {
            fontSize: "11px",
            fontWeight: 700,
            marginTop: "2px",
          },

          "& .MuiSvgIcon-root": {
            fontSize: "23px",
          },
        }}
      >
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<HomeIcon />}
        />

        <BottomNavigationAction
          label="Shop"
          value="/marketplace"
          icon={<StorefrontIcon />}
        />

        <BottomNavigationAction
          label="Doctors"
          value="/doctors"
          icon={<LocalHospitalIcon />}
        />

        <BottomNavigationAction
          label="Dashboard"
          value="/dashboard"
          icon={<DashboardIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}