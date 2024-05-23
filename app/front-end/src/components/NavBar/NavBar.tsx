"use client";
import React, { useState, useEffect } from "react";
import "./NavBar.css";

interface TournamentProps {
  options: string[];
}

const NavBar: React.FC<TournamentProps> = ({ options }: TournamentProps) => {
  const [isSmall, setIsSmall] = useState(window.innerWidth <= 215 * options.length + 200);

    window.addEventListener("resize", () => {
      setIsSmall(window.innerWidth < 215 * options.length + 200);
    });

  return (
    <nav className="_nav_bar">
      {!isSmall ? (
        <>
          {options.map((option: any) => (
            <button key={option}>{option}</button>
          ))}
        </>
      ) : (
        <select name="tournament" id="tournament">
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