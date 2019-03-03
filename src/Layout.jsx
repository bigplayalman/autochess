import React from "react";
import "./structure.scss";
import Header from "./components/Header";
import Chessboard from "./components/Chessboard";
import HeroList from "./components/Hero.list";

export const Layout = () => {
  return (
    <div className="container">
      <Header />
      <main>
        <Chessboard />
        <HeroList />
      </main>
      <footer>
        Dota 2 content and materials are trademarks and copyrights of Valve or its licensors.  This site is not affiliated with Valve.
      </footer>
    </div>
  );
}
export default Layout;
