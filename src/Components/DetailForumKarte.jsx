import { FaRegBookmark } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { TfiControlRecord } from "react-icons/tfi";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";

function DetailForumKarte({
  title,
  nutzerName,
  badges,
  likes,
  dislikes,
  views,
  time,
  text,
  tags,
}) {
  return (
    <>
      <div className="">
        <div className="flex justify-between items-baseline">
          <h6 className="pt-3 pb-4 font-bold ml-5">{title}</h6>
          <div className="flex pt-3 gap-5">
            <FaRegBookmark />
            <div className="flex flex-col items-center">
              <div className="flex gap-3">
                <AiOutlineLike />
                <p>{likes}</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex gap-3">
                <AiOutlineDislike />
                <p>{dislikes}</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex gap-3">
                <FaRegEye />
                <p>{views}</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex gap-3 mr-5">
                <IoTimeOutline />
                <p>{time}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6 border-b-1 pb-5">
          <p className="bg-slate-200 rounded-full ml-5 w-14 h-14"></p>
          <div>
            <h6 className="font-bold">{nutzerName}</h6>

            <div className="flex gap-2 text-right mt-1 items-center">
              <TfiControlRecord className="text-yellow-500" />
              <p>{badges}</p>
            </div>
          </div>
        </div>

        <div className="m-5">
          <Markdown children={text} rehypePlugins={rehypeRaw}></Markdown>
          {/* <p>{stripHtml(text)}</p> */}
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag, idx) => (
              <p key={idx} className="bg-slate-300 px-3 rounded-lg mt-6">
                #{tag}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailForumKarte;
