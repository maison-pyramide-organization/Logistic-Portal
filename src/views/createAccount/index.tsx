import s from "./_s.module.scss";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const type = form.type.value;
    const email = form.email.value;
    const password = form.password.value;
    const userData = { name, type, email, password };
    await signup(userData);
    navigate("/login");
  };

  return (
    <div className={s.p}>
      <main className={s.m}>
        <h1>Create Account</h1>
        <form onSubmit={onSubmit} className={s.f}>
          <select id="type">
            <option value="retailer">Retailer</option>
            <option value="brand">Brand</option>
          </select>
          <input id="name" placeholder="Name" />
          <input id="email" type="email" placeholder="Email" />
          <input id="password" type="password" placeholder="Password" />
          <button type="submit">Create</button>
        </form>
      </main>
    </div>
  );
};

export default CreateAccount;
