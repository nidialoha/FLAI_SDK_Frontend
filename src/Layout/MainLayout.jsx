import NavBar from "../Components/NavBar";
import NavBarRechts from "../Components/NavBarRechts";
import { Outlet, useLocation } from "react-router-dom";

function MainLayout() {
  const location = useLocation();
  const isSignupOrLogin =
    location.pathname === "/signup" || location.pathname === "/login";

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isSignupOrLogin ? "" : "bg-[#F0F0F0]"
      }`}
      style={
        isSignupOrLogin
          ? {
              background: "linear-gradient(45deg, #3520A1, #AB65B7)",
            }
          : {}
      }
    >
      <NavBar />

      {isSignupOrLogin ? (
        // Zentrierte Darstellung für Login/Signup
        <div className="flex flex-1 items-center justify-center">
          <Outlet />
        </div>
      ) : (
        // Standard-Grid Layout
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-3">
            <Outlet />
          </div>
          <div className="mt-4">
            <NavBarRechts />
          </div>
        </div>
      )}
    </div>
  );
}

export default MainLayout;
