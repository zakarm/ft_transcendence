import ChooseOpponent from "./(choose-opponent)/chooseOpponent";
import TournamentForm from "./(tournament-form)/tournament-form";

export default function()
{
    return (
        <>
        <div className="container-fluid p-0 m-0 vh-100 justify-content-center">
            <ChooseOpponent></ChooseOpponent>
            {/* <TournamentForm></TournamentForm> */}
        </div>
        </>
    );
}