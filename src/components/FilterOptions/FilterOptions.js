import React, { useEffect, useState } from "react";
import { Col, Row, Select, Tag } from "antd";
import axios from "axios";
import "./FilterOptions.css";
import YearSlider from "../YearSlider/YearSlider";
import TestComp from "./TestComp";

const carTypeOptions = [
  { value: "Motorcycle" },
  { value: "Passenger Car" },
  { value: "Truck" },
  { value: "Trailer" },
  { value: "Bus" },
  { value: "Multipurpose Passenger Vehicle (MPV)" },
  { value: "Low Speed Vehicle (LSV)" },
  { value: "Incomplete Vehicle" },
];

function testFun() {}
function tagRender(props) {
  const { label, closable, onClose } = props;
  return (
    <Tag
      color="blue"
      closable={closable}
      onClose={onClose}
      style={{
        margin: 5,
        marginLeft: 5,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      {label}
    </Tag>
  );
}

function FilterOptions(props) {
  const [test, setTest] = useState([]);
  const [make, setMake] = useState([]);
  const [options, setOptions] = useState([]);
  let lower_str = "";
  let cap_str = "";
  const demo = [];

  const url = "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json";
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(url);
      setMake(request.data.results);
      // console.log("==>", request.data.Results);
      const carMakeList = [];
      request.data.Results.forEach((element) => {
        lower_str = element.Make_Name.toLowerCase();
        cap_str = lower_str.charAt(0).toUpperCase() + lower_str.substr(1);
        carMakeList.push({ value: cap_str });
      });
      setOptions(carMakeList);
      return request;
    }
    fetchData();
  }, [url]);

  function onSelectItem(value) {
    demo.push(value);
    console.log("=+=+=", demo);
    // setTest(demo);
  }
  return (
    <div className="FilterOptions">
      <Row>
        <Col span={12}>
          <div className="FilterOptions__make">
            <label for="FilterOptions__make__select" className="Filter__label">
              Car's Make
            </label>
            <Select
              mode="multiple"
              showArrow
              className="FilterOptions__make__select"
              tagRender={tagRender}
              placement="bottomCenter"
              defaultValue={[]}
              placeholder="Select your make"
              style={{ width: "100%" }}
              options={options}
              filterOption={true}
              onChange={testFun}
            />
          </div>
        </Col>
        <Col span={12}>
          <div className="FilterOptions__type">
            <label for="FilterOptions__type__select" className="Filter__label">
              Car's Type
            </label>
            <Select
              mode="multiple"
              showArrow
              className="FilterOptions__type__select"
              tagRender={tagRender}
              placement="bottomCenter"
              defaultValue={[]}
              placeholder="Select your type"
              style={{ width: "100%" }}
              options={carTypeOptions}
              filterOption={true}
              onChange={onSelectItem}
            />
          </div>
        </Col>
      </Row>
      <Row></Row>
      <Row>
        <Col span={24}>
          <div className="FilterOptions__year">
            <YearSlider />
          </div>
          <div>
            {/* <h1>Data: {data ? data.length : "null"}</h1> */}
            {demo && demo.length > 0
              ? demo.map((datas) => {
                  return <div> {datas.value} </div>;
                  // return <TestComp />;
                })
              : "Loading..."}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default FilterOptions;
