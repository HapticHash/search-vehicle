import React, { useEffect, useState } from "react";
import "./Results.css";
import axios from "axios";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import { Button, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import SearchBar from "../SearchBar/SearchBar";
import YearSlider from "../YearSlider/YearSlider";

function Results() {
  let textInput = React.createRef();

  const [showFilter, setShowFilter] = React.useState(false);
  const [results, setResults] = useState([]);
  const [searchRes, setSearchRes] = useState(["tesla"]);
  const url =
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/" +
    searchRes +
    "/modelyear/2018/vehicletype/passenger?format=json";
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(url);
      setResults(request.data.results);
      console.log("-->", request.data.Results);
      //   console.log(request.data.results);
      return request;
    }
    fetchData();
  }, [url]);

  function handleClick() {
    setSearchRes(textInput.current.value);
  }

  function showFilters() {
    if (showFilter == true) {
      setShowFilter(false);
    } else setShowFilter(true);
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
          <Col flex="100px">
            <Button
              className="input__button"
              type="primary"
              shape="round"
              icon={<SearchOutlined />}
              size={"large"}
              onClick={handleClick}
            >
              Search
            </Button>
          </Col>
        </div>
        <Col>
          <Button
            className="input__filter"
            type="primary"
            shape="circle"
            icon={<AdjustmentsIcon />}
            size={"large"}
            onClick={showFilters}
          ></Button>
        </Col>
      </Row>

      <Row className="Results__filters">
        <Col span={24}>{showFilter ? <SearchBar /> : null}</Col>
      </Row>
      {/* <Row>
        <Col>
          <YearSlider />
        </Col>
      </Row> */}
    </div>
  );
}

export default Results;
