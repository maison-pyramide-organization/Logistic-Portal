// import s from "./_s.module.scss";

import { signIn } from "@/services/firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const { user } = await signIn(email, password);
    if (user) navigate("/");
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email!</label>
        <input id="email" type="email" />
        <label htmlFor="password">Password!</label>
        <input id="password" type="password" />
        <button type="submit">login</button>
      </form>
    </>
  );
};
export default Login;
