import { Link } from "react-router-dom";
import s from "./_s.module.scss";
import logo from "@a/images/logo.png";

const Header = () => {
  return (
    <header className={s.h}>
      <Link to="/" className={s.logo}>
        <img src={logo} alt="Maison Pyramide Emblem" />
      </Link>
      <h1>Logistics Portal</h1>
      <div className={s.acc}>N</div>
    </header>
  );
};

export default Header;
