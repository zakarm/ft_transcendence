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

function    TournamentCard() {
    return (
        <>
        </>
    )
}

function UnderlineExample() {
    return (
      <Nav variant="underline" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="#">Upcoming tournaments</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">My tournaments</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }

function TournamentForm() {
    return (
        <>
            <div className="row border p-0 m-0">
                <div className="col border">
                    <h1 className="valo-font">ALL TOURNAMENTS</h1>
                </div>
            </div>

            <div className="row p-0 m-0">
                <div className="col border">
                    <input type="text" placeholder="Search.." />
                </div>
            </div>

            <div className="row p-0 m-0">
                <UnderlineExample></UnderlineExample>
                {/* <div className="col-3">
                    <h1 className="itim-font">Upcoming tournaments</h1>
                </div>
                <div className="col-3">
                    <h1 className="itim-font">My tournaments</h1>
                </div> */}
            </div>

            <main className="row p-0 m-0">
                <div className="col-12 col-xl-5 d-flex justify-content-center border">
                    <CreateTournament></CreateTournament>
                </div>
                <div className="col-5 border"></div>
            </main>
        </>
    );
}

export default TournamentForm