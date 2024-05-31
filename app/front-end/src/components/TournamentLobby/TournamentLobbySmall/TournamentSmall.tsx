import React from 'react';
import './TournamentSmall.css';
import SafeImage from '../../../components/SafeImage/SafeImage';

interface User {
    name: string;
    photoUrl: string;
    score: number;
    status: boolean;
}

interface Match {
    user1: User;
    user2: User;
}

interface Side {
    index: number;
    quarterfinals: Match[];
    semifinals: Match[];
    finals: Match[];
}

interface TournamentData {
    side1: Side;
    side2: Side;
}

const TournamentSmall: React.FC<TournamentData> = (data: TournamentData) => {
    return (
        <div className="container_sm">
            <div className="Tournament_container_sm">
                <div className="Tournament_quarterfinals">
                    <h1 className="quarterfinals_title">Quarterfinals</h1>
                    <div className="teams_sm">
                        <div className="match">
                            <div className="user_sm">
                                <div className="tour_score">{data.side1.quarterfinals[0].user1.score}</div>
                                <div
                                    className={`placeholder_image_sm ${
                                        data.side1.quarterfinals[0].user1.status ? '' : 'garyscaleimg'
                                    }`}
                                >
                                    <SafeImage
                                        src={data.side1.quarterfinals[0].user1.photoUrl}
                                        alt={data.side1.quarterfinals[0].user1.name}
                                    />
                                </div>
                                <marquee style={{width: '100px', marginTop: "15px" }}>{data.side1.quarterfinals[0].user1.name}</marquee>
                            </div>
                            <div className="user_hr">
                                <h1 className="vs">VS</h1>
                            </div>
                            <div className="user_sm">
                                <div className="tour_score">{data.side1.quarterfinals[0].user2.score}</div>
                                <div
                                    className={`placeholder_image_sm ${
                                        data.side1.quarterfinals[0].user2.status ? '' : 'garyscaleimg'
                                    }`}
                                >
                                    <SafeImage
                                        src={data.side1.quarterfinals[0].user2.photoUrl}
                                        alt={data.side1.quarterfinals[0].user2.name}
                                    />
                                </div>
                                <marquee style={{width: '100px', marginTop: "15px" }}>{data.side1.quarterfinals[0].user2.name}</marquee>
                            </div>
                        </div>
                        <div className="match">
                            <div className="user_sm">
                                <div className="tour_score">{data.side1.quarterfinals[1].user1.score}</div>
                                <div
                                    className={`placeholder_image_sm ${
                                        data.side1.quarterfinals[1].user1.status ? '' : 'garyscaleimg'
                                    }`}
                                >
                                    <SafeImage
                                        src={data.side1.quarterfinals[1].user1.photoUrl}
                                        alt={data.side1.quarterfinals[1].user1.name}
                                    />
                                </div>
                                <marquee style={{width: '100px', marginTop: "15px" }}>{data.side1.quarterfinals[1].user1.name}</marquee>
                            </div>
                            <div className="user_hr">
                                <h1 className="vs">VS</h1>
                            </div>
                            <div className="user_sm">
                                <div className="tour_score">{data.side1.quarterfinals[1].user2.score}</div>
                                <div
                                    className={`placeholder_image_sm ${
                                        data.side1.quarterfinals[1].user2.status ? '' : 'garyscaleimg'
                                    }`}
                                >
                                    <SafeImage
                                        src={data.side1.quarterfinals[1].user2.photoUrl}
                                        alt={data.side1.quarterfinals[1].user2.name}
                                    />
                                </div>
                                <marquee style={{width: '100px', marginTop: "15px" }}>{data.side1.quarterfinals[1].user2.name}</marquee>
                            </div>
                        </div>
                        <div className="match">
                            <div className="user_sm">
                                <div className="tour_score">{data.side2.quarterfinals[0].user1.score}</div>
                                <div
                                    className={`placeholder_image_sm ${
                                        data.side2.quarterfinals[0].user1.status ? '' : 'garyscaleimg'
                                    }`}
                                >
                                    <SafeImage
                                        src={data.side2.quarterfinals[0].user1.photoUrl}
                                        alt={data.side2.quarterfinals[0].user1.name}
                                    />
                                </div>
                                <marquee style={{width: '100px', marginTop: "15px" }}>{data.side2.quarterfinals[0].user1.name}</marquee>
                            </div>
                            <div className="user_hr">
                                <h1 className="vs">VS</h1>
                            </div>
                            <div className="user_sm">
                                <div className="tour_score">{data.side2.quarterfinals[0].user2.score}</div>
                                <div
                                    className={`placeholder_image_sm ${
                                        data.side2.quarterfinals[0].user2.status ? '' : 'garyscaleimg'
                                    }`}
                                >
                                    <SafeImage
                                        src={data.side2.quarterfinals[0].user2.photoUrl}
                                        alt={data.side2.quarterfinals[0].user2.name}
                                    />
                                </div>
                                <marquee style={{width: '100px', marginTop: "15px" }}>{data.side2.quarterfinals[0].user2.name}</marquee>
                            </div>
                        </div>
                        <div className="match">
                            <div className="user_sm">
                                <div className="tour_score">{data.side2.quarterfinals[1].user1.score}</div>
                                <div
                                    className={`placeholder_image_sm ${
                                        data.side2.quarterfinals[1].user1.status ? '' : 'garyscaleimg'
                                    }`}
                                >
                                    <SafeImage
                                        src={data.side2.quarterfinals[1].user1.photoUrl}
                                        alt={data.side2.quarterfinals[1].user1.name}
                                    />
                                </div>
                                <marquee style={{width: '100px', marginTop: "15px" }}>{data.side2.quarterfinals[1].user1.name}</marquee>
                            </div>
                            <div className="user_hr">
                                <h1 className="vs">VS</h1>
                            </div>
                            <div className="user_sm">
                                <div className="tour_score">{data.side2.quarterfinals[1].user2.score}</div>
                                <div
                                    className={`placeholder_image_sm ${
                                        data.side2.quarterfinals[1].user2.status ? '' : 'garyscaleimg'
                                    }`}
                                >
                                    <SafeImage
                                        src={data.side2.quarterfinals[1].user2.photoUrl}
                                        alt={data.side2.quarterfinals[1].user2.name}
                                    />
                                </div>
                                <marquee style={{width: '100px', marginTop: "15px" }}>{data.side2.quarterfinals[1].user2.name}</marquee>
                            </div>
                        </div>
                    </div>
                </div>
                <hr style={{ width: '70%', height: '5px', margin: 'auto', backgroundColor: 'white' }} />
                <div className="Tournament_semifinals mt-4">
                    <h1 className="semifinals_title">Semifinals</h1>
                    <div className="teams_sm">
                        <div className="match">
                            <div className="user_sm">
                                <div className="tour_score">{data.side1.semifinals[0].user1.score}</div>
                                <div
                                    className={`placeholder_image_sm ${
                                        data.side1.semifinals[0].user1.status ? '' : 'garyscaleimg'
                                    }`}
                                >
                                    <SafeImage
                                        src={data.side1.semifinals[0].user1.photoUrl}
                                        alt={data.side1.semifinals[0].user1.name}
                                    />
                                </div>
                                <marquee style={{width: '100px', marginTop: "15px" }}>{data.side1.semifinals[0].user1.name}</marquee>
                            </div>
                            <div className="user_hr">
                                <h1 className="vs">VS</h1>
                            </div>
                            <div className="user_sm">
                                <div className="tour_score">{data.side1.semifinals[0].user2.score}</div>
                                <div
                                    className={`placeholder_image_sm ${
                                        data.side1.semifinals[0].user2.status ? '' : 'garyscaleimg'
                                    }`}
                                >
                                    <SafeImage
                                        src={data.side1.semifinals[0].user2.photoUrl}
                                        alt={data.side1.semifinals[0].user2.name}
                                    />
                                </div>
                                <marquee style={{width: '100px', marginTop: "15px" }}>{data.side1.semifinals[0].user2.name}</marquee>
                            </div>
                        </div>
                        <div className="match">
                            <div className="user_sm">
                                <div className="tour_score">{data.side2.semifinals[0].user1.score}</div>
                                <div
                                    className={`placeholder_image_sm ${
                                        data.side2.semifinals[0].user1.status ? '' : 'garyscaleimg'
                                    }`}
                                >
                                    <SafeImage
                                        src={data.side2.semifinals[0].user1.photoUrl}
                                        alt={data.side2.semifinals[0].user1.name}
                                    />
                                </div>
                                <marquee style={{width: '100px', marginTop: "15px" }}>{data.side2.semifinals[0].user1.name}</marquee>
                            </div>
                            <div className="user_hr">
                                <h1 className="vs">VS</h1>
                            </div>
                            <div className="user_sm">
                                <div className="tour_score">{data.side2.semifinals[0].user2.score}</div>
                                <div
                                    className={`placeholder_image_sm ${
                                        data.side2.semifinals[0].user2.status ? '' : 'garyscaleimg'
                                    }`}
                                >
                                    <SafeImage
                                        src={data.side2.semifinals[0].user2.photoUrl}
                                        alt={data.side2.semifinals[0].user2.name}
                                    />
                                </div>
                                <marquee style={{width: '100px', marginTop: "15px" }}>{data.side2.semifinals[0].user2.name}</marquee>
                            </div>
                        </div>
                    </div>
                </div>
                <hr style={{ width: '70%', height: '5px', margin: 'auto', backgroundColor: 'white' }} />
                <div className="Tournament_finals mt-4">
                    <h1 className="finals_title">Finals</h1>
                    <div className="teams_sm">
                        <div className="match">
                            <div className="user_sm">
                                <div className="tour_score">{data.side1.finals[0].user1.score}</div>
                                <div
                                    className={`placeholder_image_sm ${
                                        data.side1.finals[0].user1.status ? '' : 'garyscaleimg'
                                    }`}
                                >
                                    <SafeImage
                                        src={data.side1.finals[0].user1.photoUrl}
                                        alt={data.side1.finals[0].user1.name}
                                    />
                                </div>
                                <marquee style={{width: '100px', marginTop: "15px" }}>{data.side1.finals[0].user1.name}</marquee>
                            </div>
                            <div className="user_hr">
                                <h1 className="vs">VS</h1>
                            </div>
                            <div className="user_sm">
                                <div className="tour_score">{data.side2.finals[0].user1.score}</div>
                                <div
                                    className={`placeholder_image_sm ${
                                        data.side2.finals[0].user1.status ? '' : 'garyscaleimg'
                                    }`}
                                >
                                    <SafeImage
                                        src={data.side2.finals[0].user1.photoUrl}
                                        alt={data.side2.finals[0].user1.name}
                                    />
                                </div>
                                <marquee style={{width: '100px', marginTop: "15px" }}>{data.side2.finals[0].user1.name}</marquee>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TournamentSmall;
