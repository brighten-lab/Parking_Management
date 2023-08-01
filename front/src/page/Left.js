import React, { useEffect, useState } from "react";
import "../style/Left.css";
import { FiRefreshCcw } from "react-icons/fi";
import {useNavigate} from "react-router-dom"

const Left = (props) => {
  const {avail, total, elect, disabled, female, compact, general} = props;
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []); 

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  
  const Refresh = () => {
    window.location.reload();
  };

  const RTSP = () => {
    navigate('/cctv')
  }

  return (
    <>
      <aside>
        <button onClick={Refresh}><FiRefreshCcw/></button>
        <table border={1}>
          <thead>
            <tr style={{backgroundColor: 'blue'}}>
              <th colspan="2">{currentDateTime.toLocaleString('KO-kr', options)}</th>
            </tr>
          </thead>
          <tbody>
            <tr> 
              <td>주차가능대수</td>
              <td>{avail}/{total}</td>
            </tr>
            <tr>
              <td>전기차</td>
              <td>{elect}</td>
            </tr>
            <tr>
              <td>장애인</td>
              <td>{disabled}</td>
            </tr>
            <tr>
              <td>여성</td>
              <td>{female}</td>
            </tr>
            <tr>
              <td>경차</td>
              <td>{compact}</td>
            </tr>
            <tr>
              <td>일반</td>
              <td>{general}</td>
            </tr>
          </tbody>
        </table>
        <button className="cctvbtn" onClick={RTSP}>CCTV영상확인</button>
      </aside>
    </>
  );
};

export default Left;
