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
  const { Option } = Select;
  const [test, setTest] = useState([]);
  const [make, setMake] = useState([]);
  const [options, setOptions] = useState([]);
  let lower_str = "";
  let cap_str = "";
  var demo = [];
  var store = [];

  const url = "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json";
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(url);
      setMake(request.data.Results);
      console.log("==>", request.data.Results);
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
    demo = value;
    // setTest(demo);
  }
  function testFun(values) {
    store = values;
  }
  return (
    <div className="FilterOptions">
      <Row>
        <Col span={12}>
          <div className="FilterOptions__type">
            <label for="FilterOptions__type__select" className="Filter__label">
              Car's Type
            </label>
            {/* <Select
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
            /> */}
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="1">Motorcycle</Option>
              <Option value="2">Passenger Car</Option>
              <Option value="3">Truck</Option>
              <Option value="4">Trailer</Option>
              <Option value="5">Bus</Option>
              <Option value="6">Multipurpose Passenger Vehicle (MPV)</Option>
              <Option value="7">Low Speed Vehicle (LSV)</Option>
              <Option value="8">Incomplete Vehicle</Option>
            </Select>
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
            {/* {demo && demo.length > 0
              ? demo.map((datas) => {
                  return <div> {datas.value} </div>;
                  // return <TestComp />;
                })
              : "Loading..."} */}
            {/* <TestComp make={carTypeOptions} /> */}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default FilterOptions;
