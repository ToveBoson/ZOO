import React from "react";
import { Outlet } from "react-router-dom";
import "./App.scss";
import { Nav } from "./components/Nav/Nav";

function App() {
  window.addEventListener("load", () => {
    localStorage.getItem("getAnimal");
  });
  return (
    <div className="container">
      <header>
        <Nav />
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default App;
