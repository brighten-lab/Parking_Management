import React, { useEffect, useState } from "react";
import "../style/Left.css";
import { FiRefreshCcw } from "react-icons/fi";
import RTSP from "./RTSP";
import CCTVPlayer from "../Rtsp";
import {useNavigate} from "react-router-dom"

const Left = (props) => {
  const { avail, total } = props;
  const [done, setDone] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const Full = {
    backgroundColor: avail === 0 ? "red" : "#6d6d6d",
    borderRadius: '5px',
    margin: '5px',
    marginTop: '15px',
    height: '65px',
    fontSize: '30px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
    paddingRight: '10px',
    width: '190px',
  };

  const Avail = {
    backgroundColor: avail === 0 ? "#6d6d6d" : "blue",
  }

  const Refresh = () => {
    window.location.reload();
  };

  const showRTSP = () => {
    // rtsp cctv영상 modal 창 띄우기
    setModalOpen(true);
  };

  const RTSP = () => {
    navigate('/cctv')
  }

  useEffect(() => {
    setDone(total - avail);
  }, [avail, total]);

  return (
    <>
      <aside>
        <button onClick={Refresh}><FiRefreshCcw/></button>
        <p style={Full}>만차</p>
        <div className="textnum" style={Avail} >
            <p >주차가능</p> 
            <p>{avail}</p>
        </div>
        <div className="textnum">
            <p>주차완료</p> 
            <p>{done}</p>
        </div>
        <div className="textnum">
            <p>총 주차</p> 
            <p>{total}</p>
        </div>
        <button className="cctvbtn" onClick={RTSP}>CCTV영상확인</button>
      </aside>
    </>
  );
};

export default Left;
