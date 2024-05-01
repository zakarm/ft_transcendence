import styles from './styles.module.css'
import Form from 'react-bootstrap/Form';
import ButtonValo from '../../../components/button'


interface Props{
    inputType ?: string;
    placeholder ?: string;
    className ?: string;
    inputClassName ?: string;
    inputId ?:string;
    labelText ?:string
}

function    GetInput(
    {
        className="col",
        inputClassName="",
        inputType="text",
        placeholder="",
        inputId="",
        labelText=""
    }: Props) {
    return (
        <>
        <div className={`${className}`}>
            <label className="col-9 itim-font text-left p-0 m-0" for={inputId}>{labelText}</label>
            <div className={`${styles.inputHolder} row justify-content-center p-0 m-2`}>
                <input
                    type={inputType}
                    placeholder={placeholder}
                    className={`${styles.input} ${inputClassName}`}
                    id={inputId}
                />
            </div>
        </div>
        </>
    )
}

function CreateTournament() {
    return (
        <>
        <form className={`${styles.formWrapper} row justify-content-center p-0 m-0 mt-2`}>

            <filedset className={`row justify-content-center p-0 m-0`}>
                    <div className="row">
                        <div className="col text-center p-4 mt-2">
                            <legend className={`valo-font text-nowrap ${styles.formTitle}`}>CREATE TOURNAMENT</legend>
                        </div>
                    </div>
                    <div className="row justify-content-center">

                    <GetInput
                        className="p-2 mt-2 row justify-content-center"
                        inputClassName="inputForm"
                        inputType="text"
                        inputId="Username"
                        labelText="Username">
                    </GetInput>
                    <GetInput
                        className="p-2 mt-2 row justify-content-center"
                        inputClassName="inputForm"
                        inputType="text"
                        inputId="Tournament_name"
                        labelText="Tournament name">
                    </GetInput>
                    <GetInput
                        className="p-2 mt-2 row justify-content-center"
                        inputClassName="inputForm"
                        inputType="text"
                        inputId="start_date"
                        labelText="Start date">
                    </GetInput>
                    <GetInput
                        className="p-2 mt-2 row justify-content-center"
                        inputClassName="inputForm"
                        inputType="text"
                        inputId="end_date"
                        labelText="End date">
                    </GetInput>
                </div>
                <div class={`row justify-content-center ${styles.slidecontainer} p-0 mt-2`}>
                    <label className="col-9 itim-font text-left p-0 m-0" for="myRange">Game Difficulty</label>=
                    <div className="col-9 d-flex justify-content-center p-0 my-3">
                        <input type="range" min="0" max="12" step="6" class={`${styles.slider}`} id="myRange"/>
                    </div>
                </div>
            </filedset>

            <div className="row p-0 my-4">
                <div className="col d-flex justify-content-center">
                    <button className={`valo-font col-6 col-md-4 ${styles.create_button}`}>CREATE</button>
                </div>
            </div>
        </form>
        </>
    )
}

export default  CreateTournament;