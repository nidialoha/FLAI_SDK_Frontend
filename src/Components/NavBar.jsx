import React from "react";
import { NavLink } from "react-router";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { FaTrashAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";

function NavBar() {
  const [open, setOpen] = useState(false);

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
          <button onClick={() => setOpen(true)}>
            <img
              src="./src/assets/392523_bell_notification_remind_reminder_ring_icon.svg"
              alt="notification"
              className="bg-[#FFBE0A] rounded-full mr-5 cursor-pointer"
            />
          </button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <>
              <div className="flex flex-col gap-5">
                <div className="relative mb-5 border-b-1">
                  <h3>Notification</h3>
                  <MdClose
                    className="absolute top-0 right-0 cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <div className="grid grid-cols-7 gap-6 items-center">
                  <div className="bg-slate-100 rounded-full h-10 w-10"></div>
                  <p className="col-span-3 ">Lorem ipsum dolor sit ...</p>
                  <p className="col-span-2">vor 3 Min.</p>
                  <FaTrashAlt className="hover:text-red-500" />
                </div>
                <div className="grid grid-cols-7 gap-6 items-center">
                  <div className="bg-slate-100 rounded-full h-10 w-10"></div>
                  <p className="col-span-3">
                    sit amet consectetur adipisicing....
                  </p>
                  <p className="col-span-2">vor 10 Min.</p>
                  <FaTrashAlt className="hover:text-red-500" />
                </div>
                <div className="grid grid-cols-7 gap-6 items-center">
                  <div className="bg-slate-100 rounded-full h-10 w-10"></div>
                  <p className="col-span-3 ">Notification</p>
                  <p className="col-span-2">vor 30 Min.</p>
                  <FaTrashAlt className="hover:text-red-500" />
                </div>
              </div>
            </>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default NavBar;
