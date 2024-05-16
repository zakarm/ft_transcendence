import { FormContext, SettingsProps } from './formContext'
import { ChangeEvent, useContext, useState, useEffect } from 'react'
import styles from '@/app/settings/styles.module.css'

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
    className   ?: string;
    labelText   ?: string;
    id          ?: string;
    opt         ?: string[];
    choosenPosition     ?: string;
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

    useEffect(() => {
        // console.log('accountValues[inputId] :' , accountValues[inputId] , "Boolean(accountValues[inputId])", Boolean(accountValues[inputId]))
        setIsChecked(Boolean(accountValues[inputId]))
    }, [accountValues[inputId]])

        return (
            <div className={`${className} flex-wrap flex-xxl-nowrap`}>
                <label
                    className={`col-8 col-sm-3 itim-font d-flex align-items-center p-0 m-0 ${styles.inputTitle} ${styles.labelClass}`} 
                    htmlFor={inputId}>
                    {labelText}
                </label>
                <div className={`${styles.inputHolder} row justify-content-start p-0 m-1`}>
                    <label className="col-3">
                        <input
                            type={inputType}
                            // placeholder={placeholder}
                            className={`${styles.input}`}
                            id={inputId}
                            maxLength={inputLength}
                            autoComplete="off"
                            onChange={ (e : ChangeEvent<HTMLInputElement>) => {
                                setIsChecked(!isChecked)
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

        return (
            <div className={`${className} flex-wrap flex-xxl-nowrap `}>
                <label
                    className={` col-8 col-sm-3 itim-font d-flex align-items-center p-0 m-0 ${styles.inputTitle} ${styles.labelClass}`} 
                    htmlFor={inputId}>
                    {labelText}
                </label>
                <div className={`${styles.inputHolder} row p-0 m-1`}>
                        <input
                            type={inputType}
                            value={value as string}
                            className={`${styles.inputColor} ${inputClassName} `}
                            id={inputId}
                            maxLength={inputLength}
                            autoComplete="off"
                            onChange={ (e : ChangeEvent<HTMLInputElement>) => { updateField(inputId, e.target.value) } }
                            />
                </div>
            </div>
        );
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
            <div className={`${className} flex-wrap flex-xxl-nowrap `}>
                <label
                    className={` col-8 col-sm-3 itim-font d-flex align-items-center p-0 m-0 ${styles.inputTitle} ${styles.labelClass}`} 
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
                            onChange={ (e : ChangeEvent<HTMLInputElement>) => { console.log(inputId), updateField(inputId, e.target.value) } }
                            />
                </div>
            </div>
        );
}

export type { Props as Props }
export { GetCheckboxInput, GetInput, GetListInput, GetColorInput }