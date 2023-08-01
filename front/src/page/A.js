import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../style/location.css";
import Left from "./Left";

const url = "http://211.57.200.6:5000"; // 서버 URL (변경 가능)
const URL = "http://127.0.0.1:5000"; // 서버 URL (변경 가능)
const Car = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #a7a7a7;
  width: 50px;
  height: 80px;
  background-color: ${(props) => (props.isParked ? "#d9d9d9" : "blue")};
`;

const Container = styled.div`
  display: flex;
  height: 80vh;
`;

const A = () => {
  const [refreshCount, setRefreshCount] = useState(0);
  const [avail, setAvail] = useState(0);
  const [total, setTotal] = useState(0);
  const [parking, setParking] = useState([]);

  // 데이터를 가져오는 함수
  const fetchData = () => {
    fetch(url + "/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ zone: "A" }),
    })
      .then((response) => response.json())
      .then((data) => {
        setParking(data);
        console.log("성공: " + data);
      })
      .catch((error) => {
        console.error("error: " + error);
      });

    fetch(url + "/total", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ zone: "A" }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTotal(data);
        console.log("성공: " + data);
      })
      .catch((error) => {
        console.error("error: " + error);
      });

    fetch(url + "/avail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ zone: "A" }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAvail(data);
        console.log("성공: " + data);
      })
      .catch((error) => {
        console.error("error: " + error);
      });
  };

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 데이터를 가져옵니다.
    fetchData();

    // 5초마다 데이터를 가져오기 위한 타이머 설정
    const interval = setInterval(() => {
      fetchData();
      setRefreshCount((count) => count + 1);
    }, 5000);

    // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Left avail={avail} total={total} />
      <div className="body">
        <div className="topPart">
          {parking.slice(0, 12).map((car, index) => (
            <Car key={index} isParked={car.is_parked}>
              A{index + 1}
            </Car>
          ))}
        </div>
        <div style={{ height: "80px" }}></div>
        <div className="bottomPart">
          {parking.slice(12).map((car, index) => (
            <Car key={index + 12} isParked={car.is_parked}>
              B{index + 1}
            </Car>
          ))}
        </div>
        <div style={{ height: "80px" }}></div>
        <div className="build">
          <p>제 2 시험생산공장</p>
        </div>
      </div>
    </Container>
  );
};

export default A;
