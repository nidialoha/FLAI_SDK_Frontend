import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { FaTrashAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import ModalSearch from "../Modal/ModalSearch";

function NavBar() {
  const [open, setOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const isOnSignupLogin = ["/signup", "/login"].includes(location.pathname);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      avatar: "", // z.B. Bild-URL
      message: "Lorem ipsum dolor sit ...",
      time: "vor 3 Min.",
    },
    {
      id: 2,
      avatar: "",
      message: "sit amet consectetur adipisicing....",
      time: "vor 10 Min.",
    },
    {
      id: 3,
      avatar: "",
      message: "Notification",
      time: "vor 30 Min.",
    },
  ]);

  const handleDelete = (id) => {
    const newNotifications = notifications.filter((item) => item.id !== id);
    setNotifications(newNotifications);
  };

  const handleSearch = async (e) => {
    try {
      if (e.key != "Enter") return;
      if (!searchValue) return;
      let requestObject = { searchString: searchValue, type: null };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/forum/search`,
        {
          method: "POST",
          body: JSON.stringify(requestObject),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error();
      const res = await response.json();
      console.log(res);
      setSearchModalOpen(true);
      setSearchResults([...res]);
    } catch (error) {
      console.log(error);
    }
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };
  return (
    <div className="flex justify-between pt-4">
      <img
        src={
          isOnSignupLogin
            ? "https://res.cloudinary.com/dtgshnrcb/image/upload/v1747205083/eteakt5n9cmbagluxdx5.svg"
            : "https://res.cloudinary.com/dtgshnrcb/image/upload/v1747205076/skott6nt0pzdgdyhesvw.svg"
        }
        alt="logo"
        className="w-1/7"
      />

      {!isOnSignupLogin && (
        <>
          <label className="input mt-5">
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
            <input
              type="search"
              onKeyUp={handleSearch}
              onChange={(e) => setSearchValue(e.target.value.trim())}
              required
              placeholder="Search"
            />
          </label>

          <ModalSearch
            open={searchModalOpen}
            onClose={() => setSearchModalOpen(false)}
          >
            <div className="flex flex-col gap-5">
              <div className="relative mb-5 border-b-1">
                <h3>Suchergebnisse</h3>
                <MdClose
                  className="absolute top-0 right-0 cursor-pointer"
                  onClick={() => setSearchModalOpen(false)}
                />
              </div>

              {searchResults.map((s) => (
                <NavLink
                  onClick={() => setSearchModalOpen(false)}
                  to={
                    s.type == "question"
                      ? `/detailForum/${s.id}`
                      : `/detailBlog/${s.id}`
                  }
                >
                  <div key={s.id} className="items-center mb-3">
                    <h3 className="">{s.title}</h3>
                    <p className=" line-clamp-1">{stripHtml(s.content)}</p>
                  </div>
                </NavLink>
              ))}
            </div>
          </ModalSearch>
        </>
      )}
      <div className="flex gap-8 p-4 items-center">
        {isOnSignupLogin ? (
          <>
            <NavLink className="text-white" to="/forum">
              Forum
            </NavLink>
            <NavLink className="text-white" to="/blog">
              Blog
            </NavLink>
          </>
        ) : (
          <>
            {" "}
            <NavLink to="/forum">Forum</NavLink>
            <NavLink to="/blog">Blog</NavLink>{" "}
          </>
        )}

        {!isOnSignupLogin && (
          <>
            <button onClick={() => setOpen(true)}>
              <img
                src="392523_bell_notification_remind_reminder_ring_icon.svg"
                alt="notification"
                className="bg-[#FFBE0A] rounded-full mr-5 cursor-pointer"
              />
            </button>

            <Modal open={open} onClose={() => setOpen(false)}>
              <div className="flex flex-col gap-5">
                <div className="relative mb-5 border-b-1">
                  <h3>Notification</h3>
                  <MdClose
                    className="absolute top-0 right-0 cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>

                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="grid grid-cols-7 gap-4 items-center mb-3"
                  >
                    <div className="bg-slate-100 rounded-full h-10 w-10"></div>
                    <p className="col-span-3">{n.message}</p>
                    <p className="col-span-2">{n.time}</p>
                    <FaTrashAlt
                      className="hover:text-red-500 cursor-pointer"
                      onClick={() => handleDelete(n.id)}
                    />
                  </div>
                ))}
              </div>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
