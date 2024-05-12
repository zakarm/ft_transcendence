import { FormContext } from '../form-components/formContext'
import { ChangeEvent, useContext, useState, useEffect } from 'react'
import styles from '../styles.module.css'

interface Props {
    inputType ?: string;
    placeholder ?: string;
    className ?: string;
    inputClassName ?: string;
    inputId ?:string;
    labelText ?:string;
    labelClass ?: string;
    inputLength ?: number;
    index ?: number;
    setValues ?: (e : ChangeEvent<HTMLInputElement>) => void;
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

    const   { accountValues, updateField } = useContext(FormContext);
    const   [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
        console.log('accountValues[inputId] :' , accountValues[inputId] , "Boolean(accountValues[inputId])", Boolean(accountValues[inputId]))
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

    const   { updateField } = useContext(FormContext);

        return (
            <div className={`${className} flex-wrap flex-xxl-nowrap `}>
                <label
                    className={`col-8 col-sm-3 itim-font d-flex align-items-center p-0 m-0 ${styles.inputTitle} ${styles.labelClass}`} 
                    htmlFor={inputId}>
                    {labelText}
                </label>
                <div className={`${styles.inputHolder} row p-0 m-1`}>
                        <input
                            type={inputType}
                            placeholder={placeholder}
                            className={`${styles.input} ${inputClassName} ps-4`}
                            id={inputId}
                            maxLength={inputLength}
                            autoComplete="off"
                            onChange={ (e : ChangeEvent<HTMLInputElement>) => { updateField(inputId, e.target.value) } }
                            />
                </div>
            </div>
        );
}

export type { Props as Props }
export { GetCheckboxInput, GetInput }