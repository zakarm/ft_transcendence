"use client";

import React, { useState, useEffect } from "react";
import "./Tournament.css";
import TournamentCard from "../../../components/TournamentCard/TournamentCard";
import NavBar from "@/components/NavBar/NavBar";
import { TournamentsData } from '@/app/api/testTournament/route'
import { RemoteTournamentForm } from "@/components/TournamentForm/remoteForm"
import { LocalTournamentForm } from "@/components/TournamentForm/localForm"
// import Local

async function fetchTournamentsData(
  currentTab : string,
  NavBarOptions : string[])
: Promise<TournamentsData | null> {

  const getData = async () => {
    const promise = await fetch("/api/testTournament", {
      method : "POST",
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({ "type" : currentTab, options : NavBarOptions })
    })

    if (promise.ok) {
      const data : TournamentsData = await promise.json();
      return (data);
    }
    return null;
  }

  return getData();
}

async function  getTournamentsTabData(
  currentTab : string,
  NavBarOptions : string[])
: Promise<React.JSX.Element[]> {

    const data = await fetchTournamentsData(currentTab, NavBarOptions);
    if (!data) return []

    const tournamentCards : React.JSX.Element[] = [];

    Object.entries(data.tournaments).forEach(([name, details]) => {
      tournamentCards.push(
        <TournamentCard
          key={name}
          name={name}
          date={details.date}
          participantsJoined={details.participantsJoined}
          imageUrl={details.imageUrl}
          pageUrl={details.pageUrl}
        />
      );
    });

    return tournamentCards;
}

const Tournament: React.FC = () => {
  
  const NavBarOptions : string[] = ["All", "Ongoing", "Completed", "My Tournament" , "Local"];
  const [choosenTab, setChoosenTab] = useState<string>("All");
  const [tournamentsToRender, setTournamentsToRender] = useState<React.JSX.Element[]>([]);

  useEffect(() => {

    const data = async () => {
      const promise = await getTournamentsTabData(choosenTab, NavBarOptions);
      setTournamentsToRender(promise);
    }

    data();
  }, [choosenTab])

  return (
    <div className="containerTournament">
      <div className="Tournament_title">TOURNAMENT</div>
      <div className="Tournament_search">
        <input className="ps-3" type="search" name="" id="" placeholder="Search Tournament" />
      </div>
      <div className="Tournament_nav_bar">
        <NavBar options={ NavBarOptions } setChoosenTab={ setChoosenTab } />
      </div>
      <section className="row Tournament_section p-0 m-0">
        { 
          choosenTab === 'My Tournament' ?
              <>
              <div className="col-12 col-xl-5 col-xxl-7 order-2 order-xl-1 d-flex flex-wrap justify-content-around">
                { tournamentsToRender }
              </div>
              <div className="col-12 col-xl-4 order-1 order-xl-2 d-flex justify-content-center">
                <RemoteTournamentForm />
              </div>
              </>
          
          : choosenTab === 'Local' ?
              <>
              <div className="col d-flex flex-wrap justify-content-center">
                <LocalTournamentForm />
              </div>
              </>
          :

              <div className="col d-flex flex-wrap justify-content-center">
                { tournamentsToRender }
              </div>            
        }
      </section>
    </div>
  );
};

export default Tournament;
