import styles from './styles.module.css'
import { ChangeEvent } from 'react'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import InputGroup from 'react-bootstrap/InputGroup';

interface Props{
    inputType ?: string;
    placeholder ?: string;
    className ?: string;
    inputClassName ?: string;
    inputId ?:string;
    labelText ?:string;
    labelClass ?: string;
    inputLength ?: number;
    index ?: number;
    handleChange ?: (e : ChangeEvent<HTMLInputElement>, i : number) => void;
}

function    GetInput(
    {
        className="col",
        inputClassName="",
        inputType="text",
        placeholder="",
        inputId="",
        labelText="",
        handleChange,
        inputLength,
        index=0,
        labelClass=""
    }: Props) {

        return (
        <>
        <div className={`${className} flex-wrap flex-xl-nowrap`}>
            <label
                className={`col-6 itim-font d-flex justify-content-start align-items-center p-0 m-0 ${styles.inputTitle} ${styles.labelClass}`} 
                htmlFor={inputId}>
                    {labelText}
            </label>
            <div className={`col-6 ${styles.inputHolder} row justify-content-center p-0 m-2`}>
                <input
                    type={inputType}
                    placeholder={placeholder}
                    className={`${styles.input} ${inputClassName} ps-4`}
                    id={inputId}
                    maxLength={inputLength}
                    // onChange={(e) => {if (handleChange) {handleChange(e, index)}}}
                />
                {/* <input list="browsers" /> */}
            </div>
        </div>
        </>
    )
}


function    GenerateInputFields() {
    
    const   inputProps = [
        {
            className : "p-0 m-0 mt-4 row justify-content-center",
            inputType : "text",
            inputId: "first_name",
            labelText: "First Name",
            placeholder : "Your First Name",
            inputLength : 20
        },
        {
            className : "p-0 m-0 mt-4 row justify-content-center",
            inputType : "text",
            inputId: "last_name",
            labelText: "Last Name",
            placeholder : "Your Last Name",
            inputLength : 20
        },
        {
            className : "p-0 m-0 mt-4 row justify-content-center",
            inputType : "text",
            inputId: "nickname",
            labelText: "Nickname",
            placeholder : "Your Nickname",
            inputLength : 20
        },
        {
            className : "p-0 m-0 mt-4 row justify-content-center",
            inputType : "list",
            inputId: "country",
            labelText: "country",
            placeholder : "Your country"
        },
        {
            className : "p-0 m-0 my-4 row justify-content-center",
            inputType : "text",
            inputId: "city",
            labelText: "City",
            placeholder : "Your city"
        }
    ]
    return (

        <div>
            {
                inputProps.map(({className, inputType, inputId, labelText, placeholder, inputLength} : Props) => {
                    return (  
                    <div key={inputId}>
                        <GetInput
                            className={className}
                            inputType={inputType}
                            inputId={inputId}
                            labelText={labelText}
                            placeholder={placeholder}
                            inputLength={inputLength}
                            >
                        </GetInput>

                        {/* <InputGroup className='mb-2 row p-0 m-0 d-flex justify-content-center'>
                                <CountryDropdown
                                    classes={`${styles.selector} col-md-5 col-sm-10 mx-3 mb-1 p-2`}
                                    value={} />
                                <RegionDropdown
                                    classes={`${styles.selector} col-md-5 col-sm-10 mx-3 mb-1 p-2`}
                                    country={}
                                    value={}/>
                        </InputGroup> */}
                {/* <label for="cars">Choose a car:</label>
                <select id="browsers">
                    <option value="Internet Explorer" />
                    <option value="Firefox" />
                    <option value="Google Chrome" />
                    <option value="Opera" />
                    <option value="Safari" >Safari</option>
                </select> */}
                    </div>
                    
                    )
                })
            }
        </div>
    );
}

function    AccountTab() {
    return (
        <>
            <fieldset className="col-12 col-xxl-6 p-0 m-0 d-flex justify-content-center align-items-center">
                <div className={`${styles.image_container}`}>
                    <label htmlFor="file_input" className={`${styles.image_container}`}>
                        <img src="profile.jpeg" alt="" className={`${styles.profilePic}`}/>
                        <img src="camera.png" alt="" className={`${styles.camera}`}/>
                    </label>
                    <input type="file" className="d-none" id="file_input">
                    </input>
                </div>
            </fieldset>
            <fieldset className="col-12 col-xxl-6 p-0 m-0 d-flex justify-content-center align-items-center flex-wrap">
                <GenerateInputFields/>
            </fieldset>
        </>
    )
}

function SettingsPage()
{
    return (
        <>
        <div className={` ${styles.wrapper} container-fluid vh-100 border border-warning p-0 m-0`}>
            <div className="row h-100 p-0 m-0">

                <div className="row p-0 m-0 mt-5">
                    <div className="col">
                        <h1 className="valo-font">settings</h1>
                    </div>
                </div>

                <main className={`${styles.main_container} row p-0 m-0 my-5 justify-content-center align-items-center`}>
                    <form className={`row ${styles.form_container}`}>

                        <fieldset className={`row p-0 m-0 my-3 `}>
                            <h2 className="col-4 mt-2 col-xl-2 valorax-font">Account</h2>
                            <h2 className="col-4 mt-2 col-xl-2 valorax-font">Security</h2>
                            <h2 className="col-4 mt-2 col-xl-2 valorax-font">Game</h2>
                        </fieldset>

                        <AccountTab/>

                    </form>
                    <div className="col-12 d-flex justify-content-center my-4">
                        <button
                            className={`valo-font col-8 col-md-6 ${styles.create_button}`}>
                                SAVE
                        </button>
                    </div>
                </main>
                </div>

        </div>
        </>
    );
}

export default SettingsPage;