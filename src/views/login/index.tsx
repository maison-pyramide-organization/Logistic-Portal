import s from "./_s.module.scss";
import { AuthContext } from "@/contexts/authContext";
import logo from "@a/images/mpx.png";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useContext(AuthContext);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    await login(email, password);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className={s.p}>
      <main className={s.m}>
        <div className={s.l}>
          <img className={s.logo} src={logo} alt="Maison Pyramide Emblem" />
        </div>
        <div className={s.r}>
          <h1 className={s.title}>LOGISTICS PORTAL</h1>
          <form onSubmit={onSubmit} className={s.f}>
            <input id="email" type="email" placeholder="Email" />
            <input id="password" type="password" placeholder="Password" />
            <button type="submit">Sign in</button>
          </form>
          <p className={s.reset}>
            Forgot your password? <span>Reset</span>
          </p>
        </div>
      </main>
    </div>
  );
};
export default Login;
