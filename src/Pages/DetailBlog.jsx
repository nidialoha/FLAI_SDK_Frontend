import { CiFilter } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { TfiControlRecord } from "react-icons/tfi";

function DetailBlog() {
  return (
    <>
      <div className="flex justify-end mr-5">
        <div className="flex gap-8 items-center pt-4">
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

      <div className="bg-white shadow-lg rounded-lg ml-5 mt-5">
        <div className="flex justify-between items-baseline">
          <h6 className="pt-3 pb-4 ml-5 font-bold">
            Wie Tailwind funktinoiert
          </h6>
          <div className="flex pt-3 gap-5">
            <FaRegBookmark />
            <div className="flex flex-col items-center">
              <div className="flex gap-3">
                <AiOutlineLike />
                <p>4</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex gap-3">
                <FaRegEye />
                <p>245</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex gap-3 mr-5">
                <IoTimeOutline />
                <p>2 min.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6 border-b-1 pb-5">
          <p className="bg-slate-200 rounded-full ml-5 w-14 h-14"></p>
          <div>
            <h6 className="font-bold">Name Nutzer</h6>

            <div className="flex gap-2 text-right mt-1 items-center">
              <TfiControlRecord className="text-yellow-500" />
              <p>12</p>
            </div>
          </div>
        </div>

        <div className="m-5">
          <p>
            The classic Latin passage that just never gets old, enjoy as much
            (or as little) lorem ipsum as you can handle with our easy to use
            filler text generator. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <div className="flex gap-5 mt-6 pb-6">
            <p className="bg-slate-200 px-4 rounded-full">#CSS</p>
            <p className="bg-slate-200 px-4 rounded-full">#Javascript</p>
          </div>
        </div>
      </div>
      <h2 className="font-bold ml-5">Antwort geben</h2>

      <div>
        <p className="ml-5 mt-3 pb-4">
          vor 2 Std. hast du "TITEL von BLOG" kommentiert
        </p>
      </div>
    </>
  );
}

export default DetailBlog;
