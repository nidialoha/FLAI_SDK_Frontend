import { CiFilter } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { NavLink } from "react-router";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import ModalForum from "../Modal/ModalForum";

function Forum() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  // Custom ToolBar
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ lsit: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ "code-block": true }],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "indent",
    "image",
    "code-block",
  ];

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
            <button
              onClick={() => setOpen(true)}
              className="text-xs rounded-lg bg-[#FF658A] text-white p-2 cursor-pointer"
            >
              Fragen stellen
            </button>

            <ModalForum open={open} onClose={() => setOpen(false)}>
              <div className="bg-white h-[400px] rounded-lg ml-5 overflow-hidden">
                <div>
                  <div className="flex justify-between items-center">
                    <h3>Titel</h3>
                    <MdClose
                      className="cursor-pointer"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <input
                    className="my-3 h-[30px] w-full bg-slate-100"
                    type="text"
                  />
                </div>
                <div>
                  <h3 className="mb-3">Inhalt</h3>
                  <ReactQuill
                    theme="snow"
                    value={value}
                    modules={modules}
                    formats={formats}
                    onChange={setValue}
                    className="quill-blog"
                  />
                </div>
              </div>
              <div className="ml-5">
                <button className="mt-3 text-xs rounded-lg bg-[#FF658A] text-white p-2 cursor-pointer w-full">
                  Jetzt fragen
                </button>
              </div>
            </ModalForum>
          </div>
        </div>
      </div>

      <NavLink to="/detailforum">
        <div className="mt-4 shadow-md p-6 ml-5 rounded-xl bg-white">
          <div className="flex gap-10 ">
            <div className="flex flex-col items-center">
              <p className="bg-slate-400 p-6 text-center rounded-full h-14 w-14"></p>
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

            <div className="flex flex-col w-1/3">
              <p className="bg-black text-white p-4 self-center">24</p>
              <div className="grid grid-cols-2 gap-4 mt-2 place-content-between">
                <FaRegEye />
                <p className="text-end">245</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2 place-content-between">
                <IoTimeOutline />
                <p className="text-end">2 min.</p>
              </div>
            </div>
          </div>
        </div>
      </NavLink>

      <div className="flex justify-center items-end mt-60 mb-10">
        <div className="join">
          <button className="join-item btn">1</button>
          <button className="join-item btn">2</button>
          <button className="join-item btn btn-disabled">...</button>
          <button className="join-item btn">99</button>
          <button className="join-item btn">100</button>
        </div>
      </div>
    </>
  );
}

export default Forum;
