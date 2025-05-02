import { useAuth0 } from "@auth0/auth0-react";
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router";

function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <>
        <h1 className="mt-5 font-black ml-5">Hallo, {user.given_name}!</h1>
        <div className="flex text-white">
          <NavLink
            to="/meineblogs"
            className="bg-linear-to-r from-purple-500 to-indigo-500 p-6 ml-4 mt-4 flex flex-col text-center w-1/3 rounded-lg items-center"
          >
            <h2 className="text-3xl font-bold">21</h2>
            <p>Blogs</p>
            <div className="flex gap-3">
              <p>Jetzt ansehen</p>
              <FaArrowRight className="text-white self-center" />
            </div>
          </NavLink>

          <div className="bg-linear-to-r from-purple-500 to-indigo-500 p-6 ml-4 mt-4 flex flex-col text-center w-1/3 rounded-lg items-center">
            <h2 className="text-3xl font-bold">23</h2>
            <p>Gefolgte Nutzer</p>
            <div className="flex gap-3">
              <p>Jetzt ansehen</p>
              <FaArrowRight className="text-white self-center" />
            </div>
          </div>
          <div className="bg-linear-to-r from-purple-500 to-indigo-500 p-6 ml-4 mt-4 flex flex-col text-center w-1/3 rounded-lg items-center">
            <h2 className="text-3xl font-bold">345</h2>
            <p>Gespeicherte Beiträge</p>
            <div className="flex gap-3">
              <p>Jetzt ansehen</p>
              <FaArrowRight className="text-white self-center" />
            </div>
          </div>
        </div>

        <h1 className="mt-4 font-black ml-5">Aktuelle Aktivitäten!</h1>
        <div className="bg-white shadow-lg rounded-lg ml-5 mt-4">
          <h3 className="border-b-1 mr-5 ml-5 pt-4 text-sm">Heute</h3>
          <div>
            <p className="ml-5 mt-3 pb-4">
              vor 2 Std. hast du "TITEL von BLOG" kommentiert
            </p>
          </div>
        </div>
      </>
    )
  );
}

export default Dashboard;
