import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaArrowRight } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import { NavLink, useLocation } from "react-router";

function NavBarRechts() {
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const location = useLocation();
  const isOnDashboard = location.pathname === "/dashboard";

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="flex flex-col">
      <div className="bg-linear-to-r from-purple-500 to-indigo-500 p-6 mr-6 flex flex-col text-center rounded-lg items-center">
        {isAuthenticated ? (
          <>
            <img
              src={user.picture}
              alt={user.name}
              className="rounded-full h-[150px] w-[150px]"
            />
            <h2 className="mt-4 text-white">Hallo, {user.name}!</h2>
            <div className="flex gap-3 items-center mt-2">
              {isOnDashboard ? (
                <>
                  <button
                    className="text-white text-xs underline cursor-pointer"
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                  >
                    Logout
                  </button>
                  <FaArrowRight className="text-white" />
                </>
              ) : (
                <>
                  <NavLink
                    to="/dashboard"
                    className="text-white underline text-xs"
                  >
                    Zu Dashboard
                  </NavLink>
                  <FaArrowRight className="text-white" />
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-white font-bold">Willkommen!</h2>
            <p className="text-white text-sm mb-3">
              Melde dich an oder registriere dich.
            </p>
            <div className="flex gap-3 items-center mt-2">
              <button
                className="text-white text-xs underline cursor-pointer"
                onClick={() => loginWithRedirect()}
              >
                Jetzt anmelden
              </button>
              <FaArrowRight className="text-white" />
            </div>
          </>
        )}
      </div>

      {isAuthenticated && (
        <div className="bg-linear-to-r from-purple-500 to-indigo-500 p-6 mt-5 gap-2 mr-6 flex flex-col text-center rounded-lg items-start text-white">
          <h2 className="border-b-2 w-full text-left font-bold">
            Könnte dich interessieren
          </h2>
          <p>Lorem Ipsum</p>
          <p>Lorem Ipsum</p>
          <p>Lorem Ipsum</p>
          <p>Lorem Ipsum</p>
          <p>Lorem Ipsum</p>
          <p>Lorem Ipsum</p>
          <p>Lorem Ipsum</p>
        </div>
      )}

      <div className="bg-linear-to-r from-purple-500 to-indigo-500 p-6 mt-5 gap-2 mr-6 flex flex-col text-center rounded-lg items-start text-white">
        <h2 className="border-b-2 w-full text-left font-bold">Top Nutzer</h2>
        <div className="flex ">
          <p className="text-left">Linda Musterfrau</p>
          <button className="cursor-pointer">
            <GoPlusCircle className="text-xl ml-2" />
          </button>
        </div>
        <div className="flex">
          <p className="text-left">Maximilian Mustermann</p>
          <button className="cursor-pointer">
            <GoPlusCircle className="text-xl ml-2" />
          </button>
        </div>
        <div className="flex">
          <p className="text-left">Benedict Doe</p>
          <button className="cursor-pointer">
            <GoPlusCircle className="text-xl ml-2" />
          </button>
        </div>
      </div>
      <div className="bg-linear-to-r from-purple-500 to-indigo-500 p-6 mt-5 gap-2 mr-6 flex flex-col text-center rounded-lg items-start text-white">
        <h2 className="text-left border-b-2">Community Rules!</h2>
        <div className="flex gap-3 items-center mt-2">
          <p className="underline">Jetzt lesen</p>
          <FaArrowRight className="text-white" />
        </div>
      </div>
    </div>
  );
}

export default NavBarRechts;
