import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../style/location.css";

const Car = styled.div`
  border: 1px solid #a7a7a7;
  width: 80px;
  height: 150px;
  background-color: ${(props) => (props.isParked ? "#d9d9d9" : "red")};
`;

const A = () => {
  const [parking] = useState([
    {
      zone: "a",
      is_parked: false,
      spot_number: 1,
    },
    {
      zone: "a",
      is_parked: false,
      spot_number: 2,
    },
    {
      zone: "a",
      is_parked: false,
      spot_number: 3,
    },
    {
      zone: "a",
      is_parked: true,
      spot_number: 4,
    },
    {
      zone: "a",
      is_parked: true,
      spot_number: 5,
    },
    {
      zone: "a",
      is_parked: true,
      spot_number: 6,
    },
    {
      zone: "a",
      is_parked: true,
      spot_number: 7,
    },
  ]);

  useEffect(() => {});

  return (
    <div className="wrapper">
      <div className="header">
        <div className="header-row">
          <div className="header-item">주차장 현황</div>
          <div className="header-item">주차 가능 빈자리</div>
          <div className="header-item">주차 완료 자리</div>
          <div className="header-item">총 주차 자리</div>
        </div>
        <div className="header-row">
          <div className="header-item">
            <button>새로고침</button>
          </div>
          <div className="header-item">0</div>
          <div className="header-item">0</div>
          <div className="header-item">0</div>
        </div>
      </div>
      <div className="body">
        {parking.map((car, index) => (
          <Car key={index} isParked={car.is_parked}>
            Zone: {car.zone} Spot: {car.spot_number}
          </Car>
        ))}
      </div>
    </div>
  );
};

export default A;
