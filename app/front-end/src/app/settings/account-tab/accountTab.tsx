import styles from '../styles.module.css'
import CountriesAndCities from '../countries-cities/countriesAndCities'
import { ChangeEvent, useContext } from 'react'
import { FormContext } from '../page'
import { GetInput, Props } from '../components/input'

function    GenerateInputFields() {
    
    const   { valuesToPost } = useContext(FormContext);

    const   inputProps = [
        {
            className : "p-0 m-0 mt-4 row justify-content-center itim-font",
            inputType : "text",
            inputId: "first_name",
            labelText: "First Name",
            placeholder : valuesToPost["first_name"],
            inputLength : 20
        },
        {
            className : "p-0 m-0 mt-4 row justify-content-center itim-font",
            inputType : "text",
            inputId: "last_name",
            labelText: "Last Name",
            placeholder : valuesToPost["last_name"],
            inputLength : 20
        },
        {
            className : "p-0 m-0 mt-4 row justify-content-center itim-font",
            inputType : "text",
            inputId: "nickname",
            labelText: "Nickname",
            placeholder : valuesToPost["nickname"],
            inputLength : 20
        }
    ]

    return (
        <>
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
                                inputLength={inputLength}>
                            </GetInput>
                        </div>
                    )
                })
            }
                <CountriesAndCities
                    className="p-0 m-0 mt-4 row justify-content-center"
                    labelText1='Country'
                    labelText2='City'
                    id="countries">
                </CountriesAndCities>

        </>
    );
}

function    AccountTab() {
    const   { updateField } = useContext(FormContext);

    return (
        <>

            <fieldset className="col-12 col-xxl-6 p-0 m-0 d-flex justify-content-center align-items-center">
                <div className={`${styles.image_container}`}>
                    <label htmlFor="file_input" className={`${styles.image_container}`}>
                        <img src="profile.jpeg" alt="" className={`${styles.profilePic}`}/>
                        <img src="camera.png" alt="" className={`${styles.camera}`}/>
                    </label>
                    <input
                        type="file"
                        className="d-none"
                        onChange={(e : ChangeEvent<HTMLInputElement>) => updateField('image', e.target.value)}
                        id="file_input" />
                </div>
            </fieldset>
            <fieldset className="col-12 col-xxl-6 p-0 m-0 d-flex justify-content-center align-items-center">
                <div className="row ">

                <GenerateInputFields/>


                </div>
            </fieldset>
        </>
    )
}

export default AccountTab;
export { GetInput }