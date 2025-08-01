import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
