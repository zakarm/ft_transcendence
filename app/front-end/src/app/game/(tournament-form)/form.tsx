'use client'

import styles from './styles.module.css'
import React, { Component, ChangeEvent } from 'react';
import { useState } from 'react';


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
interface InputValuesProps {
    [key: string]: string;
}

interface SubmitButtonProps {
    props: string[];
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
        <div className={`${className}`}>
            <label
                className={`col-9 itim-font text-left p-0 m-0 ${styles.inputTitle} ${styles.labelClass}`} 
                htmlFor={inputId}>
                    {labelText}
            </label>
            <div className={`col-9 ${styles.inputHolder} row justify-content-center p-0 m-2`}>
                <input
                    type={inputType}
                    placeholder={placeholder}
                    className={`${styles.input} ${inputClassName} ps-4`}
                    id={inputId}
                    maxLength={inputLength}
                    onChange={(e) => {if (handleChange) {handleChange(e, index)}}}
                />
            </div>
        </div>
        </>
    )
}

function    GetImageInput({handleChange = () => {}, index=0} : Props) {
    const [val, setVal] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setVal(e.target.value);
        if (handleChange)
            handleChange(e, index);
    };

    return (
        <>
        <div className={`p-2 mt-2 row justify-content-center`}>
            <label
                className={`col-9 ${styles.inputTitle} itim-font mb-2 p-0`}
                htmlFor="imageInput">Tournament Image
            </label>
            <div className={`${styles.inputHolder} row justify-content-center p-0 m-2`}>
                <label
                    className={`col-9 itim-font text-end d-flex justify-content-between ${styles.input} ${styles.imageFile}`}
                    htmlFor="imageInput">
                        <div className={`${styles.imageText} text-nowrap ms-2`}>{val.split('\\').pop()}</div>
                        <div><img src="imageUpload.png" height="15px"/></div>
                </label>
                <input
                    type="file"
                    placeholder="upload an image"
                    className={`imageInput`}
                    id="imageInput"
                    onChange={handleInputChange}
                />
            </div>
        </div>
        </>
    )
}

function    InputRange({handleChange = () => {}, index=0} : Props) {
    return (
        <>
        <div className={`row justify-content-center ${styles.slidecontainer} p-0 mt-2`}>
            <label
                className={`col-9 itim-font text-left p-1 ms-4 ${styles.inputTitle}`}
                htmlFor="myRange">
                    Game Difficulty
            </label>
            <div className="col-9 d-flex justify-content-center p-0 my-3">
                <input type="range"
                    min="0"
                    max="2"
                    step="1"
                    className={`${styles.slider}`}
                    onChange={(e) => handleChange(e, index)}
                    id="myRange"/>
            </div>
        </div>
        </>
    )
}

function RenderInputFields({ handleChange=()=>{} } : Props) {
    return (
        <>
         <GetInput
            className="p-2 mt-2 row justify-content-center"
            inputType="text"
            inputId="Username"
            labelText="Username"
            inputLength={20}
            index={0}
            handleChange={(e : ChangeEvent<HTMLInputElement>) => handleChange(e, 0)}>
        </GetInput>
        <GetInput
            className="p-2 mt-2 row justify-content-center"
            inputType="text"
            inputId="Tournament_name"
            labelText="Tournament name"
            inputLength={30}
            index={1}
            handleChange={(e : ChangeEvent<HTMLInputElement>) => handleChange(e, 1)}>
        </GetInput>
        <GetInput
            className="p-2 mt-2 row justify-content-center"
            inputType="date"
            inputId="start_date"
            labelText="Start date"
            index={2}
            handleChange={(e : ChangeEvent<HTMLInputElement>) => handleChange(e, 2)}>
        </GetInput>
        <GetInput
            className="p-2 mt-2 row justify-content-center"
            inputType="time"
            inputId="start_time"
            labelText="Start time"
            index={3}
            handleChange={(e : ChangeEvent<HTMLInputElement>) => handleChange(e, 3)}>
        </GetInput>
        <GetImageInput
            handleChange={(e : ChangeEvent<HTMLInputElement>) => handleChange(e, 4)}
            index={4}>
        </GetImageInput>
        <InputRange
            handleChange={(e : ChangeEvent<HTMLInputElement>) => handleChange(e, 5)}
            index={5}>
        </InputRange>
        </>
    )
}

function CreateTournament() {
    const   [values, setValue] = useState<string[]>(["", "", "", "", "", ""]);

    let inputValues : InputValuesProps = {
        "username" : "", //
        "tournament_name" : "",
        "tournament_start" : "",
        "start_time" : "", //
        "tournament_image" : "", //
        "game_difficulty" : "1"
    };
    const handleChange = (e : ChangeEvent<HTMLInputElement>, i : number) => {
        const   newValues = [...values];
        newValues[i] = e.target.value;
        setValue(newValues);
    }

    const update = () => {
        let   i : number = 0;
        for (let [key, value] of Object.entries(inputValues)) {
            if (values[i] && values[i] !== '')
                inputValues[key] = values[i];
            i++;
        }
    }

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        update();
        
        console.log(JSON.stringify(inputValues))
        try {
            const response = await fetch('', {
                method : "POST",
                headers : {"content-type" : "application/json"},
                body : JSON.stringify(inputValues)
            });
            let data =  await response.json()
        } catch (error) {
            console.error('Error : ', error);
        }
    }

    return (
        <>
        <form className={`${styles.formWrapper} row justify-content-center p-0 m-0`} onSubmit={(e) => handleSubmit(e)}>

            <fieldset className={`row justify-content-center p-0 m-0`}>
                    <div className="row">
                        <div className="col text-center p-4 mt-2">
                            <legend className={`valo-font text ${styles.formTitle}`}>CREATE TOURNAMENT</legend>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <RenderInputFields handleChange={handleChange}></RenderInputFields>
                    </div>
            </fieldset>
            <div className="row p-0 my-4">
                <div className="col d-flex justify-content-center">
                        <button
                            className={`valo-font col-6 col-md-4 ${styles.create_button}`}>
                                CREATE
                        </button>
                </div>
            </div>
        </form>
        </>
    )
}

export default  CreateTournament;