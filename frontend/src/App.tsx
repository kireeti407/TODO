import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

import Login from "./components/login";
import Nav from "./components/nav";
import Signup from "./components/signup";
import Todo from "./components/todo";

export default function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  // Re-run when login or logout happens
  useEffect(() => {
    const interval = setInterval(() => {
      const newUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (newUser?.email !== user?.email) {
        setUser(newUser);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={!user?.name ? <Login /> : <Todo />}
        />
        <Route
          path="/signup"
          element={!user?.name ? <Signup /> : <Todo />}
        />
      </Routes>
    </BrowserRouter>
  );
}
