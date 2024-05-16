import styles from "@/app/settings/styles.module.css";
import React, { useState } from "react";
import { ChangeEvent, useContext } from "react";
import { FormContext, SettingsProps } from "../form-components/formContext";
import {
  GetInput,
  GetColorInput,
  GetListInput,
  Props,
} from "../form-components/input";
import GameContainer from "@/components/PongGame/GameContainer";
const convertHexColor = (hex: string): number => {
  const cleanedHex = hex.replace("#", "");
  return parseInt(cleanedHex, 16);
};

function GenerateInputFields() {
  const { valuesToPost } = useContext<SettingsProps>(FormContext);

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
      opt: ["parallel", "prespective"],
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
        ></GetListInput>
      </div>
    </>
  );
}

function GameTab() {
  const [paddleColor, setPaddleColor] = useState("#ff4655");
  const [tableColor, setTableColor] = useState("#161625");
  const [ballColor, setBallColor] = useState("#ffffff");
//   const [paddleColorC, setPaddleColorC] = useState("#ff4655");
//   const [tableColorC, setTableColorC] = useState("#161625");
//   const [ballColorC, setBallColorC] = useState("#ffffff");
//   const handleColorSubmit = (color: any) => {
//     console.log(color);
//     setPaddleColor(color);
//   };
//   const handleColorSubmit_ = (color: any) => {
//     console.log(color);
//     setTableColor(color);
//   };
//   const handleColorSubmit__ = (color: any) => {
//     console.log(color);
//     setBallColor(color);
//   };
//   const handleColorChange = (e: { target: { value: any } }) => {
//     setPaddleColorC(e.target.value);
//   };
//   const handleColorChange_ = (e: { target: { value: any } }) => {
//     setTableColorC(e.target.value);
//   };
//   const handleColorChange__ = (e: { target: { value: any } }) => {
//     setBallColorC(e.target.value);
//   };

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
            Gameposition_x={6}
            Gameposition_y={8}
            Gameposition_z={0}
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
