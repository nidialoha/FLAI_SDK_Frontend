import { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import DetailForumKarte from "../Components/DetailForumKarte";
import KommentarKarte from "../Components/KommentarKarte";
import AntwortKarte from "../Components/AntwortKarte";
import { useAuth } from "../Context/AuthProvider";
import { FaArrowRight } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { RingLoader } from "react-spinners";

function DetailForum() {
  const { id } = useParams();
  const { user } = useAuth();
  const [generalObject, setGeneralObject] = useState({
    mainPost: { tags: [], comments: [] },
    answers: [{ comments: [] }, ],
    hasAIAnswer:false
  });
  const [readyForAI, setReadyForAI] = useState(false);
  const [valueAntwort, setValueAntwort] = useState("");
  const [valueKommentar, setValueKommentar] = useState("");
  const [kommentare, setKommentare] = useState([]);
  const [antworten, setAntworten] = useState([]);
  const [alleKommentareAnzeigen, setAlleKommentareAnzeigen] = useState(false);
  const [aktivesKommentarFeld, setAktivesKommentarFeld] = useState(null);
  const [kommentarWerte, setKommentarWerte] = useState({});
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();
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

  useEffect(()=>{
    fetchGeneralObject();
  }, [id])
  //const generalObject = {main:{...postObject, comments: []}, answers:[{...answerObject, commments:[]}]};

  // Quill Module
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["code-block"],
      ["clean"],
    ],
  };

  const modulesKommentar = {
    toolbar: [["bold", "italic", "underline", "strike", "blockquote"]],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "code-block",
  ];

  // Beispiel-Daten (später durch API ersetzen)
  const detailForum = [
    {
      id: 1,
      title: "Mein CSS funktioniert nicht!",
      nutzerName: "Max Mustermann",
      badges: 116,
      likes: 20,
      dislikes: 10,
      views: 245,
      time: "124 min.",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. CSS Probleme lassen sich oft mit dem Dev-Tool erkennen.",
      tags: ["CSS", "Frontend"],
    },
  ];

  const handleAntwortAbschicken = () => {
    if (!valueAntwort.trim()) return;

    setAntworten((prev) => [
      ...prev,
      {
        id: Date.now(),
        inhalt: valueAntwort,
        nutzername: user?.name || "Max Mustermann",
        profilbild: user?.picture || "https://via.placeholder.com/56",
        badges: 12,
        likeAntwort: 0,
        dislikeAntwort: 0,
        kommentarAntwort: [],
        userReaction: null,
      },
    ]);
    setValueAntwort("");
  };

  const toggleReaction = (id, type) => {
    setAntworten((prevAntwort) =>
      prevAntwort.map((eintrag) => {
        if (eintrag.id !== id) return eintrag;

        let { likeAntwort, dislikeAntwort, userReaction } = eintrag;

        if (userReaction === type) {
          // Reaktion zurücknehmen
          if (type === "like") likeAntwort--;
          else dislikeAntwort--;

          return {
            ...eintrag,
            likeAntwort,
            dislikeAntwort,
            userReaction: null,
          };
        }

        // Neue Reaktion oder Wechsel
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/forum/`, {
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
          hasAIAnswer: generalObject.hasAIAnswer
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
          hasAIAnswer: generalObject.hasAIAnswer
        });
      }
      setValueKommentar("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAnswerSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!valueAntwort.trim()) return;
      let refId = e.target.dataset.refid;
      console.log(refId);
      const answer = {
        type: "answer",
        content: valueAntwort,
        userId: user.id,
        refId,
      };
      const response = await fetch(`${import.meta.env.VITE_API_URL}/forum/`, {
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
      setValueAntwort("");
      setGeneralObject({
        mainPost: {
          ...generalObject.mainPost,
        },
        answers: [...answersArray],
        hasAIAnswer: generalObject.hasAIAnswer
      });
    } catch (error) {
      console.log(error);
    }
  };

  

  const generateAIAnswer = async (e) => {
    try {
      e.preventDefault();
      if(generalObject.hasAIAnswer) return;
      setIsLoading(true);
      
      let refId = e.target.dataset.refid;
      console.log(refId);
      let requestObject = { message: generalObject.mainPost.title + " "+generalObject.mainPost.content };            
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/forum/ai/${refId}`,
        {
          method: "POST",
          body: JSON.stringify(requestObject),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error();
      const res = await response.json();
      console.log(res);
      let answersArray = [...generalObject.answers];
      answersArray.push({ ...res.aiResponse, comments: [] });
      setGeneralObject({
        mainPost: {
          ...generalObject.mainPost,
        },
        answers: [...answersArray],
        hasAIAnswer: true
      });
      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    
      <button
        className="flex gap-3 ml-5 mt-3 cursor-pointer hover:font-black"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        <p>Zurück</p>
      </button>

      <div className="bg-white pb-2 rounded-lg ml-5 mt-5">
        {
          <DetailForumKarte
            key={generalObject.mainPost.id}
            title={generalObject.mainPost.title}
            nutzerName={generalObject.mainPost.userName}
            text={generalObject.mainPost.content}
            tags={generalObject.mainPost.tags}
            views={generalObject.mainPost.viewCount}
            badges={0}
            time={
              Math.floor(
                (Date.now() - Date.parse(generalObject.mainPost.createdAt)) /
                  1000
              ) > 60
                ? Math.floor(
                    (Date.now() -
                      Date.parse(generalObject.mainPost.createdAt)) /
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
                    (Date.now() -
                      Date.parse(generalObject.mainPost.createdAt)) /
                      1000
                  )} Sek.`
            }
            likes={generalObject.mainPost.numberOfLikes}
            dislikes={generalObject.mainPost.numberOfDislikes}
          />
        }

        {/* Kommentar zur Frage */}
        <div className="w-full px-5">
          <input
            type="text"
            value={valueKommentar}
            onChange={(e) => {
              setValueKommentar(e.target.value);
            }}
            className="bg-slate-100 rounded-lg overflow-hidden w-full mb-2 p-1.5"
          />
        </div>
        <button
          className="mb-2 text-xs rounded-lg bg-slate-500 text-white p-2 cursor-pointer ml-5"
          data-refid={generalObject.mainPost.id}
          onClick={handleCommentSubmit}
        >
          Kommentar senden
        </button>
        {/* Kommentare zur Frage */}
        {generalObject.mainPost.comments.map((kommentar, index) => (
          <KommentarKarte
            key={index}
            inhalt={kommentar.content}
            profilbild={kommentar.image}
            name={kommentar.userName}
          />
        ))}
      </div>

      {/* {!alleKommentareAnzeigen && kommentare.length > 5 && (
        <button
          className="underline text-xs mt-3 mb-5 cursor-pointer ml-5"
          onClick={() => setAlleKommentareAnzeigen(true)}
        >
          Mehr Kommentare anzeigen
        </button>
      )} */}

      {user!==null && !generalObject.hasAIAnswer && readyForAI && generalObject.mainPost.userId == user.id && (
        <div className="ml-5">
        <button
          onClick={generateAIAnswer}
          data-refid={generalObject.mainPost.id}
          disabled={isLoading}          
          className={`mt-3 text-xs rounded-lg bg-indigo-500 text-white p-2 cursor-pointer w-full`}
        >
          {isLoading ? (<div className="flex flex-row justify-center"><RingLoader
        color="#fff"
        loading={isLoading}
        className="mr-5"
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> Generiere KI Antwort...
            </div>) : (<>Frag Robo Pinta</>)}
        </button>
        </div>
        
      )}
      {/* Antworten */}
      <h2 className="font-bold ml-5 mb-2 mt-4">Antwort geben</h2>
      <div className="bg-white h-[250px] rounded-lg ml-5 overflow-hidden">
        <ReactQuill
          theme="snow"
          value={valueAntwort}
          modules={modules}
          formats={formats}
          onChange={setValueAntwort}
          className="quill-antwort"
        />
      </div>
      <div className="ml-5">
        <button
          onClick={handleAnswerSubmit}
          data-refid={generalObject.mainPost.id}
          className="mt-3 text-xs rounded-lg bg-[#FF658A] text-white p-2 cursor-pointer w-full"
        >
          Antwort senden
        </button>
      </div>

      <h2 className="font-bold ml-5 mt-5">Antworten</h2>
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

export default DetailForum;
