import { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import DetailBlogKarte from "../Components/DetailBlogKarte";
import AntwortKarte from "../Components/AntwortKarte";
import { useAuth0 } from "@auth0/auth0-react";

function DetailBlog() {
  const [value, setValue] = useState("");
  const [antwort, setAntwort] = useState([]);
  const { user, isAuthenticated } = useAuth0();

  const detailBlog = [
    {
      id: 1,
      title: "Wie Tailwind funktioniert.",
      nutzerName: "Max Mustermann",
      badges: 12,
      likes: 20,
      views: 4,
      time: "2 min.",
      text: "The classic Latin passage that just never gets old, enjoy as much (or as little) lorem ipsum as you can handle with our easy to use filler text generator. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      tags: ["Schlagwort", "CSS"],
    },
  ];

  useEffect(() => {
    const fetchedAntwort = [
      {
        id: 1,
        nutzerNameKommentar: "Bob the Builder",
        nutzerBadges: 13,
        kommentarPost: "Test kommentar Post",
        likeAntwort: 6,
        dislikeAntwort: 2,
        kommentarAntwort: [
          "Kommentar 1 zu Kommentar",
          "Kommentar 2 zu Kommentar",
        ],
        userReaction: null,
      },
    ];

    setAntwort(fetchedAntwort);
  }, []);

  // Kommentar hinzufügen
  const kommentarHinzufuegen = () => {
    if (!value.trim() || !isAuthenticated) return;

    const neuerKommentar = {
      id: antwort.length + 1,
      nutzerNameKommentar: user?.name || "Anonymer Nutzer",
      nutzerBadges: Math.floor(Math.random() * 10) + 1, // später dynamisch
      kommentarPost: value,
      likeAntwort: 0,
      dislikeAntwort: 0,
      kommentarAntwort: [],
      userReaction: null,
    };

    setAntwort((prev) => [...prev, neuerKommentar]);
    setValue(""); // Editor leeren
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

      {detailBlog.map((blogEintrag) => (
        <DetailBlogKarte
          key={blogEintrag.id}
          title={blogEintrag.title}
          nutzerName={blogEintrag.nutzerName}
          badges={blogEintrag.badges}
          likes={blogEintrag.likes}
          views={blogEintrag.views}
          time={blogEintrag.time}
          text={blogEintrag.text}
          tags={blogEintrag.tags}
        />
      ))}

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
          onClick={kommentarHinzufuegen}
          className="mt-3 text-xs rounded-lg bg-[#FF658A] text-white p-2 cursor-pointer w-full"
        >
          Kommentar schicken
        </button>
      </div>
      <div>
        <h2 className="font-bold ml-5 mt-4">Kommentare</h2>
      </div>
      {antwort.map((blogEintrag) => (
        <AntwortKarte
          key={blogEintrag.id}
          nutzerNameKommentar={blogEintrag.nutzerNameKommentar}
          nutzerBadges={blogEintrag.nutzerBadges}
          kommentarPost={blogEintrag.kommentarPost}
          likeAntwort={blogEintrag.likeAntwort}
          dislikeAntwort={blogEintrag.dislikeAntwort}
          kommentarAntwort={blogEintrag.kommentarAntwort}
          userReaction={blogEintrag.userReaction}
          onReact={(type) => toggleReaction(blogEintrag.id, type)}
        />
      ))}
    </>
  );
}

export default DetailBlog;
