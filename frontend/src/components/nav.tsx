//nav
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/nav.css";

declare const lucide: any;

interface User {
  name: string;
  email: string;
}

export default function Nav() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false); // burger menu state
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.name) setUser(parsed);
      } catch (err) {
        console.error("Invalid user in localStorage");
      }
    }
  }, []);

  useEffect(() => {
    lucide.createIcons();
  }, [user, open]);

  const logout = () => {
    localStorage.setItem("user", JSON.stringify({ name: "", email: "" }));
    setUser(null);
    navigate("/");
  };

  const formatName = (name: string) =>
    name.trim()[0].toUpperCase() + name.slice(1).toLowerCase();

  return (
    <div className="nav21-wrapper">
      {/* LEFT: LOGO */}
      <div className="nav21-logo">
        <div className="circle">
          <span className="check">✔</span>
        </div>
        <h2>TODO</h2>
      </div>

      {/* BURGER ICON — MOBILE */}
      <div
        className={`burger ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* RIGHT: BUTTONS */}
      <div className={`nav21-right ${open ? "show" : ""}`}>
        <h3 className="nav21-welcome">
          {user?.name ? `Welcome, ${formatName(user.name)}` : "Organize Smarter"}
        </h3>

        {!user?.name ? (
          <div className="nav21-buttons">
            <button className="nav21-btn" onClick={() => navigate("/")}>
              <i data-lucide="log-in"></i> Login
            </button>
            <button className="nav21-btn" onClick={() => navigate("/signup")}>
              <i data-lucide="user-plus"></i> Sign up
            </button>
          </div>
        ) : (
          <button className="nav21-btn logout" onClick={logout}>
            <i data-lucide="log-out"></i> Logout
          </button>
        )}
      </div>
    </div>
  );
}
