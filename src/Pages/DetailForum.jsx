import { CiFilter } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { TfiControlRecord } from "react-icons/tfi";

function DetailForum() {
  return (
    <>
      <div className="flex justify-end">
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

      <div className="bg-white rounded-lg ml-5 mt-5">
        <div className="flex justify-between items-baseline">
          <h6 className="pt-3 pb-4 ml-5 font-bold">
            Mein CSS funktioniert nicht!
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
                <AiOutlineDislike />
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

          {/* QUILL von Yannis. Editor zum kommentieren der Frage */}
          <div className="bg-slate-100 h-[100px] rounded-lg">
            <p>Kommentar Feld</p>
          </div>

          {/* Antwort von einige Nutzer */}
          <div className="flex mt-3 gap-4 items-center">
            <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
            <p>Warum ist die Banane krum?</p>
          </div>

          <div className="flex mt-3 gap-4 items-center">
            <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
            <p>Warum ist die Banane krum?</p>
          </div>
          <div className="flex mt-3 gap-4 items-center">
            <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
            <p>Warum ist die Banane krum?</p>
          </div>
          <button className="underline text-xs mt-3 mb-5">
            Mehr Kommentar ansehen
          </button>
        </div>
      </div>
      <h2 className="font-bold ml-5 mb-3">Antwort geben</h2>

      {/* Editor Bereich */}
      <div className="bg-white h-[100px] rounded-lg ml-5">
        <p>Antwort feld mit Editor von Yannis</p>
      </div>

      {/* Kommentare Section */}
      <div>
        <h2 className="font-bold ml-5 mt-4">Antwort von Nutzer</h2>
      </div>
      <div className="border-b-1 mt-2 ml-5"></div>
      <div>
        <div className="flex justify-between">
          <div className="flex gap-6 pb-5 pt-5 ">
            <p className="bg-slate-200 rounded-full ml-5 w-14 h-14"></p>
            <div>
              <h6 className="font-bold text-sm">Name Nutzer</h6>

              <div className="flex gap-2 text-right mt-1 items-center">
                <TfiControlRecord className="text-yellow-500" />
                <p>12</p>
              </div>
            </div>
          </div>

          <div className="flex gap-6 pb-5 pt-5">
            <div className="flex flex-col items-center">
              <div className="flex gap-3">
                <AiOutlineLike />
                <p>4</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex gap-3">
                <AiOutlineDislike />
                <p>4</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b-1 ml-5"></div>

        {/* Inhalt Kommentare */}
        <div>
          <h6 className="font-bold text-xs ml-5 mt-5">Titel von Kommentar</h6>
          <p className="ml-5 text-xs mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <button className="underline text-xs italic ml-5">
            Kommentieren
          </button>
        </div>
      </div>
    </>
  );
}

export default DetailForum;
