'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './localForm.module.css';
import { notificationStyle } from '../ToastProvider';
import { toast } from 'react-toastify';
import getFormattedDateTime from '@/utils/getFormattedDateTime';
import { LocalTournamentProps } from '@/lib/game/Tournament';

interface getInputProps {
  type: string;
  id: string;
  label: string;
  updatePlayersList: (key: string, val: string) => void;
  inputClassName?: string;
  inputLength?: number;
}

function InputRange({ id, updatePlayersList }: { id: string; updatePlayersList: (key: string, val: string) => void }) {
  return (
    <>
      <div className={`row justify-content-center ${styles.slidecontainer} p-0 m-0`}>
        <div className={`row p-0 m-0 ${styles.rangeTitle}`}>
          <label className={`col itim-font text-left p-1  p-0 m-0`} htmlFor="myRange">
            Ball Speed
          </label>
        </div>
        <div className={`row p-0 m-0 d-flex justify-content-center p-0 m-0 ${styles.rangeTitle}`}>
          <div className="col">
            <input
              type="range"
              min="0"
              max="2"
              step="1"
              className={`${styles.slider}`}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatePlayersList(id, e.target.value)}
              id="myRange"
            />
          </div>
        </div>
        <div className={`row p-0 m-0 justify-content-center ${styles.rangeTitle}`}>
          <div className="col-4 ">
            <p className={`itim-font`}>Slow</p>
          </div>
          <div className="col-4 d-flex justify-content-center">
            <p className={`itim-font`}>Medium</p>
          </div>
          <div className="col-4 d-flex justify-content-end">
            <p className={`itim-font`}>Fast</p>
          </div>
        </div>
      </div>
    </>
  );
}

function GetInput({ type, id, label, updatePlayersList, inputClassName, inputLength = 20 }: getInputProps) {
    return (
        <>
            <div className={`  row ${styles.input_holder} justify-content-center p-0 m-0`}>
                <div className="col-12  p-0 m-0">
                    <label
                        htmlFor={id}
                        className={`itim-font text-left p-0 m-0 ${styles.inputTitle} ${styles.labelClass}`}
                    >
                        {label}
                    </label>
                </div>
                <div className={`col-12 ${styles.input_holder} row justify-content-center p-0 m-1 `}>
                    <input
                        type={type}
                        id={id}
                        className={`${inputClassName} ${styles.input_text} p-3`}
                        maxLength={inputLength}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updatePlayersList(id, e.target.value)}
                        onKeyDown={(e) => { !/[a-zA-Z]/i.test(e.key) && e.preventDefault(); }}
                        required
                    />
                </div>
            </div>
        </>
    );
}

function LocalTournamentForm({ setRerender }: { setRerender: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [players, setPlayers] = useState<LocalTournamentProps>({
    tournament_name: '',
    tournamentImage: '/assets/images/Backgrounds/Ping_Pong_Battle_4.png',
    player_1: '',
    player_2: '',
    player_3: '',
    player_4: '',
    player_5: '',
    player_6: '',
    player_7: '',
    player_8: '',
    difficulty: '1',
    date: '',
    Participants: 8,
    data: {
      quatre_final: {
        match1: {
          user1: { name: '', photoUrl: '/assets/images/gameProfiles/yoru.jpeg', score: 0, status: true },
          user2: { name: '', photoUrl: '/assets/images/gameProfiles/sova.jpeg', score: 0, status: true },
        },
        match2: {
          user1: { name: '', photoUrl: '/assets/images/gameProfiles/raze.jpeg', score: 0, status: true },
          user2: { name: '', photoUrl: '/assets/images/gameProfiles/Phoenix.jpeg', score: 0, status: true },
        },
        match3: {
          user1: { name: '', photoUrl: '/assets/images/gameProfiles/omen.jpeg', score: 0, status: true },
          user2: { name: '', photoUrl: '/assets/images/gameProfiles/harbor.jpeg', score: 0, status: true },
        },
        match4: {
          user1: { name: '', photoUrl: '/assets/images/gameProfiles/cypher.jpeg', score: 0, status: true },
          user2: { name: '', photoUrl: '/assets/images/gameProfiles/chamber.jpeg', score: 0, status: true },
        },
      },
      semi_final: {
        match1: {
          user1: { name: '', photoUrl: '', score: 0, status: true },
          user2: { name: '', photoUrl: '', score: 0, status: true },
        },
        match2: {
          user1: { name: '', photoUrl: '', score: 0, status: true },
          user2: { name: '', photoUrl: '', score: 0, status: true },
        },
      },
      final: {
        match1: {
          user1: { name: '', photoUrl: '', score: 0, status: true },
          user2: { name: '', photoUrl: '', score: 0, status: true },
        },
      },
    },
  });

  const isPlayerNameDuplicate: () => boolean = () => {
    const playersName = Object.entries(players).filter(([key]) => /^player_\d+$/.test(key));

    for (const i in playersName) {
      if (playersName[i]) {
        const [key0, value0] = playersName[i];
        for (const k in playersName) {
          if (playersName[k]) {
            const [key1, value1] = playersName[k];
            if (value1 && value0 && key0 !== key1 && value0 === value1) {
              toast.error(`Duplicate name : ${key0} - ${key1}`);
              return false;
            }
          }
        }
      }
    }
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPlayerNameDuplicate()) {
      return;
    }
    const data = localStorage.getItem('tournaments');
    let tournaments: LocalTournamentProps[] = [];

    if (data) {
      try {
        tournaments = JSON.parse(data);
      } catch (error) {
        toast.error('Error : cannot read tournaments data', notificationStyle);
        return;
      }
    }
    if (tournaments.length >= 5) {
      toast.error('You can only create 5 tournaments', notificationStyle);
      return;
    }
    for (const key in tournaments) {
      if (tournaments[key].tournament_name === players['tournament_name']) {
        toast.error('Tournament name already exists', notificationStyle);
        return;
      }
    }
    players['date'] = getFormattedDateTime();
    tournaments.push(players);
    localStorage.setItem('tournaments', JSON.stringify(tournaments));
    toast.success(`${players['tournament_name']} local tournament created successfully`, notificationStyle);
    setRerender((prev: boolean) => !prev);
  };

  const updatePlayersList: (key: string, val: string) => void = (key: string, val: string) => {
    if ((key.match(/player_\d+/) || key.match(/tournament_name/)) && typeof val === 'string') {
      setPlayers((prevPlayers) => ({
        ...prevPlayers,
        [key]: val,
      }));
    }
  };
  const inputData = [
    {
      type: 'text',
      id: 'tournament_name',
      label: 'Tournament name',
    },
    ...Array.from({ length: 8 }, (_, i) => ({
      type: 'text',
      id: `player_${i + 1}`,
      label: `player ${i + 1}`,
    })),
  ];

  return (
    <form className={`row p-0 m-0 ${styles.formWrapper}`} onSubmit={handleSubmit}>
      <span className={`row justify-content-center m-0 p-0 mt-4 ${styles.formTitle}`}>
        <legend className={`col-12 valo-font align-self-center text-center flex-nowrap`}>
          CREATE LOCAL TOURNAMENT
        </legend>
      </span>
      <fieldset className="row justify-content-center p-0 m-0">
        <div className="col-12 d-flex flex-column align-items-center flex-wrap">
          <div className=" w-100 d-flex justify-content-center">
            <GetInput
              type={inputData[0].type}
              label={inputData[0].label}
              id={inputData[0].id}
              inputLength={30}
              updatePlayersList={updatePlayersList}
            />
          </div>
        </div>

        <div className="row p-0 m-0 flex-column align-items-center flex-wrap">
          <InputRange id="difficulty" updatePlayersList={updatePlayersList}></InputRange>
        </div>

        <div className="col-6 d-flex flex-column align-items-center flex-wrap">
          {
            <>
              {inputData.slice(1, 5).map((elem) => (
                <div key={elem.id} className=" w-100 d-flex justify-content-center">
                  <GetInput
                    type={elem.type}
                    label={elem.label}
                    id={elem.id}
                    inputLength={20}
                    updatePlayersList={updatePlayersList}
                  />
                </div>
              ))}
            </>
          }
        </div>

        <div className="col-6 d-flex flex-column align-items-center flex-wrap">
          {
            <>
              {inputData.slice(5, 9).map((elem) => (
                <div key={elem.id} className=" w-100 d-flex justify-content-center">
                  <GetInput
                    type={elem.type}
                    label={elem.label}
                    id={elem.id}
                    inputLength={20}
                    updatePlayersList={updatePlayersList}
                  />
                </div>
              ))}
            </>
          }
        </div>

        <div className="col-12 d-flex flex-row justify-content-center">
          <button className={`  valo-font my-4 ${styles.create_button}`} type="submit">
            CREATE
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export { LocalTournamentForm };
