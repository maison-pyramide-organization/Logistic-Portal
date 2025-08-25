import { AuthContext } from "@/contexts/authContext";
import s from "./_s.module.scss";

import { signIn } from "@/services/firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  if (isLoggedIn) navigate("/");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const { user } = await signIn(email, password);
    if (user) navigate("/");
  };

  return (
    <div className={s.p}>
      <main className={s.m}>
        <div className={s.logo}></div>
        <h1 className={s.title}>Logistics Portal</h1>
        <form onSubmit={onSubmit} className={s.f}>
          <input id="email" type="email" placeholder="Email" />
          <input id="password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        <p className={s.reset}>
          Forgot your password? <span>Reset</span>
        </p>
      </main>
    </div>
  );
};
export default Login;
