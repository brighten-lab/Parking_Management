import React, { useEffect, useState } from "react";
import "../style/Left.css";
import { FiRefreshCcw } from "react-icons/fi";

const Left = (props) => {
  const { avail, total } = props;
  const [done, setDone] = useState(0);

  const Full = {
    backgroundColor: avail === 0 ? "red" : "#6d6d6d",
    borderRadius: '5px',
    margin: '5px',
    marginTop: '15px',
    height: '50px',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
    paddingRight: '10px',
    width: '150px',
  };

  const Avail = {
    backgroundColor: avail === 0 ? "#6d6d6d" : "blue",
  }

  const Refresh = () => {
    window.location.reload();
  };


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
      </aside>
    </>
  );
};

export default Left;
