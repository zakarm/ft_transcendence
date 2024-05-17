import styles from "@/app/settings/styles.module.css";
import React, { useState } from "react";
import { MouseEvent, useContext, useEffect } from "react";
import { FormContext, SettingsProps } from "../form-components/formContext";
import {
  GetInput,
  GetColorInput,
  GetListInput,
  Props,
} from "../form-components/input";
import GameContainer from "@/components/PongGame/GameContainer";
import Cookies from "js-cookie";

const convertHexColor = (hex: string): number => {
  const cleanedHex = hex.replace("#", "");
  return parseInt(cleanedHex, 16);
};

function GenerateInputFields() {
  const { updateField, valuesToPost } = useContext<SettingsProps>(FormContext);

  const inputProps = [
    {
      inputId: "table_color",
      labelText: "Table Color",
      value: valuesToPost["table_color"],
    },
    {
      inputId: "ball_color",
      labelText: "Ball Color",
      value: valuesToPost["ball_color"],
    },
    {
      inputId: "paddle_color",
      labelText: "Paddle Color",
      value: valuesToPost["paddle_color"],
    },
    {
      inputId: "table_position",
      labelText: "Table Position",
      opt: ["default", "horizantal", "vertical"],
    },
  ];

  return (
    <>
      {inputProps
        .slice(0, 3)
        .map(
          ({
            className,
            inputType,
            inputId,
            labelText,
            placeholder,
            inputLength,
            value,
          }: Props) => {
            return (
              <div key={inputId}>
                <GetColorInput
                  className="p-0 m-0 mt-4 row justify-content-center itim-font"
                  inputType="color"
                  inputId={inputId}
                  labelText={labelText}
                  value={value as string}
                ></GetColorInput>
              </div>
            );
          }
        )}

      <div key={inputProps[3].inputId}>
        <GetListInput
          className="p-0 m-0 mt-4 row justify-content-center itim-font"
          labelText={inputProps[3].labelText}
          id={inputProps[3].inputId}
          opt={inputProps[3].opt}
          choosenPosition={valuesToPost["table_position"] as string}
          >
        </GetListInput>
      </div>


        <div className="row p-0 m-0 justify-content-center align-items-center flex-end">
          <div className="col-5">
            <button
                type="button"
                className={`${styles.previewButton} p-0 m-0 my-4 row justify-content-center align-items-center itim-font`}
                onClick={ (e : MouseEvent<HTMLButtonElement>) => {
                  updateField(inputProps[0].inputId,
                    (Cookies.get("theme_table_color") as string) ?? "#161625");
                  updateField(inputProps[1].inputId,
                    (Cookies.get("theme_ball_color") as string) ?? "#ffffff");
                  updateField(inputProps[2].inputId,
                    (Cookies.get("theme_paddle_color") as string) ?? "#ff4655");
                } }
                >
                  Website Colors
            </button>
          </div>
          <div className="col-5">
            <button
                type="button"
                className={`${styles.previewButton} p-0 m-0 my-4 row justify-content-center align-items-center itim-font`}
                onClick={ (e : MouseEvent<HTMLButtonElement>) => {
                  updateField(inputProps[0].inputId, (Cookies.get(inputProps[0].inputId) as string) ?? "");
                  updateField(inputProps[1].inputId, (Cookies.get(inputProps[1].inputId) as string) ?? "");
                  updateField(inputProps[2].inputId, (Cookies.get(inputProps[2].inputId) as string) ?? "");
                } }
                >
                  Your Colors
            </button>
          </div>
        </div>

    </>
  );
}

function GameTab() {

  const { updateField, accountValues } = useContext<SettingsProps>(FormContext);

  const [paddleColor, setPaddleColor] = useState<string>((accountValues['paddleColor'] as string) ?? "");
  const [tableColor, setTableColor] = useState<string>((accountValues['tableColor'] as string) ?? "");
  const [ballColor, setBallColor] = useState<string>((accountValues['ballColor'] as string) ?? "");

  useEffect(() =>{
    setTableColor((accountValues['table_color'] as string));
  }, [accountValues['table_color'],])

    useEffect(() =>{
      setBallColor((accountValues['ball_color'] as string));
    }, [accountValues['ball_color'],])

    useEffect(() =>{
      setPaddleColor((accountValues['paddle_color'] as string));
    }, [accountValues['paddle_color'],])

        useEffect(() => {
          const pos = accountValues["table_position"] as string;
          const view =
            pos === "default"
              ? "pos_default"
              : pos === "horizantal"
              ? "pos_horizantal"
              : "pos_vertical";
          const pos_v = Cookies.get(view) as string;
          console.log("pos_values", pos_v);
          updateField("current_table_view", pos_v);
        }, [accountValues["table_position"]]);
  return (
    <>
      <fieldset className="col-12 col-xxl-6 p-0 m-0 d-flex justify-content-center align-items-center">
        <div
          className="col-11 p-0 m-0 d-flex justify-content-center align-items-center"
          style={{ width: "80%", height: "500px" }}
        >
          <GameContainer
            TableColor={convertHexColor(tableColor)}
            BallColor={convertHexColor(ballColor)}
            paddleColor={convertHexColor(paddleColor)}
            Gameposition_x={parseInt((accountValues["current_table_view"] as string).split(",")[0])}
            Gameposition_y={parseInt((accountValues["current_table_view"] as string).split(",")[1])}
            Gameposition_z={parseInt((accountValues["current_table_view"] as string).split(",")[2])}
          />
        </div>
      </fieldset>
      <fieldset className="col-12 col-xxl-6 p-0 m-0 d-flex justify-content-center align-items-center">
        <div className="row m-0 p-0">
          <GenerateInputFields />
        </div>
      </fieldset>
    </>
  );
}

export default GameTab;
