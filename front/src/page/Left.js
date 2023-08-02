import React, { useEffect, useState } from "react";
import "../style/Left.css";
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
  


  const RTSP = () => {
    navigate('/cctv')
  }

  return (
    <>
      <aside>
        <table>
          <colgroup>
          <col style={{ width: '50%' }} />
          <col style={{ width: '50%', borderLeft: '1px solid #d1d1d1' }} />
          </colgroup>
          <thead>
            <tr style={{ backgroundColor: '#3447fa', height: '35px'}}>
              <th colSpan="2">{currentDateTime.toLocaleString('KO-kr', options)}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>주차가능대수</td>
              <td>{avail}/{total}</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: '#72bd72'}}>전기차</td>
              <td>{elect}</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: '#8ac0df'}}>장애인</td>
              <td>{disabled}</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: '#ebe598'}}>여성</td>
              <td>{female}</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: '#9ea5e0'}}>경차</td>
              <td>{compact}</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: '#d9d9d9'}}>일반</td>
              <td>{general}</td>
            </tr>
          </tbody>
        </table>
      
        <div className="btn">
        <button  style={{ width: '50%' }} className="stats cctvbtn">요일별 통계</button>
        <button  style={{ width: '50%' }} className="stats cctvbtn">시간대별 통계</button>
        </div>
        <button  style={{ width: '50%' }} className="cctvbtn" onClick={RTSP}>CCTV영상확인</button>
      </aside>
    </>
  );
};

export default Left;
