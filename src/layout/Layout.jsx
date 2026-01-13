import { Outlet } from "react-router-dom";
import { useOnline } from "../hooks/useOnline.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../components/Navbar/Navbar.jsx";

function Layout() {
  const isOnline = useOnline();
  return (
    <>
      <Navbar />
      <Outlet />
      {!isOnline && (
        <div className="offline">
          <FontAwesomeIcon icon="fa-solid fa-wifi" />
          <p className="h6 mb-0">Offline</p>
        </div>
      )}
    </>
  );
}

export default Layout;
