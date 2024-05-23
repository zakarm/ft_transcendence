"use client";
import React, { useState } from "react";
import "./Tournament.css";
import TournamentCard from "../../../components/TournamentCard/TournamentCard";
import NavBar from "@/components/NavBar/NavBar";

const Tournament: React.FC = () => {
  const options = ["All", "Ongoing", "Completed", "My Tournament" , "Local"];
  const renderTournamentCards = () => {
    const tournamentCards = [];
    for (let i = 0; i < 21; i++) {
      tournamentCards.push(
        <TournamentCard
          key={i}
          name={"Tournament Name"}
          date={"Feb , Apr 12 2021, 12:00 AM"}
          participantsJoined={2}
          imageUrl={"/Ping_Pong_Battle_4.png"}
          pageUrl="/tournament/tournamentId"
        />
      );
    }
    return tournamentCards;
  };
  return (
    <div className="containerTournament">
      <div className="Tournament_title">TOURNAMENT</div>
      <div className="Tournament_search">
        <input type="search" name="" id="" placeholder="Search Tournament" />
      </div>
      <div className="Tournament_nav_bar">
        <NavBar options={options} />
      </div>
      <section className="Tournament_section">
        {renderTournamentCards()}
      </section>
    </div>
  );
};

export default Tournament;
