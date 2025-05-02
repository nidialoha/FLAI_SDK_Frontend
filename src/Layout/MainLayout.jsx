import NavBar from "../Components/NavBar";
import NavBarRechts from "../Components/NavBarRechts";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="bg-[#F0F0F0] flex flex-col">
      <NavBar />

      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-3 ...">
          <Outlet />
        </div>

        <div className="... mt-4">
          <NavBarRechts />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
