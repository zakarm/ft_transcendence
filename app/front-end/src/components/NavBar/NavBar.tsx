"use client";
import React, { useState, ChangeEvent } from "react";
import "./NavBar.css";

interface TournamentProps {
  options : string[];
  setChoosenTab ?: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar: React.FC<TournamentProps> = ({ options, setChoosenTab = () : void => {} }: TournamentProps) => {
  const [isSmall, setIsSmall] = useState(window.innerWidth <= 215 * options.length + 250);
  const [currentOption, setCurrentOption] = useState<string>("")

  window.addEventListener("resize", () => {
    setIsSmall(window.innerWidth < 215 * options.length + 250);
  });

  return (
    <nav className="_nav_bar">
      {!isSmall ? (
        <>
          {options.map((option: any) => (
            <button
              className="itim-font"
              key={option}
              type="button"
              onClick={() => {
                setChoosenTab(option);
                setCurrentOption(option);
              }}
              >
                {option}
              </button>
          ))}
        </>
      ) : (
        <select
          className="itim-font"
          id={"tournaments" + options[0]}
          value={currentOption}
          onChange={(e : ChangeEvent<HTMLSelectElement>) => {
            setChoosenTab(e.target.value);
            setCurrentOption(e.target.value);
          }}
        >
          {options.map((option: any) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </nav>
  );
};

export default NavBar;
