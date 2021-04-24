import React from "react";
import "./ShowResults.css";

var lower_str = "";
var cap_str = "";

function capitalizeText(ele) {
  console.log("===========", ele);
  lower_str = ele.toLowerCase();
  cap_str = lower_str.charAt(0).toUpperCase() + lower_str.substr(1);
  return cap_str;
}
function showResults(props) {
  return (
    <div className="Results__data">
      {/* <h1>Data: {data ? data.length : "null"}</h1> */}
      {props.data && props.data.length > 0 ? (
        props.data.map((datas) => {
          return (
            <div key={datas.Model_ID} className="card">
              <div>
                <h2 className="Card__heading">{datas.Model_Name}</h2>
                <p>{capitalizeText(datas.Make_Name)}</p>
                <p>{datas.VehicleTypeName}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <div className="card__error">
            <div>
              <img
                className="card__error__img"
                src="https://cdn.dribbble.com/users/2469324/screenshots/6538803/comp_3.gif"
                alt="error"
              />
              <h1>Results Not Found!</h1>
              <p>Seems like there are no matching results available</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default showResults;
