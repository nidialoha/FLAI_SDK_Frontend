import { CiFilter } from "react-icons/ci";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import ModalForum from "../Modal/ModalForum";
import ForumKarte from "../Components/ForumKarte";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../Context/AuthProvider";

function Forum() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [titel, setTitel] = useState("");
  //const [isPrivate, setIsPrivate] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [customTag, setCustomTag] = useState("");
  const { user } = useAuth();

  const [forumBeitraege, setForumBeitraege] = useState([]);

  useEffect(() => {
    console.log(forumBeitraege);
  }, [forumBeitraege]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log("before fetch questions");
        let questionArray = [];
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/forum?type=question`,
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
        console.log("Daten: " + res.posts);
        questionArray = res.posts;
        const beitraege = questionArray.map((e) => ({
          ...e,
          time:
            Math.floor((Date.now() - Date.parse(e.createdAt)) / 1000) > 60
              ? Math.floor((Date.now() - Date.parse(e.createdAt)) / 1000 / 60) >
                60
                ? Math.floor(
                    (Date.now() - Date.parse(e.createdAt)) / 1000 / 60 / 60
                  ) > 24
                  ? `${Math.floor(
                      (Date.now() - Date.parse(e.createdAt)) /
                        1000 /
                        60 /
                        60 /
                        24
                    )} Tag(e)`
                  : `${Math.floor(
                      (Date.now() - Date.parse(e.createdAt)) / 1000 / 60 / 60
                    )} Std.`
                : `${Math.floor(
                    (Date.now() - Date.parse(e.createdAt)) / 1000 / 60
                  )} Min.`
              : `${Math.floor(
                  (Date.now() - Date.parse(e.createdAt)) / 1000
                )} Sek.`,
        }));
        //beitraege.sort((a, b) => a.createdAt - b.createdAt);
        setForumBeitraege(beitraege);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, []);

  const availableTags = ["CSS", "JS", "React"];

  const addTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleCustomTagAdd = () => {
    const tag = customTag.trim();
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      setCustomTag("");
    }
  };

  const handleCreateBeitrag = async () => {
    try {
      let neuerBeitrag = {
        title: titel,
        content: value,
        type: "question",
        userId: user.id,
        //isPrivate,
        tags: selectedTags,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/forum`, {
        method: "POST",
        body: JSON.stringify(neuerBeitrag),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error();

      const res = await response.json();
      neuerBeitrag = res.createdPost;
      neuerBeitrag.time =
        Math.floor((Date.now() - Date.parse(neuerBeitrag.createdAt)) / 1000) >
        60
          ? `${Math.floor(
              (Date.now() - Date.parse(neuerBeitrag.createdAt)) / 1000 / 60
            )} Min.`
          : `${Math.floor(
              (Date.now() - Date.parse(neuerBeitrag.createdAt)) / 1000
            )} Sek.`;
      setForumBeitraege([neuerBeitrag, ...forumBeitraege]);

      // Modal schließen & Felder zurücksetzen
      setOpen(false);
      setTitel("");
      setValue("");
      setSelectedTags([]);
      setCustomTag("");
      //setIsPrivate(false);
    } catch (error) {
      console.log(error);
    }
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

  // const handlePrivateChange = (e) => {
  //   setIsPrivate(e.target.checked);
  // };

  return (
    <>
      <div className="flex justify-between items-center ml-5 mt-5">
        <h1 className="font-black">Forum</h1>
        <div className="flex gap-8 items-center">
          <button className="flex cursor-pointer">
            <p>Filter</p>
            <CiFilter className="text-xl" />
          </button>

          <button
            onClick={() => setOpen(true)}
            className="text-xs rounded-lg bg-[#FF658A] text-white p-2 cursor-pointer"
          >
            Frage stellen
          </button>
        </div>
      </div>

      <ModalForum open={open} onClose={() => setOpen(false)}>
        <div className="bg-white h-[400px] rounded-lg ml-5 overflow-hidden">
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
            value={titel}
            onChange={(e) => setTitel(e.target.value)}
          />
          {/* <h3>Privat?</h3>
          <input
            type="checkbox"
            onClick={handlePrivateChange}
            className="checkbox"
          /> */}
          <h3>Schlagwörter</h3>

          {/* Anzeige der ausgewählten Tags */}
          <div className="flex flex-wrap gap-2 my-2">
            {selectedTags.map((tag, i) => (
              <div
                key={i}
                className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="text-red-500 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Vordefinierte Tags */}
          <div className="flex gap-3 my-2">
            {availableTags.map((tag, i) => (
              <button
                key={i}
                onClick={() => addTag(tag)}
                className="bg-slate-100 px-3 rounded-lg hover:bg-slate-300 text-sm"
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Custom-Tag Eingabe */}
          <div className="flex gap-5 mt-2">
            <input
              type="text"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              placeholder="Neues Schlagwort"
              className="bg-slate-100 px-3 py-1 text-sm w-3/4"
            />

            <button
              onClick={handleCustomTagAdd}
              className="bg-slate-500 cursor-pointer text-white px-3 rounded-lg text-sm w-1/4"
            >
              Hinzufügen
            </button>
          </div>

          <h3 className="mb-3">Inhalt</h3>

          <ReactQuill
            theme="snow"
            value={value}
            modules={modules}
            formats={formats}
            onChange={setValue}
            className="quill-blog"
          />
          <ReactQuill theme="snow" value={value} readOnly={true} />
        </div>

        <div className="ml-5">
          <button
            className="mt-3 text-xs rounded-lg bg-[#FF658A] text-white p-2 cursor-pointer w-full"
            onClick={handleCreateBeitrag}
          >
            Jetzt fragen
          </button>
        </div>
      </ModalForum>

      {/* Beiträge anzeigen */}

      {forumBeitraege.map((eintrag) => (
        <ForumKarte
          key={eintrag.id}
          title={eintrag.title}
          text={eintrag.content}
          tags={eintrag.tags}
          likes={eintrag.numberOfLikes}
          views={eintrag.viewCount}
          time={eintrag.time}
          answers={eintrag.numberOfAnswers}
          id={eintrag.id}
        />
      ))}

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
