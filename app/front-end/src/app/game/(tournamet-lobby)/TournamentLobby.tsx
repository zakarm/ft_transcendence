'use client';

import TournamentLarge from '@/components/TournamentLobby/TournamentLobbyLarge/TournamentLarge';
import TournamentSmall from '@/components/TournamentLobby/TournamentLobbySmall/TournamentSmall';
import { TournamentData } from '@/lib/game/Tournament';
import React, { useState } from 'react';

const TournamentLobby: React.FC<TournamentData> = (data: TournamentData) => {
  const [isSmall, setIsSmall] = useState(window.innerWidth < 1000);
  window.addEventListener('resize', () => {
    setIsSmall(window.innerWidth < 1000);
  });
  return (
    <div className="container-fluid vh-100 p-0 m-0" style={{ overflow: 'auto', width: '98%' }}>
      {isSmall ? <TournamentSmall {...data} /> : <TournamentLarge {...data} />}
    </div>
  );
};

export default TournamentLobby;
