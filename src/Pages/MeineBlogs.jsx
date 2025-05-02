import { CiFilter } from "react-icons/ci";

function MeineBlogs() {
  return (
    <>
      <h1 className="font-black ml-5 mt-5">Meine Blogs</h1>
      <div>
        <div className="bg-white shadow-lg rounded-lg w-full pl-5 pt-4 mt-4 ml-5 ">
          <div className="flex justify-between items-center w-full">
            <select defaultValue="Pick a color" className="select">
              <option disabled={true}>Alles</option>
              <option>Alles</option>
              <option>Letzte Woche</option>
              <option>Letzte Monat</option>
            </select>

            <button className="flex mr-5">
              <p>Filter</p>
              <CiFilter className="text-xl" />
            </button>
          </div>
          <label className="input mt-2 w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search" />
          </label>

          <div className="grid grid-cols-8 gap-6 border-b-1">
            <h6 className="ml-5 mt-3 py-4 text-sm font-semibold">Datum</h6>
            <h6 className="col-span-2 mt-3 py-4 text-sm font-semibold">
              Titel
            </h6>
            <h6 className="col-span-3 mt-3 py-4 text-sm font-semibold">
              Kurze Beschreibung
            </h6>
            <h6 className=" mt-3 py-4 text-sm font-semibold">Reaktionen</h6>
            <h6 className="mt-3 py-4 text-sm font-semibold">Aktion</h6>
          </div>

          <div className="grid grid-cols-8 gap-6 border-b-1">
            <p className="ml-5 mt-3 pb-4">02.05.2025</p>
            <p className="col-span-2 mt-3">Titel</p>
            <p className="col-span-3 mt-3">Lorem ipsum bla bla bla</p>
            <p className="mt-3">1.345</p>
            <button className="text-black place-items-start">...</button>
          </div>

          <div className="grid grid-cols-8 gap-6 border-b-1">
            <p className="ml-5 mt-3 pb-4">23.02.2025</p>
            <p className="col-span-2 mt-3">Titel</p>
            <p className="col-span-3 mt-3">Lorem ipsum bla bla bla</p>
            <p className="mt-3">1.345</p>
            <button className="text-black place-items-start">...</button>
          </div>

          <div className="grid grid-cols-8 gap-6 border-b-1">
            <p className="ml-5 mt-3 pb-4">03.01.2025</p>
            <p className="col-span-2 mt-3">Titel</p>
            <p className="col-span-3 mt-3">Lorem ipsum bla bla bla</p>
            <p className="mt-3">1.345</p>
            <button className="text-black place-items-start">...</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MeineBlogs;
