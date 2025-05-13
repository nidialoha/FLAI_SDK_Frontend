import { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import DetailForumKarte from "../Components/DetailForumKarte";
import KommentarKarte from "../Components/KommentarKarte";
import AntwortKarte from "../Components/AntwortKarte";
import { useAuth } from "../Context/AuthProvider";


function DetailForum() {
  const {id} = useParams();
  const { user } = useAuth();
  const [generalObject, setGeneralObject] = useState({mainPost:{tags:[]}});
  const [valueAntwort, setValueAntwort] = useState("");
  const [valueKommentar, setValueKommentar] = useState("");
  const [kommentare, setKommentare] = useState([]);
  const [antworten, setAntworten] = useState([]);
  const [alleKommentareAnzeigen, setAlleKommentareAnzeigen] = useState(false);
  const [aktivesKommentarFeld, setAktivesKommentarFeld] = useState(null);
  const [kommentarWerte, setKommentarWerte] = useState({});

  const navigate = useNavigate();

useEffect(() => {
  const fetchGeneralObject = async ()=>{
try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/forum/${id}`, {
        method: "GET",        
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if(!response.ok) throw new Error();
      const res = await response.json();
      console.log(res);
      setGeneralObject({...res});
    } catch (error) {
      console.log(error);
    }
  }
    
    fetchGeneralObject();
  }, []);
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
          <DetailForumKarte key={generalObject.mainPost.id} 
          title={generalObject.mainPost.title} 
          nutzerName={generalObject.mainPost.userName} 
          text={generalObject.mainPost.content} 
          tags={generalObject.mainPost.tags} 
          views={generalObject.mainPost.viewCount}
          badges={0}
          time={(Math.floor((Date.now()-Date.parse(generalObject.mainPost.createdAt))/1000)>60 ? 
        (Math.floor((Date.now()-Date.parse(generalObject.mainPost.createdAt))/1000/60)>60? (Math.floor((Date.now()-Date.parse(generalObject.mainPost.createdAt))/1000/60/60)>24?`${Math.floor((Date.now()-Date.parse(generalObject.mainPost.createdAt))/1000/60/60/24)} Tage`:`${Math.floor((Date.now()-Date.parse(generalObject.mainPost.createdAt))/1000/60/60)} Std.`):`${Math.floor((Date.now()-Date.parse(generalObject.mainPost.createdAt))/1000/60)} Min.`)
        : `${Math.floor((Date.now()-Date.parse(generalObject.mainPost.createdAt))/1000)} Sek.`)}
        likes={generalObject.mainPost.numberOfLikes}
        dislikes={generalObject.mainPost.numberOfDislikes} />
        }

        {/* Kommentar zur Frage */}
        <div className="w-full px-5">
          <input
            type="text"
            
            
            
            onChange={(e)=>{setValueKommentar(e.target.value)}}
            className="bg-slate-100 rounded-lg overflow-hidden w-full mb-2"
          />
        </div>
        <button
          className="mb-2 text-xs rounded-lg bg-slate-500 text-white p-2 cursor-pointer ml-5"
          onClick={() => {
            if (!valueKommentar.trim()) return;
            setKommentare((prev) => [
              ...prev,
              {
                inhalt: `${
                  user?.name || "Anonym"
                } kommentiert: ${valueKommentar}`,
                profilbild: user?.picture || "https://via.placeholder.com/40",
              },
            ]);
            setValueKommentar("");
          }}
        >
          Kommentar senden
        </button>
      </div>

      {/* Kommentare zur Frage */}
      {(alleKommentareAnzeigen ? kommentare : kommentare.slice(0, 5)).map(
        (kommentar, index) => (
          <KommentarKarte key={index} {...kommentar} />
        )
      )}
      {!alleKommentareAnzeigen && kommentare.length > 5 && (
        <button
          className="underline text-xs mt-3 mb-5 cursor-pointer ml-5"
          onClick={() => setAlleKommentareAnzeigen(true)}
        >
          Mehr Kommentare anzeigen
        </button>
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
          onClick={handleAntwortAbschicken}
          className="mt-3 text-xs rounded-lg bg-[#FF658A] text-white p-2 cursor-pointer w-full"
        >
          Antwort senden
        </button>
      </div>

      <h2 className="font-bold ml-5 mt-5">Antworten</h2>
      {antworten.map((eintrag) => (
        <div key={eintrag.id}>
          <AntwortKarte
            nutzerNameKommentar={eintrag.nutzername}
            nutzerBadges={eintrag.badges}
            kommentarPost={eintrag.inhalt}
            kommentarAntwort={eintrag.kommentarAntwort}
            likeAntwort={eintrag.likeAntwort}
            dislikeAntwort={eintrag.dislikeAntwort}
            userReaction={eintrag.userReaction}
            onReact={(type) => toggleReaction(eintrag.id, type)}
          />

          {/* Kommentar-Editor für Antwort */}
          <button
            className="underline text-xs italic ml-5 mt-2 cursor-pointer hover:font-bold"
            onClick={() =>
              setAktivesKommentarFeld(
                aktivesKommentarFeld === eintrag.id ? null : eintrag.id
              )
            }
          >
            Kommentieren
          </button>

          {aktivesKommentarFeld === eintrag.id && (
            <div className="ml-5 mt-2 mb-4 bg-slate-100 p-2 rounded-lg">
              <ReactQuill
                className="quill-kommentar-antwort"
                theme="snow"
                value={kommentarWerte[eintrag.id] || ""}
                onChange={(content) =>
                  setKommentarWerte((prev) => ({
                    ...prev,
                    [eintrag.id]: content,
                  }))
                }
                modules={modulesKommentar}
                formats={formats}
              />
              <button
                onClick={() => {
                  const neuerKommentar = `${
                    user?.name || "Anonym"
                  } kommentiert: ${kommentarWerte[eintrag.id]}`;
                  if (!kommentarWerte[eintrag.id]) return;

                  setAntworten((prevAntwort) =>
                    prevAntwort.map((antwort) =>
                      antwort.id === eintrag.id
                        ? {
                            ...antwort,
                            kommentarAntwort: [
                              ...antwort.kommentarAntwort,
                              neuerKommentar,
                            ],
                          }
                        : antwort
                    )
                  );

                  setKommentarWerte((prev) => ({
                    ...prev,
                    [eintrag.id]: "",
                  }));
                  setAktivesKommentarFeld(null);
                }}
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
