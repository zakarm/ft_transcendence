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
    labelText ?:string,
    labelClass ?: string,
    inputLength ?: string,
    handleChange ?: (e : ChangeEvent<HTMLInputElement>, i : number) => void
}
interface InputValuesProps {
    [key: string]: string;
}

interface SubmitButtonProps {
    props: string[];
}

class   SubmitButton extends Component<SubmitButtonProps> {
    
    inputValues : InputValuesProps = {
        "username" : "", //
        "tournament_name" : "",
        "tournament_start" : "",
        "start_time" : "", //
        "tournament_image" : "", //
        "game_difficulty" : "1"
    };

    constructor(props : SubmitButtonProps) {
        super(props);
        this.inputValues["game_difficulty"] = "1";
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }

    update() {
        let   i : number = 0;
        for (let [key, value] of Object.entries(this.inputValues)) {
            if (this.props.props[i] && this.props.props[i] !== '')
                this.inputValues[key] = this.props.props[i];
            i++;
        }
    }

    async handleSubmit(e : React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        this.update()
        
        console.log(JSON.stringify(this.inputValues))
        try {
            const response = await fetch('', {
                method : "POST",
                headers : {"content-type" : "application/json"},
                body : JSON.stringify(this.inputValues)
            });

            // const contentType = response.headers.get('content-type');
            // if (!contentType || !contentType.includes('application/json')) {
            //     throw new Error('Response is not JSON');
            // }

            let data =  await response.json()
            // console.log(data);
        } catch (error) {
            // console.error('Error : ', error);
        }
    }

    render() {
        return (
            <>
            <div className="row p-0 my-4">
                <div className="col d-flex justify-content-center">
                    <button
                        className={`valo-font col-6 col-md-4 ${styles.create_button}`}
                        onClick={this.handleSubmit}>
                            CREATE
                    </button>
                </div>
            </div>
            </>
        );
    }
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
        inputLength="",
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
                    onChange={handleChange}
                />
            </div>
        </div>
        </>
    )
}

function    GetImageInput({handleChange} : Props) {
    const [val, setVal] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setVal(e.target.value);
        handleChange(e, 4);
        // console.log(val)
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

function    InputRange({handleChange} : Props) {
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
                    onChange={handleChange}
                    id="myRange"/>
            </div>
        </div>
        </>
    )
}

function CreateTournament() {
    const   [values, setValue] = useState<string[]>(["", "", "", "", "", ""]);

    const changeValue = (e : ChangeEvent<HTMLInputElement>, i : number) => {
        const   newValues = [...values];
        newValues[i] = e.target.value;
        setValue(newValues);
    }

    return (
        <>
        <form className={`${styles.formWrapper} row justify-content-center p-0 m-0`}>

            <fieldset className={`row justify-content-center p-0 m-0`}>
                    <div className="row">
                        <div className="col text-center p-4 mt-2">
                            <legend className={`valo-font text ${styles.formTitle}`}>CREATE TOURNAMENT</legend>
                        </div>
                    </div>
                    <div className="row justify-content-center">

                    <GetInput
                        className="p-2 mt-2 row justify-content-center"
                        inputType="text"
                        inputId="Username"
                        labelText="Username"
                        inputLength="20"
                        handleChange={(e : ChangeEvent<HTMLInputElement>) => changeValue(e, 0)}>
                    </GetInput>
                    <GetInput
                        className="p-2 mt-2 row justify-content-center"
                        inputType="text"
                        inputId="Tournament_name"
                        labelText="Tournament name"
                        inputLength="30"
                        handleChange={(e : ChangeEvent<HTMLInputElement>) => changeValue(e, 1)}>
                    </GetInput>
                    <GetInput
                        className="p-2 mt-2 row justify-content-center"
                        inputType="date"
                        inputId="start_date"
                        labelText="Start date"
                        handleChange={(e : ChangeEvent<HTMLInputElement>) => changeValue(e, 2)}>
                    </GetInput>
                    <GetInput
                        className="p-2 mt-2 row justify-content-center"
                        inputType="time"
                        inputId="start_time"
                        labelText="Start time"
                        handleChange={(e : ChangeEvent<HTMLInputElement>) => changeValue(e, 3)}>
                    </GetInput>
                    <GetImageInput handleChange={(e : ChangeEvent<HTMLInputElement>) => changeValue(e, 4)}></GetImageInput>
                </div>
                <InputRange handleChange={(e : ChangeEvent<HTMLInputElement>) => changeValue(e, 5)}></InputRange>
            </fieldset>
            <SubmitButton props={values}></SubmitButton>
        </form>
        </>
    )
}

export default  CreateTournament;