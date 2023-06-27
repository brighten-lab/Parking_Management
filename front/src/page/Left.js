import React, { useEffect, useState } from "react";
import "../style/Left.css";


const Left = (props) => {
  const { avail, total } = props;
  const [done, setDone] = useState(0);

  useEffect(() => {
    setDone(total - avail);
  }, [avail, total]);

  return (
    <>
      <aside>
        <h1>주차장 현황</h1>
        <p>주차 가능 {avail}</p>
        <p>주차 완료 {done}</p>
        <p>총 주차 {total}</p>
        <button>새로 고침</button>
      </aside>
    </>
  );
};

export default Left;
