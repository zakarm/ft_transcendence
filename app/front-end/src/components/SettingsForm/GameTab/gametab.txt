import GameContainer from "@/components/PongGame/GameContainer";
import React, { useState } from "react";

const convertHexColor = (hex: string): number => {
  const cleanedHex = hex.replace("#", "");
  return parseInt(cleanedHex, 16);
};

function GameTab() {
  const [paddleColorC, setPaddleColorC] = useState("#ff4655");
  const [paddleColor, setPaddleColor] = useState("#ff4655");
  const [tableColorC, setTableColorC] = useState("#161625");
  const [tableColor, setTableColor] = useState("#161625");
  const [ballColorC, setBallColorC] = useState("#ffffff");
  const [ballColor, setBallColor] = useState("#ffffff");

  const handleColorSubmit = (color: any) => {
    console.log(color);
    setPaddleColor(color);
  };
  const handleColorSubmit_ = (color: any) => {
    console.log(color);
    setTableColor(color);
  };
  const handleColorSubmit__ = (color: any) => {
    console.log(color);
    setBallColor(color);
  };
  const handleColorChange = (e: { target: { value: any; }; }) => {
    setPaddleColorC(e.target.value);
  };
  const handleColorChange_ = (e: { target: { value: any; }; }) => {
    setTableColorC(e.target.value);
  };
  const handleColorChange__ = (e: { target: { value: any; }; }) => {
    setBallColorC(e.target.value);
  };
  return (
    <>
      <fieldset className="col-12 col-xxl-6 p-0 m-0 d-flex justify-content-center align-items-center h-100">
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
      <fieldset className="col-12 col-xxl-6 p-0 m-0 d-flex justify-content-center align-items-center h-100">
        <div className="row col d-flex justify-content-center align-items-center flex-column">
          <div className="row p-1 m-0 col d-flex justify-content-center align-items-center">
            <input
              className="col-4 mx-2"
              type="color"
              value={paddleColorC}
              onChange={handleColorChange}
            />
            <input
              className="col-2"
              type="button"
              onClick={() => handleColorSubmit(paddleColorC)}
              value="set color"
            />
          </div>
          <div className="row p-1 m-0 col d-flex justify-content-center align-items-center">
            <input
              className="col-4 mx-2"
              type="color"
              value={tableColorC}
              onChange={handleColorChange_}
            />
            <input
              className="col-2"
              type="button"
              onClick={() => handleColorSubmit_(tableColorC)}
              value="set color"
            />
          </div>
          <div className="row p-1 m-0 col d-flex justify-content-center align-items-center">
            <input
              className="col-4 mx-2"
              type="color"
              value={ballColorC}
              onChange={handleColorChange__}
            />
            <input
              className="col-2"
              type="button"
              onClick={() => handleColorSubmit__(ballColorC)}
              value="set color"
            />
          </div>
        </div>
      </fieldset>
    </>
  );
}

export default GameTab;
