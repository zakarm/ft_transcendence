import styles from '@/app/settings/styles.module.css'
import { ChangeEvent, useContext } from 'react'
import { FormContext, SettingsProps } from '../form-components/formContext'
import { GetInput, GetColorInput, GetListInput,Props } from '../form-components/input'

function    GenerateInputFields() {
    const   { valuesToPost } = useContext<SettingsProps>(FormContext);

    const   inputProps = [
        {
            inputId: "table_color",
            labelText: "Table Color",
            value : valuesToPost['table_color']
        },
        {
            inputId: "ball_color",
            labelText: "Ball Color",
            value : valuesToPost['ball_color']
        },
        {
            inputId: "paddle_color",
            labelText: "Paddle Color",
            value : valuesToPost['paddle_color']
        },
        {
            inputId: "table_position",
            labelText: "Table Position",
            opt : ["parallel", "prespective"]
        },
    ]

    return (
        <>
            {
                inputProps.slice(0,3).map(({className, inputType, inputId, labelText, placeholder, inputLength, value} : Props) => {
                    return (  
                        <div key={inputId}>
                            <GetColorInput
                                className="p-0 m-0 mt-4 row justify-content-center itim-font"
                                inputType="color"
                                inputId={ inputId }
                                labelText={ labelText }
                                value={ value as string }>
                            </GetColorInput>
                        </div>
                    )
                })
            }
            <div key={inputProps[3].inputId}>
                <GetListInput
                    className="p-0 m-0 mt-4 row justify-content-center itim-font"
                    labelText = { inputProps[3].labelText }
                    id = { inputProps[3].inputId }
                    opt = { inputProps[3].opt }
                    choosenPosition = { (valuesToPost['table_position'] as string) }
                >
                </GetListInput>
            </div>
        </>
    )
}

function    GameTab() {
    const   { accountValues } = useContext<SettingsProps>(FormContext);

    return (
        <>
            <fieldset className="col-12 col-xxl-6 p-0 m-0 d-flex justify-content-center align-items-center">
                <div className={`my-3`}>
                        <img src="back.png" alt="" className={`${styles.qr_code}`}/>
                </div>
            </fieldset>
            <fieldset className="col-12 col-xxl-6 p-0 m-0 d-flex justify-content-center align-items-center">
            <div className="row m-0 p-0">
                <GenerateInputFields/>
            </div>
            </fieldset>
        </>
    );
}


export default GameTab;
