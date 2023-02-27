import React from "react";
import { Outlet } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <div>
      <header></header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default App;
