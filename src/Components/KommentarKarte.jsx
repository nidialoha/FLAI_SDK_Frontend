function KommentarKarte({ inhalt, profilbild }) {
  return (
    <div className="ml-9 flex items-start gap-2 mt-2">
      {profilbild && (
        <img
          src={profilbild}
          alt="Profilbild"
          className="w-8 h-8 rounded-full"
        />
      )}
      <li className="text-xs list-none">{inhalt}</li>
    </div>
  );
}

export default KommentarKarte;
