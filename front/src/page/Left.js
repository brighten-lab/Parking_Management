import React, { useEffect, useState } from "react";
import "../style/Left.css";



const Left = (props) => {
  const { avail, total } = props;
  const [done, setDone] = useState(0);

  const availTextStyle = {
    backgroundColor: avail === 0 ? "red" : "#6d6d6d",
    borderRadius: '5px',
    margin: '5px',
    height: '50px',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
    paddingRight: '10px',
    width: '150px',
  };

  const Refresh = () => {
    window.location.reload();
  };


  useEffect(() => {
    setDone(total - avail);
  }, [avail, total]);

  return (
    <>
      <aside>
        <p style={availTextStyle}>만차 </p>
        <div className="textnum">
        <p>주차 가능</p> 
        <p>{avail}</p>
    </div>
    <div className="textnum">
        <p>주차 완료</p> 
        <p>{done}</p>
    </div>
    <div className="textnum">
        <p>총 주차</p> 
        <p>{total}</p>
    </div>
        <button onClick={Refresh}>새로 고침</button>
      </aside>
    </>
  );
};

export default Left;
