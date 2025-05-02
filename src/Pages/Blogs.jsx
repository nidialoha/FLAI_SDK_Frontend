import { CiFilter } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { TfiControlRecord } from "react-icons/tfi";
import { NavLink } from "react-router";

function Blogs() {
  return (
    <>
      <div className="flex justify-between items-cente ml-5 mt-5">
        <h1 className="font-black">Blogs</h1>
        <div className="flex gap-8 items-center">
          <button className="flex">
            <p>Filter</p>
            <CiFilter className="text-xl" />
          </button>

          <div>
            <button className="text-xs rounded-lg bg-[#FF658A] text-white p-2 cursor-pointer">
              Fragen stellen
            </button>
          </div>
        </div>
      </div>
      <NavLink to="/detailblog">
        <div className="mt-4 shadow-md p-6 ml-5 rounded-xl bg-white">
          <div className="flex gap-10 ">
            <div className="flex flex-col items-center">
              <p className="bg-slate-400 p-6 text-center rounded-full">Img</p>
              <div className="flex gap-2 text-right mt-3 items-center">
                <TfiControlRecord className="text-yellow-500" />
                <p>12</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-bold">Wie Tailwind funktioniert</h2>
              <p className="">
                The classic Latin passage that just never gets old, enjoy as
                much (or as little) lorem ipsum as you can handle with our easy
                to ...
              </p>
              <div className="flex gap-6">
                <p className="bg-slate-300 px-3 rounded-lg">#test</p>
                <p className="bg-slate-300 px-3 rounded-lg">#CSS</p>
              </div>
            </div>

            <div className="flex flex-col w-1/3 items-center">
              <div className="flex gap-3 mt-2">
                <AiOutlineLike />
                <p>4</p>
              </div>

              <div className="flex gap-3 mt-2">
                <FaRegEye />
                <p className="text-right">245</p>
              </div>
              <div className="flex gap-2 mt-2">
                <IoTimeOutline />
                <p>2 min.</p>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    </>
  );
}

export default Blogs;
