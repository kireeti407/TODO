// signup
import { useState, useEffect} from "react";
import "../style/signup.css";
import { useNavigate } from "react-router-dom";

declare const lucide: any;

interface User {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const [user, setUser] = useState<User>({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    lucide.createIcons();
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const signup = async () => {
    const { name, email, password } = user;
    if (!name || !email || !password) return alert("Fill all fields");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}TODO/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      setMsg(data.msg);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.response.name,
          email: data.response.email,
        })
      );

      window.location.reload();
    } catch (err) {
      setMsg("Signup failed");
    }
  };

  return (
    <div className="dev21-wrapper">

      {/* TODO Logo */}
      <div className="todo-logo">
        <div className="circle">
          <span className="check">✔</span>
        </div>
        <h2>TODO</h2>
      </div>

      <div className="dev21-card">

        <h1 className="dev21-title">Sign-up</h1>

        <input
          type="text"
          name="name"
          placeholder="Full name"
          className="dev21-input"
          value={user.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email address"
          className="dev21-input"
          value={user.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="dev21-input"
          value={user.password}
          onChange={handleChange}
        />

        <button className="dev21-btn small" onClick={signup}>
          <i data-lucide="user-plus"></i> Sign up
        </button>

        <p className="dev21-msg">{msg}</p>

        <p className="dev21-footer">
          Already have an account? <span onClick={()=>{
           navigate("/");
          }}>Login</span>
        </p>
      </div>
    </div>
  );
}
