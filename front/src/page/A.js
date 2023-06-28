import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../style/location.css";
import Left from "./Left";

const url = 'http://127.0.0.1:5000';

const Car = styled.div`
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
  const [avail, setAvail] = useState(0);
  const [total, setTotal] = useState(0);

  const [parking, setParking] = useState([
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

  useEffect(() => {
    fetch(url + '/list', {
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

      fetch(url + '/total', {
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

        fetch(url + '/avail', {
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

  }, []);

  return (
    <Container>
    <Left avail={avail} total={total}/>
    <div className="body">
      {parking.map((car, index) => (
        <Car key={index} isParked={car.is_parked}>
          {car.spot_number}
        </Car>
      ))}
    </div>
    </Container>
  );
};

export default A;
