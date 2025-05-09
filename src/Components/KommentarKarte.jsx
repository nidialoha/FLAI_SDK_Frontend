import ReactMarkdown from "react-markdown";
function KommentarKarte({ inhalt, profilbild }) {
  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };
  return (
    <div className="ml-9 flex items-center gap-2 mt-2">
      {profilbild && (
        <img
          src={profilbild}
          alt="Profilbild"
          className="w-8 h-8 rounded-full"
        />
      )}
      <li className="text-xs list-none">{stripHtml(inhalt)}</li>
      {/* <ReactMarkdown>{inhalt}</ReactMarkdown> */}
    </div>
  );
}

export default KommentarKarte;
