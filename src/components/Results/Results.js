import React, { useEffect, useState } from "react";
import "./Results.css";
import axios from "axios";
import { Col, Row, Select, Slider, Typography, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import ShowResults from "./ShowResults";

import loadingGif from "../../assets/loading.gif";
import SeparateSvg from "../../assets/separate.svg";

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

function Results() {
  const { Title } = Typography;
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

  function getMakeValue(values) {
    setSearchRes(values[0]);
    console.log("------>", values);
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
      <div className="Results__searchbar">
        <Row className="App__header Results__row">
          <Col span={24}>
            {/* <div className="image">
            <img src="https://lh3.googleusercontent.com/proxy/b1wGY5L_AHu4PvFXyU2Z73pFmgNOChRGsvltudPKhV6ZSKISc1Rz_91-3MqmyIke4Hf3cMus3ibtjk4WUIz2pBjy1q68kpI" />
          </div> */}
            <Title className="App__header__title">Search your car</Title>
          </Col>
        </Row>
        <Row align="middle" className="Results__row">
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            {/* <input
              type="text"
              ref={textInput}
              placeholder="Search your car..."
              className="input__search"
            /> */}
            <div className="FilterOptions__make">
              <label
                for="FilterOptions__type__select"
                className="Filter__label"
              >
                Manufacturer of Car
              </label>
              <Select
                mode="tags"
                className="FilterOptions__make__select"
                tagRender={tagRender}
                placement="bottomCenter"
                defaultValue={[]}
                placeholder="Select your car manufacturer"
                style={{ width: "100%" }}
                options={options}
                filterOption={true}
                onChange={getMakeValue}
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="FilterOptions__type">
              <label
                for="FilterOptions__type__select"
                className="Filter__label"
              >
                Type of Car
              </label>

              <Select
                defaultValue="Passenger Car"
                style={{ width: "100%" }}
                onChange={valueSelectedType}
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
        <Row align="middle" className="Results__YearSlider__row">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="FilterOptions__year">
              <div className="YearSlider">
                <label
                  for="FilterOptions__make__select"
                  className="Filter__label__year"
                  align="middle"
                >
                  Year Range
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
          </Col>
        </Row>
      </div>
      <div className="Results__searchbar__end">
        <img src={SeparateSvg} alt="back svg" />
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
          <div>
            <div className="card__error__filter">
              <div>
                <img
                  className="card__error__img__filter"
                  src="https://cdn.dribbble.com/users/754943/screenshots/2761885/dribbble-filter.gif"
                  alt="apply filters"
                />
                <h1>Please apply filters</h1>
                <p>It seems like there are no filters applied</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Results;
