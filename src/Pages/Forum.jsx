import { CiFilter } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { NavLink } from "react-router";

function Forum() {
  return (
    <>
      <div className="flex justify-between items-center ml-5 mt-5">
        <h1 className="font-black">Forum</h1>
        <div className="flex gap-8 items-center">
          <button className="flex cursor-pointer">
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

      <NavLink to="/detailforum">
        <div className="mt-4 shadow-md p-6 ml-5 rounded-xl bg-white">
          <div className="flex gap-10 ">
            <div className="flex flex-col items-center">
              <p className="bg-slate-400 p-6 text-center rounded-full">Img</p>
              <div className="flex gap-2 text-right mt-3 items-center">
                <AiOutlineLike />
                <p>4</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-bold">Mein CSS funktioniert nicht!</h2>
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
              <p className="bg-black text-white p-4 justify-center">24</p>
              <div className="flex gap-3 mt-2 items-center">
                <FaRegEye />
                <p className="text-right">245</p>
              </div>
              <div className="flex gap-2 mt-2 items-center">
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

export default Forum;
