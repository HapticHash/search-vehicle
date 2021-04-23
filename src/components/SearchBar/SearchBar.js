import React, { useEffect, useState } from "react";
import { Col, Row, Select, Tag } from "antd";
import axios from "axios";
import "./SearchBar.css";
import YearSlider from "../YearSlider/YearSlider";

const options = [
  // { value: "blue" },
  // { value: "red" },
  // { value: "green" },
  // { value: "yellow" },
  // { value: "cyan" },
  // { value: "pink" },
  // { value: "violet" },
  // { value: "white" },
  // { value: "black" },
  // { value: "grey" },
  // { value: "aqua" },
  // { value: "purple" },
];

function tagRender(props) {
  const { label, value, closable, onClose } = props;

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

function SearchBar(props) {
  const [make, setMake] = useState([]);
  const url = "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json";
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(url);
      setMake(request.data.results);
      console.log("==>", request.data.Results);
      await request.data.Results.forEach((element) => {
        // console.log("##", element.Make_Name);
        options.push({ value: element.Make_Name });
      });
      console.log("_+__", options);

      return request;
    }
    fetchData();
    console.log("_+++", options);
  }, [url]);

  return (
    <div className="SearchBar">
      <Row align="middle">
        <Col span={12}>
          <div className="search">
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              defaultValue={[]}
              placeholder="Select your make"
              style={{ width: "100%" }}
              options={options}
              placement="bottomCenter"
            />
          </div>
        </Col>
        <Col span={12}>
          <div className="search">
            <YearSlider />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default SearchBar;
