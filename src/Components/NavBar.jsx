import React from "react";
import { NavLink } from "react-router";

function NavBar() {
  return (
    <>
      <div className="flex justify-between pt-4">
        <img src="./src/assets/Logo.svg" alt="logo" className="w-1/7" />
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search" />
        </label>
        <div className="flex gap-8 items-center">
          <NavLink to="/forum">Forum</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <img
            src="./src/assets/392523_bell_notification_remind_reminder_ring_icon.svg"
            alt="notification"
            className="bg-[#FFBE0A] rounded-full h-1/2 "
          />
        </div>
      </div>
    </>
  );
}

export default NavBar;
