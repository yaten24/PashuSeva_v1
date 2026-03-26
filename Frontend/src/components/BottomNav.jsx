import { useLocation, useNavigate } from "react-router-dom";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DashboardIcon from "@mui/icons-material/Dashboard";

const NAV_HEIGHT = 64; // keep in sync with Layout padding

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // If you don't want nav on admin pages etc. add conditions here
  // const hide = location.pathname.startsWith("/admin");
  // if (hide) return null;

  return (
    <Paper
      square
      elevation={12}
      sx={{
        display: { xs: "block", md: "none" }, // ✅ only mobile
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        zIndex: (theme) => theme.zIndex.modal + 1, // ✅ stays above dialogs/backdrops
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <BottomNavigation
        showLabels
        value={location.pathname}
        onChange={(_, newValue) => navigate(newValue)}
        sx={{
          height: `${NAV_HEIGHT}px`,
          width: "100%",
          "& .MuiBottomNavigationAction-root": {
            minWidth: 0, // ✅ fixes “wide screen” / spacing issues
            flex: 1,     // ✅ evenly distribute items across full width
            padding: "6px 0",
          },
        }}
      >
        <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
        <BottomNavigationAction label="Shop" value="/marketplace" icon={<StorefrontIcon />} />
        <BottomNavigationAction label="Doctors" value="/doctors" icon={<LocalHospitalIcon />} />
        <BottomNavigationAction label="Dashboard" value="/dashboard" icon={<DashboardIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
