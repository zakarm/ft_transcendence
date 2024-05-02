'use client'

import styles from './styles.module.css'
import CreateTournament from "./form";
import Nav from 'react-bootstrap/Nav';

declare global {
    namespace JSX {
      interface IntrinsicElements {
        [elemName: string]: any;
      }
    }
}

function TournamentForm() {
    return (
        <>
            <main className="row p-0 m-0 ">
                <div className="col-12 col-xl-5 d-flex justify-content-center flex-column align-items-center vh-100">
                    <CreateTournament></CreateTournament>
                </div>
                <div className="col-5 border"></div>
            </main>
        </>
    );
}

export default TournamentForm