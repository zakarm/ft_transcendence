'use client'

import styles from './styles.module.css'
import React, { Component, ChangeEvent } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { notificationStyle } from '../ToastProvider';
import handleImageUpload from '../UploadImageBase64ToCloudinary/uploadToCloudinary';

interface InputEventProps {
    e : ChangeEvent<HTMLInputElement>;
  }

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
    handleChange ?: (e : InputEventProps | string, i : number) => void;
}

interface InputValuesProps {
    [key: string]: string;
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
        
        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (handleChange) {
              handleChange({ e }, index!); // Wrapping the event in an object
            }
          };

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
                    onChange={handleInputChange}
                    required
                />
            </div>
        </div>
        </>
    )
}

function    GetImageInput({ handleChange = () => {}, index = 0 } : Props) {
    const [imageName, setImageName] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const   reader = new FileReader();
        const   files : FileList | null = e.target.files

        setImageName(e.target.value); // used to display name of uploaded image
        if (files && files.length > 0) {
            reader.readAsDataURL(files[0]);
            reader.onloadend = async () => {
                if (reader.result && typeof reader.result === 'string') {
                    if (handleChange)
                        handleChange(reader.result, index);
                }
            }
        }
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
                        <div className={`${styles.imageText} text-nowrap ms-2`}>{imageName.split('\\').pop()}</div>
                        <div><img src="../../../imageUpload.png" height="15px"/></div>
                </label>
                <input
                    type="file"
                    accept="image/*"
                    placeholder="upload an image"
                    className={`imageInput`}
                    id="imageInput"
                    onChange={(e : ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                />
            </div>
        </div>
        </>
    )
}

function    InputRange({handleChange = () => {}, index=0} : Props) {
    
    const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange({ e }, index);
      };
    
    return (
        <>
        <div className={`row justify-content-center ${styles.slidecontainer} p-0 mt-2`}>
            <label
                className={`col-9 itim-font text-left p-1 ${styles.inputTitle}`}
                htmlFor="myRange">
                    Game Difficulty
            </label>
            <div className={`col-9 d-flex justify-content-center p-0 my-3 ${styles.inputTitle}`}>
                <input type="range"
                    min="0"
                    max="2"
                    step="1"
                    className={`${styles.slider}`}
                    onChange={handleRangeChange}
                    id="myRange"/>
            </div>
            <div className={`row justify-content-between p-0 mb-2 ${styles.inputTitle}`}>
                    <div className="col">
                        <p className={`itim-font`}>Easy</p>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <p className={`itim-font`}>Medium</p>
                    </div>
                    <div className="col d-flex justify-content-end">
                        <p className={`itim-font`}>Hard</p>
                    </div>
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
            handleChange={(e : InputEventProps | string) => handleChange(e, 0)}>
        </GetInput>
        <GetInput
            className="p-2 mt-2 row justify-content-center"
            inputType="text"
            inputId="Tournament_name"
            labelText="Tournament name"
            inputLength={30}
            index={1}
            handleChange={(e : InputEventProps | string) => handleChange(e, 1)}>
        </GetInput>
        <GetImageInput
            handleChange={(e : InputEventProps | string) => handleChange(e, 4)}
            index={4}>
        </GetImageInput>
        <InputRange
            handleChange={(e : InputEventProps | string) => handleChange(e, 5)}
            index={5}>
        </InputRange>
        </>
    )
}

function RemoteTournamentForm() {
    const   [currentValues, setCurrentValues] = useState<string[]>(["", "", "", "", "", ""]);

    let ValuesToPost : InputValuesProps = {
        "username" : "", //
        "tournament_name" : "",
        "tournament_start" : "",
        "start_time" : "", //
        "tournament_image" : "", //
        "game_difficulty" : "1"
    };

    const handleChange = (e : InputEventProps | string, i : number) => {
        const   newValues = [...currentValues];

        typeof e === 'string' ? newValues[i] = e : newValues[i] = e.e.target.value;
        setCurrentValues(newValues);
    }

    const formValidation : () => Promise<boolean> = async () => {
        let   i : number = 0;
        let   isChanged : boolean = false;
        for (let [key, value] of Object.entries(ValuesToPost)) {
            if (currentValues[i] && currentValues[i] !== '' && currentValues[i] !== ValuesToPost[key]) {
                if (key === 'tournament_image') {
                    const   imageURL : string | null = await handleImageUpload(currentValues[i]);
                    (imageURL !== null) ? currentValues[i] = imageURL : toast.error("Error : cannot upload image");
                }
                ValuesToPost[key] = currentValues[i];
                isChanged = true;
            }
            i++;
        }
        return isChanged;
    }

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const   isValid : boolean = await formValidation();
        if (!isValid)
            return ;

        console.log(JSON.stringify(ValuesToPost))
        try {
            // const response = await fetch('', {
            //     method : "POST",
            //     headers : {"content-type" : "application/json"},
            //     body : JSON.stringify(ValuesToPost)
            // });
            // if (response.ok){
                toast.success("To be saved...", notificationStyle);
                // let data =  await response.json()
            // }
        } catch (error) {
            console.error('Error : ', error);
        }
    }

    return (
        <>
        <form
            className={`${styles.formWrapper} row justify-content-center p-0 m-0`}
            onSubmit={(e : React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>

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
            <div className="row p-0 my-2">
                <div className="col d-flex justify-content-center">
                        <button
                            className={`valo-font mb-3 ${styles.create_button}`}>
                                CREATE
                        </button>
                </div>
            </div>
        </form>
        </>
    )
}

export  { RemoteTournamentForm, InputRange };