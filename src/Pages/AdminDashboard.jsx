import { useAuth } from "../Context/AuthProvider";
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router";

function AdminDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <>
        <h1 className="mt-5 font-black ml-5">Hallo Admin, {user.name}!</h1>
        <div className="flex text-white">
          <div className="bg-linear-to-r from-red-500 to-red-900 p-6 ml-4 mt-4 flex flex-col text-center w-1/2 rounded-lg items-center">
            <h2 className="text-3xl">42.792</h2>
            <p className="font-bold">Verstoß</p>
            <div className="flex gap-3">
              <p>Jetzt ansehen</p>
              <FaArrowRight className="text-white self-center" />
            </div>
          </div>

          <div className="bg-linear-to-r from-gray-400 to-gray-500 p-6 ml-4 mt-4 flex flex-col text-center w-1/2 rounded-lg items-center">
            <h2 className="text-3xl">234.567</h2>
            <p className="font-bold">Graue Zone</p>
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

export default AdminDashboard;
