import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import { useEffect, useState } from "react";

function NavBarRechts() {
  const location = useLocation();
  const navigate = useNavigate();
  const isOnDashboard = location.pathname === "/dashboard";
  const [interestsList, setInterestsList] = useState([]);
  const [topUserList, setTopUserList] = useState([]);
  const { user, isAuthenticated, logout } = useAuth();
  const [interestsArray, setInterestsArray] = useState([]);
  const [topUserArray, setTopUserArray] = useState([]);

  const handleLogout = () => {
    logout();
    navigate("/forum");
  };

  const fetchInterestsPosts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/interests/${user.id}`
      );
      if (!response.ok) throw new Error();
      const res = await response.json();
      console.log(res);
      setInterestsArray([...res]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/`);
      if (!response.ok) throw new Error();
      const res = await response.json();
      console.log(res);
      setTopUserArray([...res]);
    } catch (error) {
      console.log(error);
    }
  };

  //fetching der Interessen und User mit den meisten Punkten
  useEffect(() => {
    fetchTopUser();
  }, []);

  useEffect(() => {
    fetchInterestsPosts();
  }, [user]);

  return (
    <div className="flex flex-col">
      <div className="bg-linear-to-r from-purple-500 to-indigo-500 p-6 mr-6 flex flex-col text-center rounded-lg items-center">
        {isAuthenticated ? (
          <>
            <img
              src={user.imageURL}
              alt={user.name}
              className="rounded-full h-[150px] w-[150px]"
            />
            <h2 className="mt-4 text-white">Hallo, {user.name}!</h2>
            <div className="flex gap-3 items-center mt-2">
              {isOnDashboard ? (
                <>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <button
                        className=" text-white text-xs underline cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                      <FaArrowRight className="text-white" />
                    </div>
                    <div className="flex gap-3">
                      <NavLink
                        to="/admindashboard"
                        className="text-white text-xs underline cursor-pointer"
                      >
                        Admin
                      </NavLink>
                      <FaArrowRight className="text-white" />
                    </div>
                  </div>
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
              Registriere dich oder melde dich an.
            </p>
            <div className="flex gap-3 items-center mt-2">
              <NavLink
                to="/login"
                className="text-white text-xs underline cursor-pointer"
              >
                Jetzt anmelden
              </NavLink>
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
          {interestsArray.map((e) => (
            <NavLink
              to={
                e.type == "question"
                  ? `/detailForum/${e.id}`
                  : `/detailBlog/${e.id}`
              }
            >
              <h4 className="truncate max-w-[30ch]">{e.title}</h4>
            </NavLink>
          ))}
        </div>
      )}

      <div className="bg-linear-to-r from-purple-500 to-indigo-500 p-6 mt-5 gap-2 mr-6 flex flex-col text-center rounded-lg items-start text-white">
        <h2 className="border-b-2 w-full text-left font-bold">Top Nutzer</h2>

        {topUserArray.map((e) => (
          <div className="flex ">
            <p className="text-left">{e.name}</p>
            <button className="cursor-pointer">
              <GoPlusCircle className="text-xl ml-2" />
            </button>
          </div>
        ))}
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
