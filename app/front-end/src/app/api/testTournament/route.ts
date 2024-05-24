
type TournamentDetails = {
  date: string;
  participantsJoined: number;
  imageUrl: string;
  pageUrl: string;
};

type TournamentsData = {
  [key: string]: {
    [key: string]: TournamentDetails;
  };
};

async function POST(req : Request) {
  const   data = await req.json();
  
  return new Response(JSON.stringify({tournaments : tournamentTestData[data.type]}), {
        status : 200
    })
}

export { POST }
export type { TournamentsData as TournamentsData, TournamentDetails as TournamentDetails };

/*
  data.type = options = ["All", "Ongoing", "Completed", "My Tournament" , "Local"]
  --------------------------------------------------------------------------------
  data.type : {
    Tournament Name : {
      "date": "Mar 1, 2023, 10:00 AM",
      "participantsJoined": 10,
      "imageUrl": "/Ping_Pong_Battle_4.png",
      "pageUrl": "/tournament/alpha",
    }
    ...
  },
  data.type : {
    Tournament Name : {
      "date": "Mar 1, 2023, 10:00 AM",
      "participantsJoined": 10,
      "imageUrl": "/Ping_Pong_Battle_4.png",
      "pageUrl": "/tournament/alpha",
    }
    ...
  },
*/

const tournamentTestData : TournamentsData = {
    "All": {
      "Alpha Championship": {
        "date": "Mar 1, 2023, 10:00 AM",
        "participantsJoined": 10,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/alpha",
      },
      "Beta Cup": {
        "date": "Mar 5, 2023, 3:00 PM",
        "participantsJoined": 8,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/beta",
      },
      "Gamma Tournament": {
        "date": "Mar 10, 2023, 12:00 PM",
        "participantsJoined": 15,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/gamma",
      },
      "Alpha Championshi": {
        "date": "Mar 1, 2023, 10:00 AM",
        "participantsJoined": 10,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/alpha",
      },
      "Beta Cu": {
        "date": "Mar 5, 2023, 3:00 PM",
        "participantsJoined": 8,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/beta",
      },
      "Gamma Tournamen": {
        "date": "Mar 10, 2023, 12:00 PM",
        "participantsJoined": 15,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/gamma",
      },
      "Delta Open": {
        "date": "May 12, 2024, 1:00 PM",
        "participantsJoined": 20,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/delta",
      },
      "Epsilon Clash": {
        "date": "May 15, 2024, 2:00 PM",
        "participantsJoined": 18,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/epsilon",
      },
      "Zeta Championship": {
        "date": "May 20, 2024, 11:00 AM",
        "participantsJoined": 25,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/zeta",
      },
      "Omicron Local": {
        "date": "Jul 1, 2024, 10:00 AM",
        "participantsJoined": 10,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/omicron",
      },
      "Pi Town Cup": {
        "date": "Jul 5, 2024, 3:00 PM",
        "participantsJoined": 8,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/pi",
      },
      "Rho Regionals": {
        "date": "Jul 10, 2024, 12:00 PM",
        "participantsJoined": 12,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/rho",
      },
      "Lambda Invitational": {
        "date": "Jun 1, 2024, 10:00 AM",
        "participantsJoined": 5,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/lambda",
      },
      "Mu Challenge": {
        "date": "Jun 5, 2024, 3:00 PM",
        "participantsJoined": 7,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/mu",
      },
      "Nu Tournament": {
        "date": "Jun 10, 2024, 12:00 PM",
        "participantsJoined": 6,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/nu",
      }
    },
    "Ongoing": {
      "Delta Open": {
        "date": "May 12, 2024, 1:00 PM",
        "participantsJoined": 20,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/delta",
      },
      "Epsilon Clash": {
        "date": "May 15, 2024, 2:00 PM",
        "participantsJoined": 18,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/epsilon",
      },
      "Zeta Championship": {
        "date": "May 20, 2024, 11:00 AM",
        "participantsJoined": 25,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/zeta",
      },
      "Lambda Invitational": {
        "date": "Jun 1, 2024, 10:00 AM",
        "participantsJoined": 5,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/lambda",
      },
      "Mu Challenge": {
        "date": "Jun 5, 2024, 3:00 PM",
        "participantsJoined": 7,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/mu",
      },
      "Nu Tournament": {
        "date": "Jun 10, 2024, 12:00 PM",
        "participantsJoined": 6,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/nu",
      }
    },
    "Completed": {
      "Theta Series": {
        "date": "Apr 1, 2024, 9:00 AM",
        "participantsJoined": 22,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/theta",
      },
      "Iota Tournament": {
        "date": "Apr 5, 2024, 10:00 AM",
        "participantsJoined": 30,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/iota",
      },
      "Iota Tourament": {
        "date": "Apr 5, 2024, 10:00 AM",
        "participantsJoined": 30,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/iota",
      },
      "Kappa Cup": {
        "date": "Apr 10, 2024, 12:00 PM",
        "participantsJoined": 12,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/kappa",
      }
    },
    "My Tournament": {
      "Lambda Invitational": {
        "date": "Jun 1, 2024, 10:00 AM",
        "participantsJoined": 5,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/lambda",
      },
      "Mu Challenge": {
        "date": "Jun 5, 2024, 3:00 PM",
        "participantsJoined": 7,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/mu",
      },
      "Nu Tournament": {
        "date": "Jun 10, 2024, 12:00 PM",
        "participantsJoined": 6,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/nu",
      }
    },
    "Local": {
      "Omicron Local": {
        "date": "Jul 1, 2024, 10:00 AM",
        "participantsJoined": 10,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/omicron",
      },
      "Pi Town Cup": {
        "date": "Jul 5, 2024, 3:00 PM",
        "participantsJoined": 8,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/pi",
      },
      "Rho Regionals": {
        "date": "Jul 10, 2024, 12:00 PM",
        "participantsJoined": 12,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/rho",
      },
      "Omicon Local": {
        "date": "Jul 1, 2024, 10:00 AM",
        "participantsJoined": 10,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/omicron",
      },
      "Pi TownCup": {
        "date": "Jul 5, 2024, 3:00 PM",
        "participantsJoined": 8,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/pi",
      },
      "Rho Regonals": {
        "date": "Jul 10, 2024, 12:00 PM",
        "participantsJoined": 12,
        "imageUrl": "/Ping_Pong_Battle_4.png",
        "pageUrl": "/tournament/rho",
      }
    }
  };
  


/************************************************************************ */

// const allTournaments = {
//     "Alpha Championship": {
//       "date": "Mar 1, 2023, 10:00 AM",
//       "participantsJoined": 10,
//       "imageUrl": "/Ping_Pong_Battle_4.png",
//       "pageUrl": "/tournament/alpha",
//     },
//     "Beta Cup": {
//       "date": "Mar 5, 2023, 3:00 PM",
//       "participantsJoined": 8,
//       "imageUrl": "/Ping_Pong_Battle_4.png",
//       "pageUrl": "/tournament/beta",
//     },
//     "Gamma Tournament": {
//       "date": "Mar 10, 2023, 12:00 PM",
//       "participantsJoined": 15,
//       "imageUrl": "/Ping_Pong_Battle_4.png",
//       "pageUrl": "/tournament/gamma",
//     }
//   };
  
//   const ongoingTournaments = {
//     "Delta Open": {
//       "date": "May 12, 2024, 1:00 PM",
//       "participantsJoined": 20,
//       "imageUrl": "/Ping_Pong_Battle_4.png",
//       "pageUrl": "/tournament/delta",
//     },
//     "Epsilon Clash": {
//       "date": "May 15, 2024, 2:00 PM",
//       "participantsJoined": 18,
//       "imageUrl": "/Ping_Pong_Battle_4.png",
//       "pageUrl": "/tournament/epsilon",
//     },
//     "Zeta Championship": {
//       "date": "May 20, 2024, 11:00 AM",
//       "participantsJoined": 25,
//       "imageUrl": "/Ping_Pong_Battle_4.png",
//       "pageUrl": "/tournament/zeta",
//     }
//   };
  
//   const completedTournaments = {
//     "Theta Series": {
//       "date": "Apr 1, 2024, 9:00 AM",
//       "participantsJoined": 22,
//       "imageUrl": "/Ping_Pong_Battle_4.png",
//       "pageUrl": "/tournament/theta",
//     },
//     "Iota Tournament": {
//       "date": "Apr 5, 2024, 10:00 AM",
//       "participantsJoined": 30,
//       "imageUrl": "/Ping_Pong_Battle_4.png",
//       "pageUrl": "/tournament/iota",
//     },
//     "Kappa Cup": {
//       "date": "Apr 10, 2024, 12:00 PM",
//       "participantsJoined": 12,
//       "imageUrl": "/Ping_Pong_Battle_4.png",
//       "pageUrl": "/tournament/kappa",
//     }
//   };
  
//   const myTournaments = {
//     "Lambda Invitational": {
//       "date": "Jun 1, 2024, 10:00 AM",
//       "participantsJoined": 5,
//       "imageUrl": "/Ping_Pong_Battle_4.png",
//       "pageUrl": "/tournament/lambda",
//     },
//     "Mu Challenge": {
//       "date": "Jun 5, 2024, 3:00 PM",
//       "participantsJoined": 7,
//       "imageUrl": "/Ping_Pong_Battle_4.png",
//       "pageUrl": "/tournament/mu",
//     },
//     "Nu Tournament": {
//       "date": "Jun 10, 2024, 12:00 PM",
//       "participantsJoined": 6,
//       "imageUrl": "/Ping_Pong_Battle_4.png",
//       "pageUrl": "/tournament/nu",
//     }
//   };
  
//   const localTournaments = {
//     "Omicron Local": {
//       "date": "Jul 1, 2024, 10:00 AM",
//       "participantsJoined": 10,
//       "imageUrl": "/Ping_Pong_Battle_4.png",
//       "pageUrl": "/tournament/omicron",
//     },
//     "Pi Town Cup": {
//       "date": "Jul 5, 2024, 3:00 PM",
//       "participantsJoined": 8,
//       "imageUrl": "/Ping_Pong_Battle_4.png",
//       "pageUrl": "/tournament/pi",
//     },
//     "Rho Regionals": {
//       "date": "Jul 10, 2024, 12:00 PM",
//       "participantsJoined": 12,
//       "imageUrl": "/Ping_Pong_Battle_4.png",
//       "pageUrl": "/tournament/rho",
//     }
//   };
  