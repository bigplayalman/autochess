import React from "react";
import Chessboard from "../components/Chessboard";
import SynergyActiveList from "../components/Synergy.active.list";
import FocusedHero from "../components/FocusedHero";
import FocusedSynergy from "../components/FocusedSynergy";
import CurrentSynergyList from "../components/Synergy.current.list";

export const ChessboardView = () => {
  return (
    <div className="chessboard-view">
      <CurrentSynergyList type="active"/>
      <Chessboard />
      <CurrentSynergyList type="inactive"/>
      <SynergyActiveList />
      <FocusedHero />
      <FocusedSynergy />
    </div>
  );
}
export default ChessboardView;
