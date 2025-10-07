import { Link } from "react-router-dom";
import s from "./_s.module.scss";
import logo from "@a/images/logo.png";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "@/contexts/authContext";

const Header = () => {
  const dropdown = useRef(null) as any;
  const { isLoggedIn, logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };
  const handleAcc = (e) => {
    const $dd = dropdown.current as any;
    e.stopPropagation();
    $dd.classList.add("open");
  };
  useEffect(() => {
    const handleClickOutside = () => {
      if (dropdown.current) {
        dropdown.current.classList.remove("open");
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className={s.h}>
      <Link to="/" className={s.logo}>
        <img src={logo} alt="Maison Pyramide Emblem" />
      </Link>
      <h1>Logistics Portal</h1>
      {isLoggedIn && (
        <>
          <div className={s.acc} onClick={handleAcc}>
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>
          <div className={s.h_dd} ref={dropdown}>
            <ul>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
