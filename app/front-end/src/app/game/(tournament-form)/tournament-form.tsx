// import styles from './styles.module.css'

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

            <div className="row">
                <div className="col-3">
                    <h1 className="itim-font">Upcoming tournaments</h1>
                </div>
                <div className="col-3">
                    <h1 className="itim-font">Upcoming tournaments</h1>
                </div>
            </div>
        </>
    );
}

export default TournamentForm