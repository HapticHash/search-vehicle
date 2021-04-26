import React from "react";
import "./ShowResults.css";
import MotorcycleImage from "../../assets/motorcycle.png";
import CarImage from "../../assets/car.png";
import TruckImage from "../../assets/truck.png";
import TrailerImage from "../../assets/trailer.png";
import BusImage from "../../assets/bus.png";
import LsvImage from "../../assets/lsv.png";
import OffRoadImage from "../../assets/off_road.png";
import MpvImage from "../../assets/mpv.png";
import IncompVehicleImage from "../../assets/incomplete.png";

var lower_str = "";
var cap_str = "";
var vehicleImageUrl = "";

function capitalizeText(ele) {
  lower_str = ele.toLowerCase();
  cap_str = lower_str.charAt(0).toUpperCase() + lower_str.substr(1);
  return cap_str;
}

function getCarImage(vehicleType) {
  if (vehicleType === "Motorcycle") {
    vehicleImageUrl = MotorcycleImage;
  } else if (vehicleType === "Passenger Car") {
    vehicleImageUrl = CarImage;
  } else if (vehicleType === "Truck ") {
    vehicleImageUrl = TruckImage;
  } else if (vehicleType === "Bus") {
    vehicleImageUrl = BusImage;
  } else if (vehicleType === "Off Road Vehicle") {
    vehicleImageUrl = OffRoadImage;
  } else if (vehicleType === "Trailer") {
    vehicleImageUrl = TrailerImage;
  } else if (vehicleType === "Multipurpose Passenger Vehicle (MPV)") {
    vehicleImageUrl = MpvImage;
  } else if (vehicleType === "Low Speed Vehicle (LSV)") {
    vehicleImageUrl = LsvImage;
  } else if (vehicleType === "Incomplete Vehicle") {
    vehicleImageUrl = IncompVehicleImage;
  }
  return vehicleImageUrl;
}
function showResults(props) {
  return (
    <div className="Results__data">
      {props.data && props.data.length > 0 ? (
        props.data.map((datas, index) => {
          return (
            <div key={index} className="card">
              <div>
                <div className="card__image">
                  <img
                    className="card__img"
                    src={getCarImage(datas.VehicleTypeName)}
                    alt={datas.Model_Name}
                  />
                </div>
                <h2 className="Card__heading">
                  {capitalizeText(datas.Make_Name)} {datas.Model_Name}
                </h2>
                <p>[{datas.VehicleTypeName}]</p>
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
              <h1>Oh No!</h1>
              <p>
                It seems like there are no matching results available. Please
                try searching using other filter options
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default showResults;
