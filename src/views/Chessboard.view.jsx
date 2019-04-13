import React from "react";
import Chessboard from "../components/Chessboard";
import SynergyList from "../components/Synergy.list";
import FocusedHero from "../components/FocusedHero";
import FocusedSynergy from "../components/FocusedSynergy";
import CurrentSynergyList from "../components/Synergy.current.list";

export const ChessboardView = () => {
  return (
    <div className="chessboard-view">
      <CurrentSynergyList type="active"/>
      <Chessboard />
      <CurrentSynergyList type="inactive"/>
      <SynergyList />
      <FocusedHero />
      <FocusedSynergy />
    </div>
  );
}
export default ChessboardView;
