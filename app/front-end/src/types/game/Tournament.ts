export interface Tournament_User {
    name: string;
    photoUrl: string;
    score: number;
    status: boolean;
}

export interface Tournament_Match_ {
    user1: Tournament_User;
    user2: Tournament_User;
}

export interface Tournament_stage {
    quatre_final: {
        match1: Tournament_Match_;
        match2: Tournament_Match_;
        match3: Tournament_Match_;
        match4: Tournament_Match_;
    };
    semi_final: {
        match1: Tournament_Match_;
        match2: Tournament_Match_;
    };
    final: {
        match1: Tournament_Match_;
    };
}

export interface LocalTournamentProps {
    tournament_name: string;
    tournamentImage: string;
    player_1: string;
    player_2: string;
    player_3: string;
    player_4: string;
    player_5: string;
    player_6: string;
    player_7: string;
    player_8: string;
    difficulty: string;
    date: string;
    Participants: number;
	data: Tournament_stage;
}

/***********************************************************************/

export interface TournamentData_User {
    name: string;
    photoUrl: string;
    score: number;
    status: boolean;
}

export interface TournamentData_Match {
    [key: string]: TournamentData_User;
}

export interface TournamentData_Side {
    index: number;
    quarterfinals: TournamentData_Match[];
    semifinals: TournamentData_Match[];
    finals: TournamentData_Match[];
}

export interface TournamentData {
	TournamentName: string;
	difficulty: string;
    side1: TournamentData_Side;
    side2: TournamentData_Side;
}

/***********************************************************************/

export interface TournamentUserProps {
    user: {
        name: string;
        photoUrl: string;
        score: number;
        status: boolean;
    };
}
export interface TournamentMatchProps {
    match: {
        user1: TournamentUserProps['user'];
        user2: TournamentUserProps['user'];
    };
}
export interface TournamentStageProps {
    title: string;
    matches: {
        [key: string]: TournamentUserProps['user'];
    }[];
}
