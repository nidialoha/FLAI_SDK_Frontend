import { FaRegEye } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { TfiControlRecord } from "react-icons/tfi";
import { NavLink } from "react-router";
import "quill/dist/quill.snow.css";

function BlogKarte({ title, text, tags, badges, likes, views, time, id }) {
  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };
  return (
    <>
      <NavLink to={`/detailblog/${id}`}>
        <div className="mt-4 shadow-md p-6 ml-5 rounded-xl bg-white">
          <div className="grid grid-cols-5 gap-10 ">
            <div className="flex flex-col items-center border-r-1">
              <p className="bg-slate-400 text-center rounded-full h-14 w-14"></p>
              <div className="flex gap-2 text-right mt-3 items-center">
                <TfiControlRecord className="text-yellow-500" />
                <p>{badges}</p>
              </div>
            </div>

            <div className="col-span-3">
              <h2 className="font-bold mb-4">{title}</h2>
              <p className="line-clamp-2 text-gray-700 text-sm">
                {stripHtml(text)}
              </p>
              <div className="flex gap-2 flex-wrap">
                {tags.map((tag, idx) => (
                  <p key={idx} className="bg-slate-300 px-3 rounded-lg mt-6">
                    #{tag}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="grid grid-cols-2 gap-4 pt-2 place-content-between pb-4 border-b-1 border-l-1 w-full">
                <AiOutlineLike className="place-self-end" />
                <p className="text-start">{likes}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 place-content-between pb-4 border-b-1 border-l-1 h-full w-full">
                <FaRegEye className="place-self-end" />
                <p className="text-start">{views}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2 place-content-between pb-4 border-l-1  w-full">
                <IoTimeOutline className="place-self-end" />
                <p className="text-start">{time}</p>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    </>
  );
}

export default BlogKarte;
