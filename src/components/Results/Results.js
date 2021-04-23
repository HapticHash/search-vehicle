import React, { useEffect, useState } from "react";
import "./Results.css";
import axios from "axios";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import { Row, Col, Drawer } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import FilterOptions from "../FilterOptions/FilterOptions";

function Results() {
  let textInput = React.createRef();
  let lower_str = "";
  let cap_str = "";
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [searchRes, setSearchRes] = useState(["tesla"]);
  const url =
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/" +
    searchRes +
    "/modelyear/2018/vehicletype/passenger?format=json";
  useEffect(() => {
    async function fetchData() {
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
      return request;
    }
    fetchData();
  }, [url]);

  function handleClick() {
    setSearchRes(textInput.current.value);
  }
  function capitalizeText(ele) {
    lower_str = ele.toLowerCase();
    cap_str = lower_str.charAt(0).toUpperCase() + lower_str.substr(1);
    return cap_str;
  }
  return (
    <div className="Results">
      <Row align="middle" className="Results__row">
        <div className="Results__searchbar">
          <Col flex="auto">
            <input
              type="text"
              ref={textInput}
              placeholder="Search your car..."
              className="input__search"
            />
          </Col>
          <Col flex="60px">
            <button
              className="input__search__button"
              type="button"
              onClick={handleClick}
            >
              <SearchOutlined className="input__search__icon" /> Search
            </button>
          </Col>
        </div>
      </Row>

      <Row className="Results__filters">
        <Col span={24}>
          <div className="Results__filters__options">
            <FilterOptions />
          </div>
        </Col>
      </Row>

      <div className="Results__group">
        <div className="Results__data">
          {/* <h1>Data: {data ? data.length : "null"}</h1> */}
          {data && data.length > 0
            ? data.map((datas) => {
                return (
                  <div key={datas.Model_ID} className="card">
                    <div>
                      <h2 className="Card__heading">{datas.Model_Name}</h2>
                      <p>{capitalizeText(datas.Make_Name)}</p>
                      <p>{datas.VehicleTypeName}</p>
                      <p>{datas.Make_ID}</p>
                    </div>
                  </div>
                );
              })
            : "Loading..."}
        </div>
      </div>
    </div>
  );
}

export default Results;
