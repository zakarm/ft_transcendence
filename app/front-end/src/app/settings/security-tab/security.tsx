import styles from '../styles.module.css'
import { ChangeEvent, useContext } from 'react'
import { FormContext } from '../form-components/formContext'
import { GetInput, GetCheckboxInput, Props } from '../form-components/input'

function    GenerateInputFields() {
    const   { valuesToPost } = useContext(FormContext);

    const   inputProps = [
        {
            className : "p-0 m-0 mt-4 row justify-content-center itim-font",
            inputType : "text",
            inputId: "password",
            labelText: "Password",
            inputLength : 200
        },
        {
            className : "p-0 m-0 mt-4 row justify-content-center itim-font",
            inputType : "text",
            inputId: "repeat_password",
            labelText: "Repeat Password",
            inputLength : 200
        },
        {
            className : "p-0 m-0 mt-4 row justify-content-center itim-font",
            inputType : "checkbox",
            inputId: "is_two_fact",
            labelText: "Enable 2FA",
            placeholder : valuesToPost["is_two_fact"],
        },
        {
            className : "p-0 m-0 my-4 row justify-content-center itim-font",
            inputType : "text",
            inputId: "two_fact_secret",
            labelText: "2FA Secret Pass",
            inputLength : 200
        }
    ]

    return (
        <>
            {
                inputProps.slice(0, 2).map(({className, inputType, inputId, labelText, placeholder, inputLength} : Props) => {
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
            <div key={inputProps[2].inputId}>
                <GetCheckboxInput
                    className={inputProps[2].className}
                    inputType={inputProps[2].inputType}
                    inputId={inputProps[2].inputId}
                    labelText={inputProps[2].labelText}
                    placeholder={inputProps[2].placeholder}
                    inputLength={inputProps[2].inputLength}>
                </GetCheckboxInput>
            </div>
            <div key={inputProps[3].inputId}>
                <GetInput
                    className={inputProps[3].className}
                    inputType={inputProps[3].inputType}
                    inputId={inputProps[3].inputId}
                    labelText={inputProps[3].labelText}
                    placeholder={inputProps[3].placeholder}
                    inputLength={inputProps[3].inputLength}>
                </GetInput>
            </div>
        </>
    )
}

function    SecurityTab() {
    const   { accountValues } = useContext(FormContext);

    return (
        <>
            <fieldset className="col-12 col-xxl-6 p-0 m-0 d-flex justify-content-center align-items-center">
                <div className={`${Boolean(accountValues['is_two_fact']) ? "" : styles.qr_image} my-3`}>
                        <img src="qr_code.png" alt="" className={`${styles.qr_code}`}/>
                </div>
            </fieldset>
            <fieldset className="col-12 col-xxl-6 p-0 m-0 d-flex justify-content-center align-items-center">
            <div className="row ">
                <GenerateInputFields/>
            </div>
            </fieldset>
        </>
    );
}


export default SecurityTab;
