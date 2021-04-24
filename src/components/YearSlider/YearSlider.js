import React from "react";
import "./YearSlider.css";
import { Row, Col, Slider } from "antd";
var a = 0;
var b = 0;
const marks = {
  1949: {
    style: {
      color: "#111",
    },
    label: <strong>1949</strong>,
  },
  1986: "1986",
  2022: {
    style: {
      color: "#111",
    },
    label: <strong>2022</strong>,
  },
};
function YearSlider() {
  function getSliderValue(sliderValue) {
    a = sliderValue[0];
    b = sliderValue[1];
    console.log("val a:", a, "val b:", b);
  }
  return (
    <div className="YearSlider">
      <label for="FilterOptions__make__select" className="Filter__label">
        Car's Year
      </label>
      <Slider
        min={1949}
        max={2022}
        marks={marks}
        range={{ draggableTrack: true }}
        defaultValue={[2000, 2010]}
        onAfterChange={getSliderValue}
      />
    </div>
  );
}

export default YearSlider;
