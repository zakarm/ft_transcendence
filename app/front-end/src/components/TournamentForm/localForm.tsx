'use client'

import { useState, ChangeEvent, FormEvent } from 'react';
import styles from './localForm.module.css'
import { notificationStyle } from '../ToastProvider';
import { toast } from 'react-toastify'

interface   localPlayersProps {
    [key : string] : string;
}

interface   getInputProps {
    type                : string;
    id                  : string;
    label               : string;
    updatePlayersList   : (key : string, val : string) => void;
    inputClassName      ?: string;
    labelClassName      ?: string;
    inputLength         ?: number;
}


function    InputRange({ id, updatePlayersList } : {id : string, updatePlayersList : (key : string, val : string) => void}) {

    return (
        <>
        <div className={`  row justify-content-center ${styles.slidecontainer} p-0 mt-2`}>
            <label
                className={`  col-9 itim-font text-left p-1 ${styles.rangeTitle}`}
                htmlFor="myRange">
                    Game Difficulty
            </label>
            <div className={`  col-9 d-flex justify-content-center p-0 my-3 ${styles.rangeTitle}`}>
                <input type="range"
                    min="0"
                    max="2"
                    step="1"
                    className={`  ${styles.slider}`}
                    onChange={ (e : ChangeEvent<HTMLInputElement>) => updatePlayersList(id, e.target.value) }
                    id="myRange"/>
            </div>
            <div className={`  row p-0 mb-2 justify-content-center ${styles.rangeTitle}`}>
                    <div className="col-3">
                        <p className={`  itim-font`}>Easy</p>
                    </div>
                    <div className="col-3 d-flex justify-content-center">
                        <p className={`  itim-font`}>Medium</p>
                    </div>
                    <div className="col-3 d-flex justify-content-end">
                        <p className={`  itim-font`}>Hard</p>
                    </div>
            </div>
        </div>
        </>
    )
}


function    GetInput({
        type, id, label, updatePlayersList, labelClassName, inputClassName, inputLength = 20
    } : getInputProps)
{
    return (
        <>
        <div className={`  row ${styles.input_holder} justify-content-center`}>
            <div className="col-9 my-2 ms-4 d-flex">
                <label htmlFor={id} className={`  ${labelClassName} ${styles.input_title}`}>{ label }</label>
            </div>
            <div className="col-9">
                <input 
                    type        = { type }
                    className   = {`${inputClassName} ${styles.input_text} p-2`}
                    maxLength   = { inputLength }
                    onChange    = { (e : ChangeEvent<HTMLInputElement>) => updatePlayersList(id, e.target.value) }
                    required
                />
            </div>
        </div>
        </>
    )
}

function    LocalTournamentForm() {

    const   [players, setPlayers] = useState<localPlayersProps>({
        "tournament_name"   : "",
        "player_1"          : "",
        "player_2"          : "",
        "player_3"          : "",
        "player_4"          : "",
        "player_5"          : "",
        "player_6"          : "",
        "player_7"          : "",
        "player_8"          : "",
        "difficulty"        : "1"
    });

    const   handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (localStorage.getItem(players['tournament_name']) !== null) {
            toast.error("Tournament name already exists", notificationStyle);
            return ;
        }
        localStorage.setItem(players['tournament_name'], JSON.stringify(players));
        toast.success(`${players['tournament_name']} local tournament created successfully`, notificationStyle);
        console.log(`Saved in Local Storage : "${players['tournament_name']}" ----->`, players)
        console.log('====>', localStorage);``
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key){
                let value = localStorage.getItem(key);
                console.log(`Current tournament in Local Storage: ${key}: ${value}`);
            }
        }
    }

    const   updatePlayersList : (key : string, val : string) => void = (key : string, val : string) => {
        const   newValues = { ...players };
        newValues[key] = val;
        setPlayers(newValues);
    }
    
    const   inputData = [
        {
            type    : "text",
            id      : "tournament_name",
            label   : "Tournament name",
        },
        {
            type    : "text",
            id      : "player_1",
            label   : "player 1",
        },
        {
            type    : "text",
            id      : "player_2",
            label   : "player 2",
        },
        {
            type    : "text",
            id      : "player_3",
            label   : "player 3",
        },
        {
            type    : "text",
            id      : "player_4",
            label   : "player 4",
        },
        {
            type    : "text",
            id      : "player_5",
            label   : "player 5",
        },
        {
            type    : "text",
            id      : "player_6",
            label   : "player 6",
        },
        {
            type    : "text",
            id      : "player_7",
            label   : "player 7",
        },
        {
            type    : "text",
            id      : "player_8",
            label   : "player 8",
        },
    ]
    return (
        <form className={`  row p-0 m-4 ${styles.form_container} `} onSubmit={ handleSubmit }>
            <span className={`  col-12 d-flex flex-row justify-content-center my-2 mt-2 `}>
                <h2 className="valo-font align-self-center text-center mt-4">CREATE LOCAL TOURNAMENT</h2>
            </span>
            <fieldset className="row justify-content-center p-0 m-0">

                <div className="col-12 d-flex flex-column align-items-center flex-wrap">
                    <GetInput
                        type = {inputData[0].type}
                        label = { inputData[0].label }
                        id = {inputData[0].id}
                        inputLength={30}
                        labelClassName='itim-font'
                        updatePlayersList={ updatePlayersList }
                    />                    
                </div>

                <div className="col-12 col-xl-6 d-flex flex-column align-items-center flex-wrap">
                    {
                        <>
                        {
                            inputData.slice(1, 5).map((elem) => (
                                <div key={elem.id}>
                                    <GetInput
                                    type = {elem.type}
                                    label = { elem.label }
                                    id = {elem.id}
                                    inputLength={20}
                                    labelClassName='itim-font'
                                    updatePlayersList={ updatePlayersList }
                                    />
                                </div>
                            ))
                        }
                        </>
                    }
                </div>

                <div className="col-12 col-xl-6 d-flex flex-column align-items-center flex-wrap">
                    {
                        <>
                        {
                            inputData.slice(4, 8).map((elem) => (
                                <div key={elem.id}>
                                    <GetInput
                                    type = {elem.type}
                                    label = { elem.label }
                                    id = {elem.id}
                                    inputLength={20}
                                    labelClassName='itim-font'
                                    updatePlayersList={ updatePlayersList }
                                    />
                                </div>
                            ))
                        }
                        </>
                    }
                </div>

                <div className="col-12">
                    <InputRange
                        id = "difficulty"
                        updatePlayersList={ updatePlayersList }
                    ></InputRange>
                </div>

                <div className="col-12 d-flex flex-row justify-content-center">
                    <button
                        className={`  valo-font mb-4 ${styles.create_button}`}
                        type="submit"
                        >
                            CREATE
                    </button>
                </div>

            </fieldset>
        </form>
    )
}

export  { LocalTournamentForm };
