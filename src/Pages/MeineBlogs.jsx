import { CiFilter } from "react-icons/ci";

function MeineBlogs() {
  return (
    <>
      <h1 className="ml-5 mt-5">Meine Blogs</h1>
      <div className="">
        <div className="bg-white shadow-lg rounded-lg pl-5 pt-4 mt-4 ml-5 ">
          <div className="flex justify-between items-center">
            <select defaultValue="Pick a color" className="select static">
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
          <label className="input mt-2 w-200 static">
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

          <div className="grid grid-cols-8 gap-6 border-b-1 w-200">
            <h4 className="ml-5 mt-3 py-4 text-sm">Datum</h4>
            <h4 className="col-span-2 mt-3 py-4 text-sm">Titel</h4>
            <h4 className="col-span-3 mt-3 py-4 text-sm">Kurze Beschreibung</h4>
            <h4 className=" mt-3 py-4 text-sm">Reaktionen</h4>
            <h4 className="mt-3 py-4 text-sm">Aktion</h4>
          </div>

          <div className="grid grid-cols-8 gap-6 border-b-1 w-200">
            <p className="ml-5 mt-3 pb-4">02.05.2025</p>
            <p className="col-span-2 mt-3">Titel</p>
            <p className="col-span-3 mt-3">Lorem ipsum bla bla bla</p>
            <p className="mt-3">1.345</p>
            <button className="text-black place-items-start">...</button>
          </div>

          <div className="grid grid-cols-8 gap-6 border-b-1 w-200">
            <p className="ml-5 mt-3 pb-4">23.02.2025</p>
            <p className="col-span-2 mt-3">Titel</p>
            <p className="col-span-3 mt-3">Lorem ipsum bla bla bla</p>
            <p className="mt-3">1.345</p>
            <button className="text-black place-items-start">...</button>
          </div>

          <div className="grid grid-cols-8 gap-6 w-200">
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
