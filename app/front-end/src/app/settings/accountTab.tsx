import styles from './styles.module.css'
import CountriesAndCities from './countriesAndCities'
import { ChangeEvent } from 'react'

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
            <div className={`${className} flex-wrap flex-xxl-nowrap `}>
                <label
                    className={`col-8 col-sm-3 itim-font d-flex align-items-center p-0 m-0 ${styles.inputTitle} ${styles.labelClass}`} 
                    htmlFor={inputId}>
                    {labelText}
                </label>
                <div className={`col-6 ${styles.inputHolder} row justify-content-center p-0 m-1 `}>
                    <input
                        type={inputType}
                        placeholder={placeholder}
                        className={`${styles.input} ${inputClassName} ps-4`}
                        id={inputId}
                        maxLength={inputLength}
                        // onChange={(e) => {if (handleChange) {handleChange(e, index)}}}
                    />
                </div>
            </div>
        );
}

function    GenerateInputFields() {
    
    const   inputProps = [
        {
            className : "p-0 m-0 mt-4 row justify-content-center itim-font",
            inputType : "text",
            inputId: "first_name",
            labelText: "First Name",
            placeholder : "Your First Name",
            inputLength : 20
        },
        {
            className : "p-0 m-0 mt-4 row justify-content-center itim-font",
            inputType : "text",
            inputId: "last_name",
            labelText: "Last Name",
            placeholder : "Your Last Name",
            inputLength : 20
        },
        {
            className : "p-0 m-0 mt-4 row justify-content-center itim-font",
            inputType : "text",
            inputId: "nickname",
            labelText: "Nickname",
            placeholder : "Your Nickname",
            inputLength : 20
        }
    ]

    return (

        <div>
            {
                inputProps.map(({className, inputType, inputId, labelText, placeholder, inputLength} : Props) => {
                    return (  
                            <GetInput
                                className={className}
                                inputType={inputType}
                                inputId={inputId}
                                labelText={labelText}
                                placeholder={placeholder}
                                inputLength={inputLength}
                                >
                            </GetInput>
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
            <fieldset className="col-12 col-xxl-6 p-0 m-0 d-flex justify-content-center align-items-center">
                <div className="row ">

                <GenerateInputFields/>

                <CountriesAndCities
                    className="p-0 m-0 mt-4 row justify-content-center"
                    country=""
                    labelText='Country'
                    id="countries">
                </CountriesAndCities>

                <CountriesAndCities
                    className="p-0 m-0 my-4 row justify-content-center"
                    country="Morocco"
                    labelText='City'
                    id="countries"
                    currentCity="DougaCity">
                </CountriesAndCities>
                </div>
            </fieldset>
        </>
    )
}

export default AccountTab;