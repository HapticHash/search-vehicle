import React, { useEffect, useState } from "react";
import "./Results.css";
import axios from "axios";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import { Col, Row, Select, Slider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import FilterOptions from "../FilterOptions/FilterOptions";
import ShowResults from "./ShowResults";
import YearSlider from "../YearSlider/YearSlider";
import loadingGif from "../../loading.gif";

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

function tagRender(props) {
  const { label } = props;
  return (
    <div>{label}</div>
    // <Tag
    //   color="blue"
    //   closable={closable}
    //   onClose={onClose}
    //   style={{
    //     margin: 5,
    //     marginLeft: 5,
    //     padding: 5,
    //     paddingLeft: 10,
    //     paddingRight: 10,
    //   }}
    // >
    //   {label}
    // </Tag>
  );
}

function Results() {
  let textInput = React.createRef();
  var store = [];
  var sliderVal1 = 0;
  var sliderVal2 = 0;
  const { Option } = Select;

  const [options, setOptions] = useState([]);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [searchRes, setSearchRes] = useState([]);
  const [typeRes, setTypeRes] = useState([]);
  const [sliderRes, setSliderRes] = useState([]);

  let lower_str = "";
  let cap_str = "";
  // var flag = true;
  const [flag, setFlag] = useState([true]);
  const [check, setCheck] = useState([false]);

  const [make, setMake] = useState([]);
  const url =
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/" +
    searchRes +
    "/modelyear/" +
    sliderRes +
    "/vehicletype/" +
    typeRes +
    "?format=json";
  useEffect(() => {
    async function fetchData() {
      setFlag(true);
      const request = await axios.get(url);
      setResults(request.data.Results);
      // console.log("-->", request.data.Results);
      //   console.log(request.data.results);
      const carList = [];
      request.data.Results.forEach((element) => {
        // console.log("==>>", element);
        carList.push(element);
      });
      setData(carList);
      setFlag(false);
      return request;
    }
    fetchData();
  }, [url]);

  const url2 =
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json";
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(url2);
      setMake(request.data.Results);
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
  }, [url2]);

  function testFun(values) {
    setSearchRes(values[0]);
  }

  function valueSelectedType(value) {
    setTypeRes(value);
    console.log("+=======", value);
  }
  function getSliderValue(val) {
    sliderVal1 = val[0];
    sliderVal2 = val[1];
    setSliderRes(sliderVal2);
    console.log("val a:", sliderVal1, "val b:", sliderVal2);
  }
  return (
    <div className="Results">
      <Row align="middle" className="Results__row">
        <div className="Results__searchbar">
          <Col flex="auto">
            {/* <input
              type="text"
              ref={textInput}
              placeholder="Search your car..."
              className="input__search"
            /> */}
            <div className="FilterOptions__make">
              <Select
                mode="tags"
                className="FilterOptions__make__select"
                // tagRender={tagRender}
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
        </div>
      </Row>

      {/* <Row className="Results__filters">
        <Col span={24}>
          <div className="Results__filters__options">
            <FilterOptions />
          </div>
        </Col>
      </Row> */}

      <div className="FilterOptions">
        <Row>
          <Col span={12}>
            <div className="FilterOptions__type">
              <label
                for="FilterOptions__type__select"
                className="Filter__label"
              >
                Car's Type
              </label>

              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onSelect={valueSelectedType}
              >
                <Option value="Motorcycle">Motorcycle</Option>
                <Option value="Passenger Car">Passenger Car</Option>
                <Option value="Truck">Truck</Option>
                <Option value="Trailer">Trailer</Option>
                <Option value="Bus">Bus</Option>
                <Option value="Multipurpose Passenger Vehicle">
                  Multipurpose Passenger Vehicle (MPV)
                </Option>
                <Option value="Low Speed Vehicle">
                  Low Speed Vehicle (LSV)
                </Option>
                <Option value="Incomplete Vehicle">Incomplete Vehicle</Option>
              </Select>
            </div>
          </Col>
        </Row>
        <Row></Row>
        <Row>
          <Col span={24}>
            <div className="FilterOptions__year">
              <div className="YearSlider">
                <label
                  for="FilterOptions__make__select"
                  className="Filter__label"
                >
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

      <div className="Results__group">
        {searchRes &&
        searchRes.length != 0 &&
        typeRes &&
        typeRes.length != 0 &&
        sliderRes &&
        sliderRes.length != 0 ? (
          flag ? (
            <div className="Results__loading">
              <img src={loadingGif} alt="loading gif"></img>
            </div>
          ) : (
            <div>
              <ShowResults data={data} />
            </div>
          )
        ) : (
          <div>Search Filterss </div>
        )}
      </div>
    </div>
  );
}

export default Results;
