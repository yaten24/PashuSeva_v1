import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomNav from "./BottomNav";

export default function Layout() {
  const location = useLocation();

  const fullBleedRoutes = new Set(["/", "/marketplace", "/doctors"]);
  const isFullBleed = fullBleedRoutes.has(location.pathname);

  const authRoutes = new Set(["/login", "/register", "/forgot-password"]);
  const isAuth =
    authRoutes.has(location.pathname) ||
    location.pathname.startsWith("/reset-password");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!isAuth && <Navbar />}

      <main className="flex-1 w-full pb-16 md:pb-0">
        <div className={isFullBleed ? "w-full" : "mx-auto max-w-6xl px-4"}>
          <Outlet />
        </div>
      </main>

      {!isAuth && <Footer />}

      {/* ✅ bottom nav visible even on login/register (mobile-only handled in BottomNav) */}
      <BottomNav />
    </div>
  );
}
