import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { TfiControlRecord } from "react-icons/tfi";
import KommentarKarte from "./KommentarKarte";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

function AntwortKarte({
  nutzerNameKommentar,
  nutzerBadges,
  kommentarPost,
  kommentarAntwort,
  likeAntwort,
  dislikeAntwort,
  userReaction,
  onReact,
  bild,
  isAIAnswer
}) {
 
  return (
    <>
      {/* Kommentare Section */}
      <div className="border-b-1 mt-2 ml-5"></div>
      <div>
        <div className="flex justify-between">
          <div className="flex gap-6 pb-5 pt-5 ">
            
              <img
                src={bild}
                alt={nutzerNameKommentar}
                className="rounded-full ml-5 w-14 h-14"
              />
            
            <div>
              <h6 className="font-bold text-sm">{nutzerNameKommentar}</h6>

              <div className="flex gap-2 text-right mt-1 items-center">
                <TfiControlRecord className="text-yellow-500" />
                <p>{nutzerBadges}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-6 pb-5 pt-5">
            <div className="flex flex-col items-center">
              <button
                className={`cursor-pointer flex gap-2 ${
                  userReaction === "like" ? "text-red-500" : ""
                }`}
                onClick={() => onReact("like")}
              >
                <AiOutlineLike />
                <p>{likeAntwort}</p>
              </button>
            </div>

            <div className="flex flex-col items-center">
              <button
                className={`cursor-pointer flex gap-2 ${
                  userReaction === "dislike" ? "text-red-500" : ""
                }`}
                onClick={() => onReact("dislike")}
              >
                <AiOutlineDislike />
                <p>{dislikeAntwort}</p>
              </button>
            </div>
          </div>
        </div>

        <div className="border-b-1 ml-5"></div>

        {/* Inhalt Kommentare */}
        <div>
          {/* <p className="ml-5 text-sm font-semibold mt-3">
            {stripHtml(kommentarPost)}
          </p> */}

          <div
            className="ml-5 text-sm font-semibold mt-3 leading-relaxed space-y-2 prose prose-sm max-w-none"
          >
            {isAIAnswer ? (<Markdown children={kommentarPost}></Markdown>) : ( <Markdown children={kommentarPost} rehypePlugins={rehypeRaw}></Markdown>
          )}
          </div>
          {/* <button className="underline text-xs italic ml-5 hover:font-bold cursor-pointer">
            Kommentieren
          </button> */}
          <div className="ml-9">
            {kommentarAntwort.map((kommentarAntwort, idx) => (
              <KommentarKarte
                key={idx}
                inhalt={kommentarAntwort.content}
                profilbild={kommentarAntwort.image}
                name={kommentarAntwort.userName}
              />
              // <li key={idx} className="mt-2 text-xs">
              //   {stripHtml(kommentarAntwort)}
              // </li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AntwortKarte;
