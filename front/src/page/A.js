import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaLongArrowAltLeft } from 'react-icons/fa';
import "../style/location.css";
import Left from "../layout/Left";
import Right from "../layout/Right";

const url = "http://211.57.200.6:5000"; // 서버 URL (변경 가능)
const URL = "http://127.0.0.1:5000"; // 서버 URL (변경 가능)
const Car = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  border: 2px solid #a7a7a7;
  width: 50px;
  height: 80px;
  background-color: ${(props) => (props.isParked && props.type===0 ? "#696969" : "#d9d9d9")};
`;

const Container = styled.div`
  display: flex;
  height: 55vh;
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const AnimatedText = styled.div`
  text-align: center;
  animation: ${fadeIn} 5s ease-in-out;
  animation-delay: ${(props) => props.delay}s;
  flex: 1;
  animation-iteration-count: infinite;
  opacity: 0;
`;

const A = () => {
  const [refreshCount, setRefreshCount] = useState(0);
  const [avail, setAvail] = useState(0);
  const [elect, setElect] = useState(0);
  const [disabled, setDisabled] = useState(0);
  const [female, setFemale] = useState(0);
  const [compact, setCompact] = useState(0);
  const [general, setGeneral] = useState(0);
  const [parking, setParking] = useState([]);
  const total = parking.length;
  const [showArrows, setShowArrows] = useState(false);


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
      })
      .catch((error) => {
        console.error("error: " + error);
      });
  };

  const updateDataByType = () => {
    for (let i = 0; i <= 4; i++) {
      fetch(url + "/type", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ zone: "A", type: i }),
      })
        .then((response) => response.json())
        .then((data) => {
          switch (i) {
            case 1:
              setElect(data);
              break;
            case 2:
              setDisabled(data);
              break;
            case 3:
              setFemale(data);
              break;
            case 4:
              setCompact(data);
              break;
            case 0:
              setGeneral(data);
              break;
            default:
              break;
          }
        })
        .catch((error) => {
          console.error("error: " + error);
        });
    }
  };

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 데이터를 가져옵니다.
    fetchData();
    updateDataByType();

    // 5초마다 데이터를 가져오기 위한 타이머 설정
    const interval = setInterval(() => {
      fetchData();
      updateDataByType();
      setRefreshCount((count) => count + 1);
    }, 5000);

    // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    return () => clearInterval(interval);
  }, []);

  // 애니메이션
  useEffect(() => {
    const interval = setInterval(() => {
      setShowArrows(true); // 다음 화살표를 나타내기 위해 상태를 true로 설정
      setTimeout(() => {
        setShowArrows(false); // 2.5초 후에 화살표를 사라지게 함
      }, 2500);
    }, 5000); // 5초마다 순서 변경

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Left {...{ avail, total, elect, disabled, female, compact, general }} />
      <div className="body">
        <div className="topPart">
          {parking.slice(0, 12).map((car, index) => (
            <Car key={index} isParked={car.is_parked} type={car.type}>
              {car.is_parked === 0 ? "주차\n가능" : ""}
            </Car>
          ))}
        </div>
        <div style={{ height: "80px", display: "flex", alignItems: "center", width: "100%"}}>
          <div style={{flex:1, textAlign: "left" }}>출입</div>
          <div style={{width: "100%", display: "flex",  alignItems: "center", flexDirection: 'row-reverse', justifyContent: "center"}}>
            {Array.from({ length: 5 }, (_, index) => (
              <AnimatedText key={index} delay={index} style={{ opacity: showArrows >= index + 1 ? 1 : 0 }}><FaLongArrowAltLeft/></AnimatedText>
            ))}
          </div>
          <div style={{flex:1, textAlign: "right" }}>출입</div>
        </div>
        <div className="bottomPart">
          {parking.slice(12).map((car, index) => (
            <Car key={index + 12} isParked={car.is_parked} type={car.type}>
              {car.is_parked === 0 ? "주차\n가능" : ""}
            </Car>
          ))}
        </div>
      </div>
    <Right/>
    </Container>
  );
};

export default A;
