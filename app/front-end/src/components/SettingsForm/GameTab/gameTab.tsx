import styles from "@/app/settings/styles.module.css";
import React, { useState } from "react";
import { MouseEvent, useContext, useEffect } from "react";
import { FormContext, SettingsProps } from "../form-components/formContext";
import {
  GetInput,
  GetColorInput,
  GetListInput,
  GetInputRange,
  Props,
} from "../form-components/input";
import GameContainer from "@/components/PongGame/GameContainer";
import Cookies from "js-cookie";

const convertHexColor = (hex: string): number => {
  const cleanedHex = hex.replace("#", "");
  return parseInt(cleanedHex, 16);
};

function GenerateInputFields() {
  const { updateField, currentAccoutValues, oldAccountValues } = useContext<SettingsProps>(FormContext);

  const inputProps = [
    {
      inputId: "table_color",
      labelText: "Table Color",
      value: currentAccoutValues["table_color"],
    },
    {
      inputId: "ball_color",
      labelText: "Ball Color",
      value: currentAccoutValues["ball_color"],
    },
    {
      inputId: "paddle_color",
      labelText: "Paddle Color",
      value: currentAccoutValues["paddle_color"],
    },
    {
      inputId: "table_position",
      labelText: "Table Position",
      opt: ["default", "horizantal", "vertical"],
    },
  ];

  return (
    <div>
      {inputProps
        .slice(0, 3)
        .map(
          ({
            inputId,
            labelText,
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
          choosenPosition={currentAccoutValues["table_position"] as string}
          >
        </GetListInput>
      </div>

      <GetInputRange/>


        <div className="row p-0 m-0 justify-content-center align-items-center flex-end">
          <div className="col">
            <button
                type="button"
                className={`${styles.previewButton} p-0 m-0 my-4 row justify-content-center align-items-center itim-font`}
                onClick={ () => {
                  updateField(inputProps[0].inputId, "#161625");
                  updateField(inputProps[1].inputId, "#ffffff");
                  updateField(inputProps[2].inputId, "#ff4655");
                } }
                >
                  Default Colors
            </button>
          </div>
          <div className="col">
            <button
                type="button"
                className={`${styles.previewButton} p-0 m-0 my-4 row justify-content-center align-items-center itim-font`}
                onClick={ () => {
                  updateField(inputProps[0].inputId, (Cookies.get(inputProps[0].inputId) as string) ?? oldAccountValues[inputProps[0].inputId]);
                  updateField(inputProps[1].inputId, (Cookies.get(inputProps[1].inputId) as string) ?? oldAccountValues[inputProps[1].inputId]);
                  updateField(inputProps[2].inputId, (Cookies.get(inputProps[2].inputId) as string) ?? oldAccountValues[inputProps[2].inputId]);
                } }
                >
                  Your Colors
            </button>
          </div>
        </div>

    </div>
  );
}

function GameTab() {

  const { updateField, currentAccoutValues } = useContext<SettingsProps>(FormContext);

  const [paddleColor, setPaddleColor] = useState<string>((currentAccoutValues['paddleColor'] as string) ?? "#ff4655");
  const [tableColor, setTableColor] = useState<string>((currentAccoutValues['tableColor'] as string) ?? "#161625");
  const [ballColor, setBallColor] = useState<string>((currentAccoutValues['ballColor'] as string) ?? "#ffffff");

  useEffect(() =>{
    setTableColor((currentAccoutValues['table_color'] as string));
  }, [currentAccoutValues['table_color'],])

    useEffect(() =>{
      setBallColor((currentAccoutValues['ball_color'] as string));
    }, [currentAccoutValues['ball_color'],])

    useEffect(() =>{
      setPaddleColor((currentAccoutValues['paddle_color'] as string));
    }, [currentAccoutValues['paddle_color'],])

        useEffect(() => {
          const pos = currentAccoutValues["table_position"] as string;
          const view =
            pos === "default"
              ? "pos_default"
              : pos === "horizantal"
              ? "pos_horizantal"
              : "pos_vertical";
          let pos_v = Cookies.get(view) as string;
          if (!pos_v) {
            Cookies.set('pos_default', '6,8,0');
            Cookies.set('pos_horizantal', '0,10,0');
            Cookies.set('pos_vertical', '1,10,0');
            pos_v = Cookies.get(view) as string;
          }
          updateField("current_table_view", pos_v);
        }, [currentAccoutValues["table_position"]]);
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
            Gameposition_x={parseInt((currentAccoutValues["current_table_view"] as string).split(",")[0])}
            Gameposition_y={parseInt((currentAccoutValues["current_table_view"] as string).split(",")[1])}
            Gameposition_z={parseInt((currentAccoutValues["current_table_view"] as string).split(",")[2])}
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
