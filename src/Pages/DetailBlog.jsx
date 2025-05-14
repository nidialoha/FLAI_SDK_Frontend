import { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import DetailBlogKarte from "../Components/DetailBlogKarte";
import AntwortKarte from "../Components/AntwortKarte";
import { useAuth } from "../Context/AuthProvider";
import { FaArrowRight } from "react-icons/fa";

function DetailBlog() {
  const { id } = useParams();
  const [generalObject, setGeneralObject] = useState({
    mainPost: { tags: [], comments: [] },
    answers: [{ comments: [] }],
    hasAIAnswer: false,
  });
  const [value, setValue] = useState(""); // Antwort/Kommentar zu MainPost
  const [antwort, setAntwort] = useState([]);
  const [valueKommentar, setValueKommentar] = useState("");
  const [kommentarWerte, setKommentarWerte] = useState({});
  const [aktivesKommentarFeld, setAktivesKommentarFeld] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const fetchGeneralObject = async () => {
    try {
      console.log(isLoading);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/forum/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error();
      const res = await response.json();
      console.log(res);
      let dateOfPost = Date.parse(res.mainPost.createdAt);
      let difference = Date.now() - dateOfPost;
      if (difference > 1000 * 60 * 120) setReadyForAI(true);
      setGeneralObject({ ...res });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGeneralObject();
  }, []);

  useEffect(() => {
    fetchGeneralObject();
  }, [id]);

  // Kommentar hinzufügen
  const handleAnswerSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!value.trim()) return;
      let refId = e.target.dataset.refid;
      console.log(refId);
      const answer = {
        type: "answer",
        content: value,
        userId: user.id,
        refId,
      };
      const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs/`, {
        method: "POST",
        body: JSON.stringify(answer),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error();
      const res = await response.json();
      console.log(res);
      let answersArray = [...generalObject.answers];
      answersArray.push({ ...res.createdPost, comments: [] });
      setValue("");
      setGeneralObject({
        mainPost: {
          ...generalObject.mainPost,
        },
        answers: [...answersArray],
        hasAIAnswer: generalObject.hasAIAnswer,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!valueKommentar.trim()) return;
      let refId = e.target.dataset.refid;
      console.log(refId);
      const comment = {
        type: "comment",
        content: valueKommentar,
        userId: user.id,
        refId,
      };
      const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs/`, {
        method: "POST",
        body: JSON.stringify(comment),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error();
      const res = await response.json();
      console.log(res);
      if (generalObject.mainPost.id == refId) {
        let mainPostComments = [...generalObject.mainPost.comments];
        mainPostComments.push({ ...res.createdPost });

        setGeneralObject({
          mainPost: {
            ...generalObject.mainPost,
            comments: [...mainPostComments],
          },
          answers: [...generalObject.answers],
          hasAIAnswer: generalObject.hasAIAnswer,
        });
      } else {
        let answersArray = [...generalObject.answers];
        let commentsArrayToUpdate = answersArray.find(
          (a) => a.id == refId
        ).comments;
        commentsArrayToUpdate.push({ ...res.createdPost });
        let updatedAnswers = answersArray.map((el) =>
          el.id == refId
            ? { ...el, comments: commentsArrayToUpdate }
            : { ...el }
        );
        setGeneralObject({
          mainPost: { ...generalObject.mainPost },
          answers: [...updatedAnswers],
          hasAIAnswer: generalObject.hasAIAnswer,
        });
      }
      setValueKommentar("");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleReaction = (id, type) => {
    setAntwort((prevAntwort) =>
      prevAntwort.map((eintrag) => {
        if (eintrag.id !== id) return eintrag;

        let { likeAntwort, dislikeAntwort, userReaction } = eintrag;

        if (userReaction === type) {
          // Toggle off
          if (type === "like") likeAntwort--;
          else dislikeAntwort--;

          return {
            ...eintrag,
            likeAntwort,
            dislikeAntwort,
            userReaction: null,
          };
        }

        // Toggle switch or add new
        if (type === "like") {
          likeAntwort++;
          if (userReaction === "dislike") dislikeAntwort--;
        } else {
          dislikeAntwort++;
          if (userReaction === "like") likeAntwort--;
        }

        return {
          ...eintrag,
          likeAntwort,
          dislikeAntwort,
          userReaction: type,
        };
      })
    );
  };

  let navigate = useNavigate();

  const modulesKommentar = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["link"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };
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
      <button
        className="flex gap-3 ml-5 mt-3 cursor-pointer hover:font-black"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        <p>Zurück</p>
      </button>
      {/* Karte */}

      {
        <DetailBlogKarte
          key={generalObject.mainPost.id}
          title={generalObject.mainPost.title}
          nutzerName={generalObject.mainPost.userName}
          text={generalObject.mainPost.content}
          tags={generalObject.mainPost.tags}
          views={generalObject.mainPost.viewCount}
          badges={0}
          time={
            Math.floor(
              (Date.now() - Date.parse(generalObject.mainPost.createdAt)) / 1000
            ) > 60
              ? Math.floor(
                  (Date.now() - Date.parse(generalObject.mainPost.createdAt)) /
                    1000 /
                    60
                ) > 60
                ? Math.floor(
                    (Date.now() -
                      Date.parse(generalObject.mainPost.createdAt)) /
                      1000 /
                      60 /
                      60
                  ) > 24
                  ? `${Math.floor(
                      (Date.now() -
                        Date.parse(generalObject.mainPost.createdAt)) /
                        1000 /
                        60 /
                        60 /
                        24
                    )} Tag(e)`
                  : `${Math.floor(
                      (Date.now() -
                        Date.parse(generalObject.mainPost.createdAt)) /
                        1000 /
                        60 /
                        60
                    )} Std.`
                : `${Math.floor(
                    (Date.now() -
                      Date.parse(generalObject.mainPost.createdAt)) /
                      1000 /
                      60
                  )} Min.`
              : `${Math.floor(
                  (Date.now() - Date.parse(generalObject.mainPost.createdAt)) /
                    1000
                )} Sek.`
          }
          likes={generalObject.mainPost.numberOfLikes}
          dislikes={generalObject.mainPost.numberOfDislikes}
        />
      }

      {/* Editor Bereich */}
      <div className="bg-white h-[220px] rounded-lg ml-5 overflow-hidden">
        <ReactQuill
          theme="snow"
          value={value}
          modules={modules}
          formats={formats}
          onChange={setValue}
          className="quill-antwort"
        />
      </div>
      <div className="ml-5">
        <button
          onClick={handleAnswerSubmit}
          className="mt-3 text-xs rounded-lg bg-[#FF658A] text-white p-2 cursor-pointer w-full"
        >
          Kommentar schicken
        </button>
      </div>
      <div>
        <h2 className="font-bold ml-5 mt-4">Kommentare</h2>
      </div>
      {generalObject.answers.map((eintrag) => (
        <div key={eintrag.id}>
          <AntwortKarte
            nutzerNameKommentar={eintrag.userName}
            nutzerBadges={0}
            kommentarPost={eintrag.content}
            kommentarAntwort={eintrag.comments}
            likeAntwort={eintrag.numberOfLikes}
            dislikeAntwort={eintrag.numberOfDislikes}
            userReaction={""}
            onReact={""}
            bild={eintrag.image}
          />

          {/* Kommentar-Editor für Antwort */}
          <button
            className="underline text-xs italic ml-5 cursor-pointer hover:font-bold hover:text-[#FF658A]"
            onClick={() =>
              setAktivesKommentarFeld(
                aktivesKommentarFeld === eintrag.id ? null : eintrag.id
              )
            }
          >
            <div className="flex gap-2">
              <p>Kommentieren</p>
              <FaArrowRight />
            </div>
          </button>

          {aktivesKommentarFeld === eintrag.id && (
            <div className="w-full p-5 ">
              <input
                className="bg-slate-100 rounded-lg w-full mb-2 p-2"
                value={valueKommentar}
                onChange={(e) => setValueKommentar(e.target.value)}
              />
              <button
                data-refid={eintrag.id}
                onClick={handleCommentSubmit}
                className="mt-2 text-xs rounded-lg bg-slate-500 text-white p-2 cursor-pointer"
              >
                Kommentar senden
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default DetailBlog;
