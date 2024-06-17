import { FormContext, SettingsProps } from './formContext'
import {
    ChangeEvent,
    MouseEvent,
    useContext,
    useState,
    useEffect
} from 'react'
import styles from '@/app/settings/styles.module.css'
import Cookies from "js-cookie";
import TwoFa from '@/components/twoFa';
interface Props {
    inputType       ?: string;
    placeholder     ?: string | boolean;
    className       ?: string;
    inputClassName  ?: string;
    inputId         ?: string;
    labelText       ?: string;
    labelClass      ?: string;
    value           ?: string | boolean;
    inputLength     ?: number;
    index           ?: number;
    setValues       ?: (e : ChangeEvent<HTMLInputElement>) => void;
}

interface ListInputProps {
    className       ?: string;
    labelText       ?: string;
    id              ?: string;
    opt             ?: string[];
    choosenPosition ?: string;
}

function    GetListInput(
    {
        className="",
        labelText="",
        id="",
        opt=[],
        choosenPosition=""
    } : ListInputProps) {
    
    const   {accountValues, updateField} = useContext<SettingsProps>(FormContext);

    return (
        <>
            <div className={`${className} flex-wrap flex-xl-nowrap mb-4 `}>
            <label
                    className={` col-8 col-sm-3 itim-font d-flex align-items-center p-0 m-0 ${styles.inputTitle} ${styles.labelClass}`} 
                    htmlFor={id}>
                    {labelText}
                </label>

                <div className={`${styles.inputHolder} row p-0 m-1`}>
                    <select 
                        className={`itim-font ${styles.input} ps-4`}
                        name=""
                        id={id}
                        value={ choosenPosition }
                        onChange={ (e : ChangeEvent<HTMLSelectElement>) => { updateField(id, e.target.value); } }>
                        {    
                            opt.map((val) => (
                                <option key={val}
                                    className={`itim-font`}
                                    value={val}>
                                            { val }
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </>
    );
}

function    GetCheckboxInput(
    {
        className="col",
        inputClassName="",
        inputType="text",
        placeholder="",
        inputId="",
        labelText="",
        inputLength,
        index=0,
        labelClass=""
    }: Props) {

    const   { accountValues, updateField } = useContext<SettingsProps>(FormContext);
    const   [isChecked, setIsChecked] = useState<boolean>(false);
    const [twoFaData, setTwoFaData] = useState<{ value: string; email: string } | null>(null);
    
    
    useEffect(() => {
        setIsChecked(Boolean(accountValues[inputId]))
    }, [accountValues[inputId]])

    useEffect(() => {
        const fetchData = async () => {
            if (isChecked) {
                try {
                    const access = Cookies.get('access'); 
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/control-2fa`, {
                        method: 'POST',
                        headers: { Authorization: `Bearer ${access}` },
                    });

                    const data = await response.json();
                    if (response.ok) {
                        const { url, email } = data;
                        setTwoFaData({ value: url, email });
                    }
                } catch (error) {
                    console.error('An unexpected error happened:', error);
                }
            } else {
                setTwoFaData(null);
            }
        };

        fetchData();
    }, [isChecked]);

        return (
            <div className={`${className} flex-wrap flex-xxl-nowrap`}>
                {twoFaData && <TwoFa value={twoFaData.value} email={twoFaData.email} qr={true}/>}
                <label
                    className={`col-8 col-sm-3 itim-font d-flex align-items-center p-0 m-0 ${styles.inputTitle} ${styles.labelClass}`} 
                    htmlFor={inputId}>
                    {labelText}
                </label>
                <div className={`${styles.inputHolder} ${styles.checkbox} row justify-content-start p-0 m-1`}>
                    <label className="col-3">
                        <input
                            type={inputType}
                            className={`${styles.input}`}
                            id={inputId}
                            maxLength={inputLength}
                            autoComplete="off"
                            onChange={ (e : ChangeEvent<HTMLInputElement>) => {
                                setIsChecked(!isChecked);
                                updateField(inputId, !isChecked);
                            } }
                            checked={isChecked}
                            />
                    </label>
                </div>
            </div>
        );
}

function    GetColorInput(
    {
        className="col",
        inputClassName="",
        inputType="text",
        placeholder="",
        inputId="",
        labelText="",
        inputLength,
        index=0,
        labelClass="",
        value=""
    }: Props) {

    const   { updateField } = useContext<SettingsProps>(FormContext);
    const   [colorToPreview, setcolorToPreview] = useState<string>("")

    // usestate to pass chosen color to 'onClick' of button
    return (
        <div className={`${className} flex-wrap flex-xxl-nowrap `}>
            <label
                className={` col-8 col-sm-3 itim-font d-flex align-items-center p-0 m-0 ${styles.inputTitle} ${styles.labelClass}`} 
                htmlFor={inputId}>
                {labelText}
            </label>
            <div className={`${styles.inputHolder} row p-0 m-1 align-items-center justify-content-center`}>
                <div className={`col-4`}>
                    <input
                        type={inputType}
                        value={value as string}
                        className={`${styles.inputColor} ${inputClassName} `}
                        id={inputId}
                        maxLength={inputLength}
                        autoComplete="off"
                        onChange={ (e : ChangeEvent<HTMLInputElement>) => {
                            setcolorToPreview(e.target.value);
                            value =  e.target.value
                        } }
                        />
                </div>
                <div className="col-4">
                    <button
                        type="button"
                        className={`${styles.previewButton} ${inputClassName} `}
                        onClick={ (e : MouseEvent<HTMLButtonElement>) => {
                            colorToPreview && updateField(inputId, colorToPreview)
                        } }
                        >Preview</button>
                </div>
                <div className="col-4">
                    <button 
                        type="button"
                        className={`${styles.previewButton} ${inputClassName} `}
                        onClick={ (e : MouseEvent<HTMLButtonElement>) => {
                            colorToPreview && updateField(inputId, (Cookies.get(inputId) as string))
                        } }
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}

function    GetInputRange({className} : Props) {
    const   { updateField, accountValues } = useContext<SettingsProps>(FormContext);


    return (
        <>
        <div className={` p-0 m-0 mt-4 row justify-content-center itim-font  flex-wrap flex-xxl-nowrap`}>
            <label
                className={`col-8 col-sm-3 itim-font d-flex align-items-center  p-0 m-0 ${styles.inputTitle} `}
                htmlFor="myRange">
                    Game Difficulty
            </label>
            <div className={`${styles.inputHolder} row p-0 m-1 align-items-center justify-content-center`}>

            <div className=" col d-flex justify-content-center p-0 my-3 ms-1">
                <input type="range"
                    min="0"
                    max="2"
                    step="1"
                    value={ accountValues['game_difficulty'] as string }
                    className={`${styles.slider}`}
                    onChange={(e : ChangeEvent<HTMLInputElement> ) => {
                            updateField("game_difficulty", e.target.value);
                        }
                    }
                    id="myRange"/>
            </div>
            </div>
        </div>
        <div className={` p-0 m-0 row justify-content-center itim-font  flex-wrap flex-xxl-nowrap`}>
        <label
                className={`col-8 col-sm-3 itim-font d-flex align-items-center  p-0 m-0 ${styles.inputTitle} `}
                htmlFor="myRange">
            </label>
        <div className={`row  p-0 m-0 justify-content-center ${styles.rangeTitle}`}>
                    <div className="col-4 ">
                        <p className={`itim-font`}>Easy</p>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <p className={`itim-font`}>Medium</p>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        <p className={`itim-font`}>Hard</p>
                    </div>
            </div>
            </div>
        </>
    )
}


function    GetInput(
    {
        className="col",
        inputClassName="",
        inputType="text",
        placeholder="",
        inputId="",
        labelText="",
        inputLength,
        index=0,
        labelClass=""
    }: Props) {

    const   { updateField } = useContext<SettingsProps>(FormContext);

        return (
            <div className={`${className} flex-wrap flex-xxl-nowrap`}>
                <label
                    className={`col-8 col-sm-3 itim-font d-flex align-items-center p-0 m-0 ${styles.inputTitle} ${styles.labelClass}`} 
                    htmlFor={inputId}>
                    {labelText}
                </label>
                <div className={`${styles.inputHolder} row p-0 m-1`}>
                        <input
                            type={inputType}
                            placeholder={placeholder as string}
                            className={`${styles.input} ${inputClassName} ps-4`}
                            id={inputId}
                            maxLength={inputLength}
                            autoComplete="off"
                            onChange={ (e : ChangeEvent<HTMLInputElement>) => { updateField(inputId, e.target.value) } }
                            >
                        </input>
                </div>
            </div>
        );
}



export type { Props as Props }
export { GetCheckboxInput, GetInput, GetListInput, GetColorInput, GetInputRange }