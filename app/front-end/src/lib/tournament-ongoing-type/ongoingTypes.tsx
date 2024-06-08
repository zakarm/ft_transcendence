import React from 'react'

// **********************************************************************

interface   UserInfoTypes {
    name : string;
    photoUrl : string;
    score : number;
}

interface   UserTypes {
    user1 : UserInfoTypes
    user2 : UserInfoTypes
}

interface   QuarterFinalMatchTypes {
    match1 : UserTypes;
    match2 : UserTypes;
    match3 : UserTypes;
    match4 : UserTypes;
    [key : string] : UserTypes;
}

interface   SemiFinalMatchTypes {
    match1 : UserTypes;
    match2 : UserTypes;
    [key : string] : UserTypes;
}

interface   FinalMatchTypes {
    match1 : UserTypes;
    [key : string] : UserTypes;
}

// Message coming from socket for live matches in tournament
interface   LiveMatchesTypes {
    action : string;
    data : {
        [key : string] : QuarterFinalMatchTypes | SemiFinalMatchTypes | FinalMatchTypes;
        quarter_final : QuarterFinalMatchTypes;
        semi_final : SemiFinalMatchTypes;
        final : FinalMatchTypes;
    }
}

// **********************************************************************

// GetPlayerImageTitle function
interface GetPlayerImageTitleTypes{
    p1 : string;
    imgWidth : string;
    imgHeight : string;
    fontSize ?: string;
    imageSrc ?: string;
    setIsImageValid ?: React.Dispatch<React.SetStateAction<boolean>>;
}


interface   RenderUpcomingMatchesTypes {
    round : QuarterFinalMatchTypes | SemiFinalMatchTypes |  FinalMatchTypes;
    setmatchToRenderLive : React.Dispatch<React.SetStateAction<string>>;
}

// **********************************************************************

export type {
    LiveMatchesTypes as LiveMatchesTypes,
    UserTypes as UserTypes,
    GetPlayerImageTitleTypes as GetPlayerImageTitleTypes,
    QuarterFinalMatchTypes as QuarterFinalMatchTypes,
    SemiFinalMatchTypes as SemiFinalMatchTypes,
    FinalMatchTypes as FinalMatchTypes,
    UserInfoTypes as UserInfoTypes,
    RenderUpcomingMatchesTypes as RenderUpcomingMatchesTypes
}