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
    handleChange ?: (e : ChangeEvent<HTMLInputElement>, i : number) => void
}

class   SubmitButton extends Component {
    
    inputValues : {} = {
        "username" : "",
        "tournament_name" : "",
        "start_date" : "",
        "start_time" : "",
        "tournament_image" : "",
        "game_difficulty" : "1"
    };

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }

    update() {
        let   i : number = 0;
        for (let [key, value] of Object.entries(this.inputValues)) {
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
            console.log(data);
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
                    onChange={handleChange}
                />
            </div>
        </div>
        </>
    )
}

function    GetImageInput({handleChange} : Props) {
    return (
        <>
        <div className={`p-2 mt-2 row justify-content-center`}>
            <label
                className={`col-9 ${styles.inputTitle} itim-font mb-2 p-0`}
                htmlFor="imageInput">Tournament Image
            </label>
            <label
                className={`col-9 itim-font text-end ${styles.input} ${styles.imageFile}`}
                htmlFor="imageInput">.jpg
            </label>
            
            <div className={`${styles.inputHolder} row justify-content-center p-0 m-2`}>
                <input
                    type="file"
                    placeholder="upload an image"
                    className={`imageInput`}
                    id="imageInput"
                    onChange={handleChange}
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
        <form className={`${styles.formWrapper} row justify-content-center p-0 m-0 mt-2`}>

            <fieldset className={`row justify-content-center p-0 m-0`}>
                    <div className="row">
                        <div className="col text-center p-4 mt-2">
                            <legend className={`valo-font text-nowrap ${styles.formTitle}`}>CREATE TOURNAMENT</legend>
                        </div>
                    </div>
                    <div className="row justify-content-center">

                    <GetInput
                        className="p-2 mt-2 row justify-content-center"
                        inputClassName=""
                        inputType="text"
                        inputId="Username"
                        labelText="Username"
                        handleChange={(e : ChangeEvent<HTMLInputElement>) => changeValue(e, 0)}>
                    </GetInput>
                    <GetInput
                        className="p-2 mt-2 row justify-content-center"
                        inputClassName=""
                        inputType="text"
                        inputId="Tournament_name"
                        labelText="Tournament name"
                        handleChange={(e : ChangeEvent<HTMLInputElement>) => changeValue(e, 1)}>
                    </GetInput>
                    <GetInput
                        className="p-2 mt-2 row justify-content-center"
                        inputClassName=""
                        inputType="date"
                        inputId="start_date"
                        labelText="Start date"
                        handleChange={(e : ChangeEvent<HTMLInputElement>) => changeValue(e, 2)}>
                    </GetInput>
                    <GetInput
                        className="p-2 mt-2 row justify-content-center"
                        inputClassName=""
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