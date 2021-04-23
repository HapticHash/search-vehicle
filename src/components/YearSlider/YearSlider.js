import React from "react";
import "./YearSlider.css";
import { Row, Col, Slider } from "antd";

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
        defaultValue={[1972, 2000]}
      />
    </div>
  );
}

export default YearSlider;
