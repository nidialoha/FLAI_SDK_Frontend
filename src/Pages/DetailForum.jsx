import { CiFilter } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { TfiControlRecord } from "react-icons/tfi";
import { useState } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function DetailForum() {
  const [value, setValue] = useState("");
  const [valueKommentar, setValueKommentar] = useState("");
  let navigate = useNavigate();

  const [kommentare, setKommentare] = useState([]);
  const [alleKommentareAnzeigen, setAlleKommentareAnzeigen] = useState(false);
  const [antworten, setAntworten] = useState([]);
  const [alleAntwortenAnzeigen, setAlleAntwortenAnzeigen] = useState(false);
  const [aktivesKommentarFeld, setAktivesKommentarFeld] = useState(null);
  const [kommentarWerte, setKommentarWerte] = useState({});

  const handleAntwortAbschicken = () => {
    if (!value.trim()) return;

    setAntworten((prev) => [
      ...prev,
      {
        inhalt: value,
        nutzername: "Max Mustermann", // später dynamisch
        profilbild: "https://via.placeholder.com/56", // Platzhalter
        badges: 12,
      },
    ]);
    setValue(""); // Quill leeren
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

  const modulesKommentar = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ lsit: "ordered" }, { list: "bullet" }],
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
      {/* <div className="flex justify-end">
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
      </div> */}
      <button
        className="flex gap-3 ml-5 mt-3 cursor-pointer hover:font-black"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        <p>Zurück</p>
      </button>
      <div className="bg-white pb-2 rounded-lg ml-5 mt-5">
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

          {/* Editor zum kommentieren der Frage */}
          <div className="bg-slate-100 h-[120px] rounded-lg overflow-hidden">
            <ReactQuill
              theme="snow"
              value={valueKommentar}
              modules={modulesKommentar}
              formats={formats}
              onChange={setValueKommentar}
              className="quill-kommentar"
            />
          </div>
          <div>
            <button
              className="mt-3 mb-2 text-xs rounded-lg bg-slate-500 text-white p-2 cursor-pointer w-full"
              onClick={() => {
                if (!valueKommentar.trim()) return; // Leere Kommentare blockieren
                setKommentare((prev) => [
                  ...prev,
                  {
                    inhalt: valueKommentar,
                    profilbild: "https://via.placeholder.com/40", // Platzhalter oder echte URL
                  },
                ]);
                setValueKommentar(""); // Editor leeren nach Absenden
              }}
            >
              Kommentare schicken
            </button>
          </div>

          {/* Antwort von einige Nutzer */}
          {/* <div className="flex mt-3 gap-4 items-center">
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
          </div> */}
          {/* Kommentare anzeigen */}
          {(alleKommentareAnzeigen ? kommentare : kommentare.slice(0, 5)).map(
            (kommentar, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <img
                  src={kommentar.profilbild}
                  alt="Profilbild"
                  className="h-4 w-4 rounded-full object-cover"
                />

                <div
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: kommentar.inhalt }}
                />
              </div>
            )
          )}
          {!alleKommentareAnzeigen && kommentare.length > 5 && (
            <button
              className="underline text-xs mt-3 mb-5 cursor-pointer"
              onClick={() => setAlleKommentareAnzeigen(true)}
            >
              Mehr Kommentar ansehen
            </button>
          )}
        </div>
      </div>
      <h2 className="font-bold ml-5 mb-2 mt-2">Antwort geben</h2>
      {/* Editor Bereich */}
      <div className="bg-white h-[250px] rounded-lg ml-5 overflow-hidden">
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
          onClick={handleAntwortAbschicken}
          className="mt-3 text-xs rounded-lg bg-[#FF658A] text-white p-2 cursor-pointer w-full"
        >
          Antwort schicken
        </button>
      </div>
      {/* Antwort Section */}

      <div>
        <h2 className="font-bold ml-5 mb-2 mt-2">Antwort von Nutzer</h2>
        <div className="border-b-1 ml-5"></div>

        {(alleAntwortenAnzeigen ? antworten : antworten.slice(0, 5)).map(
          (antwort, index) => (
            <div key={index} className="mt-5">
              <div className="flex justify-between">
                <div className="flex gap-6">
                  <img
                    src={antwort.profilbild}
                    alt="Profil"
                    className="rounded-full ml-5 w-14 h-14 object-cover"
                  />
                  <div>
                    <h6 className="text-sm">{antwort.nutzername}</h6>
                    <div className="flex gap-2 items-center">
                      <TfiControlRecord className="text-yellow-500" />
                      <p>{antwort.badges}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex gap-3 items-center">
                    <AiOutlineLike />
                    <p>4</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <AiOutlineDislike />
                    <p>1</p>
                  </div>
                </div>
              </div>

              <div className="border-b-1 ml-5"></div>
              <div>
                <p
                  className="ml-5 pt-2"
                  dangerouslySetInnerHTML={{ __html: antwort.inhalt }}
                />
                {/* Kommentieren-Button */}
                <button
                  className="underline text-xs italic ml-5 mt-2 cursor-pointer"
                  onClick={() =>
                    setAktivesKommentarFeld(
                      aktivesKommentarFeld === index ? null : index
                    )
                  }
                >
                  Kommentieren
                </button>

                {/* Wenn der Button geklickt wurde, erscheint das Kommentarfeld */}
                {aktivesKommentarFeld === index && (
                  <div className="ml-5 mt-2 mb-4 bg-slate-100 p-2 rounded-lg">
                    <ReactQuill
                      theme="snow"
                      value={kommentarWerte[index] || ""}
                      onChange={(content) =>
                        setKommentarWerte((prev) => ({
                          ...prev,
                          [index]: content,
                        }))
                      }
                      modules={modulesKommentar}
                      formats={formats}
                      className="quill-kommentar-antwort"
                    />
                    <button
                      onClick={() => {
                        console.log(
                          "Kommentar speichern:",
                          kommentarWerte[index]
                        );
                        setKommentarWerte((prev) => ({ ...prev, [index]: "" }));
                        setAktivesKommentarFeld(null);
                      }}
                      className="mt-2 text-xs rounded-lg bg-slate-500 text-white p-2 cursor-pointer"
                    >
                      Kommentar senden
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        )}

        {/* Button nur wenn mehr als 5 Antworten */}
        {!alleAntwortenAnzeigen && antworten.length > 5 && (
          <button
            onClick={() => setAlleAntwortenAnzeigen(true)}
            className="underline text-xs mt-3 mb-5 cursor-pointer ml-5"
          >
            Mehr Antworten anzeigen
          </button>
        )}
      </div>
    </>
  );
}

export default DetailForum;
