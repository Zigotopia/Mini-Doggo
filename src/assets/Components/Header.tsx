import React from "react";
import { dogFetch, useAsyncUserData } from "./stores";

const Header = () => {
  const { loading, logged, setLogout } = useAsyncUserData();
  const { dataClean } = dogFetch();
  function logout() {
    setLogout(false);
    dataClean();
  }
  return (
    <header className="doggoHead">
      <nav>
        <h1 className="tittle">Mini Doggo</h1>
        <span
          onMouseUp={logout}
          className={`logout ${loading ? "loading" : ""} ${
            logged ? "logged" : ""
          }`}
        />
      </nav>
    </header>
  );
};

export default Header;
