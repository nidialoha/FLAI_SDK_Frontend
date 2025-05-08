import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { TfiControlRecord } from "react-icons/tfi";
import { useAuth0 } from "@auth0/auth0-react";

function AntwortKarte({
  nutzerNameKommentar,
  nutzerBadges,
  kommentarPost,
  kommentarAntwort,
  likeAntwort,
  dislikeAntwort,
  userReaction,
  onReact,
}) {
  const { user, isAuthenticated } = useAuth0();
  return (
    <>
      {/* Kommentare Section */}
      <div className="border-b-1 mt-2 ml-5"></div>
      <div>
        <div className="flex justify-between">
          <div className="flex gap-6 pb-5 pt-5 ">
            {isAuthenticated && (
              <img
                src={user.picture}
                alt={user.name}
                className="rounded-full ml-5 w-14 h-14"
              />
            )}
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
          <p className="ml-5 text-sm font-semibold mt-3">{kommentarPost}</p>
          {/* <button className="underline text-xs italic ml-5 hover:font-bold cursor-pointer">
            Kommentieren
          </button> */}
          <div className="ml-9">
            {kommentarAntwort.map((kommentarAntwort, idx) => (
              <li key={idx} className="mt-2 text-xs">
                {kommentarAntwort}
              </li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AntwortKarte;
