import React, { useEffect, useState } from "react";
import "./Results.css";
import axios from "axios";
import { Col, Row, Select, Slider, Typography, Tag } from "antd";
import ShowResults from "../ShowResults/ShowResults";
import loadingGif from "../../assets/loading.gif";
import SeparateSvg from "../../assets/separate.svg";

const marks = {
  1995: {
    style: {
      color: "#111",
    },
    label: <strong>1995</strong>,
  },
  2004: "2004",
  2013: "2013",
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
        marginTop: 5,
        marginBottom: 5,
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
  var sliderVal = 2021;
  const { Option } = Select;
  const [options, setOptions] = useState([]);
  const [typeRes, setTypeRes] = useState([]);
  const [sliderRes, setSliderRes] = useState([2021]);
  const [carMakeRes, setCarMakeRes] = useState([]);
  const [allCarMakeRes, setAllCarMakeRes] = useState([]);
  const [allVehicleTypeRes, setAllVehicleTypeRes] = useState([]);
  const [carMakeSelected, setCarMakeSelected] = useState([]);
  const [flag, setFlag] = useState([true]);

  const urlToFilter =
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/[" +
    carMakeSelected +
    "]/modelyear/" +
    sliderRes +
    "/vehicletype/" +
    typeRes +
    "?format=json";

  const urlForAllMakes =
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json";

  const urlToShowAllMakeSelected =
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/[" +
    carMakeSelected +
    "]/modelyear/" +
    sliderRes +
    "/vehicletype/[allvehicletypes]?format=json";

  const urlToShowAllVehicleTypesSelected =
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/[allvehiclesmake]/modelyear/" +
    sliderRes +
    "/vehicletype/" +
    typeRes +
    "?format=json";

  useEffect(() => {
    async function fetchData() {
      setFlag(true);
      const request = await axios.get(urlToFilter);

      const carMakeData = [];
      var carMakeList = carMakeSelected;
      carMakeList = carMakeList.map((v) => v.toUpperCase());
      request.data.Results.forEach((element) => {
        if (carMakeList.includes(element.Make_Name)) {
          carMakeData.push(element);
        }
      });

      setCarMakeRes(carMakeData);
      setFlag(false);
      return request;
    }
    fetchData();
  }, [urlToFilter]);

  useEffect(() => {
    async function fetchData() {
      let lower_str = "";
      let cap_str = "";
      const request = await axios.get(urlForAllMakes);
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
  }, [urlForAllMakes]);

  useEffect(() => {
    async function fetchData() {
      setFlag(true);
      const request = await axios.get(urlToShowAllMakeSelected);

      const carAllMakeData = [];
      var carMakeList = carMakeSelected;
      carMakeList = carMakeList.map((v) => v.toUpperCase());
      request.data.Results.forEach((element) => {
        if (carMakeList.includes(element.Make_Name)) {
          carAllMakeData.push(element);
        }
      });
      setAllCarMakeRes(carAllMakeData);
      setFlag(false);
      return request;
    }
    fetchData();
  }, [urlToShowAllMakeSelected]);

  useEffect(() => {
    async function fetchData() {
      setFlag(true);
      const request = await axios.get(urlToShowAllVehicleTypesSelected);

      setAllVehicleTypeRes(request.data.Results);
      setFlag(false);
      return request;
    }
    fetchData();
  }, [urlToShowAllVehicleTypesSelected]);

  function getMakeValue(values) {
    const Max = 5;
    values.length <= Max && setCarMakeSelected(values);
  }

  function valueSelectedType(value) {
    setTypeRes(value);
  }

  function getSliderValue(val) {
    setSliderRes(val);
  }
  return (
    <div className="Results">
      <div className="Results__searchbar">
        <Row className="Results__header Results__row">
          <Col span={24}>
            <Title className="Results__header__title">Search your car</Title>
          </Col>
        </Row>
        <Row align="middle" className="Results__row">
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="FilterOptions__make">
              <label
                htmlFor="FilterOptions__type__select"
                className="Filter__label"
              >
                Manufacturer of Car <span>*(Select max 5 values)</span>
              </label>
              <Select
                showArrow="true"
                mode="multiple"
                className="FilterOptions__make__select"
                tagRender={tagRender}
                placement="bottomCenter"
                defaultValue={[]}
                value={carMakeSelected}
                placeholder="Select your car manufacturer"
                style={{ width: "100%" }}
                options={options}
                onChange={getMakeValue}
              />
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="FilterOptions__type">
              <label
                htmlFor="FilterOptions__type__select"
                className="Filter__label"
              >
                Type of Car
              </label>

              <Select
                defaultValue="Select your type of car"
                style={{ width: "100%" }}
                onChange={valueSelectedType}
              >
                <Option value="Bus">Bus</Option>
                <Option value="Incomplete Vehicle">Incomplete Vehicle</Option>
                <Option value="Low Speed Vehicle">
                  Low Speed Vehicle (LSV)
                </Option>
                <Option value="Motorcycle">Motorcycle</Option>
                <Option value="Multipurpose Passenger Vehicle">
                  Multipurpose Passenger Vehicle (MPV)
                </Option>
                <Option value="Off Road Vehicle">Off Road Vehicle</Option>
                <Option value="Passenger Car">Passenger Car</Option>
                <Option value="Truck">Truck </Option>
                <Option value="Trailer">Trailer </Option>
              </Select>
            </div>
          </Col>
        </Row>
        <Row align="middle" className="Results__YearSlider__row">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="FilterOptions__year">
              <div className="YearSlider">
                <label
                  htmlFor="FilterOptions__make__select"
                  className="Filter__label__year"
                  align="middle"
                >
                  Model year of car
                </label>
                <Slider
                  min={1995}
                  max={2022}
                  marks={marks}
                  defaultValue={sliderVal}
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
        {flag ? (
          <div className="Results__loading">
            <img src={loadingGif} alt="loading gif"></img>
          </div>
        ) : (allCarMakeRes && allCarMakeRes.length !== 0) ||
          (typeRes && typeRes.length !== 0) ? (
          allCarMakeRes && allCarMakeRes.length !== 0 ? (
            flag ? (
              <div className="Results__loading">
                <img src={loadingGif} alt="loading gif"></img>
              </div>
            ) : typeRes && typeRes.length !== 0 ? (
              flag ? (
                <div className="Results__loading">
                  <img src={loadingGif} alt="loading gif"></img>
                </div>
              ) : (
                <div>
                  <ShowResults data={carMakeRes} />
                </div>
              )
            ) : (
              <div>
                <ShowResults data={allCarMakeRes} />
              </div>
            )
          ) : typeRes && typeRes.length !== 0 ? (
            flag ? (
              <div className="Results__loading">
                <img src={loadingGif} alt="loading gif"></img>
              </div>
            ) : (
              <div>
                <ShowResults data={allVehicleTypeRes} />
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
