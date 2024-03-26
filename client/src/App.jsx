import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {

  const { theme } = useSelector((state) => state.user);
  useEffect(() => {
    const root = window.document.documentElement;
    const oldTheme = theme === "dark" ? "light" : "dark";
    root.classList.remove(oldTheme);
    root.classList.add(theme);
  }, [theme]);

  return (
    <main className="bg-primary text-tertiary">
      <Header />
      <Outlet />
    </main>
  );
}

export default App;
