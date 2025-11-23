//login

import { useState, useEffect } from "react";
import "../style/login.css";
import { useNavigate } from "react-router-dom";

declare const lucide: any;




interface User {
  email: string;
  password: string;
}

export default function Login() {
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    lucide.createIcons();
  });
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const login = async () => {
    const { email, password } = user;

    if (!email || !password) {
      alert("Something is missing");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}TODO/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      setMsg(data.msg);

      if (data.response) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: data.response.name,
            email: data.response.email,
          })
        );

        window.location.reload();
      }
    } catch (error) {
      setMsg("Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="todo-logo">
        <div className="circle">
          <span className="check">✔</span>
        </div>
        <h2>TODO</h2>
      </div>
      <div className="login-card">
        <h1 className="login-title">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="login-input"
          value={user.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="login-input"
          value={user.password}
          onChange={handleChange}
        />

        <button className="login-btn" onClick={login}>
          <i data-lucide="log-in"></i> Login
        </button>

        <p className="login-msg">{msg}</p>

        <p className="login-footer">
          Don’t have an account? <span onClick={()=>{
            navigate('/signup')
          }}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
