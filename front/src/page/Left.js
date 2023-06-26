import React from "react";
import "../style/Left.css";

const Left = () => {
  const availableSpaces = 0;
  const occupiedSpaces = 0;
  const totalSpaces = 0;

  return (
    <>
      <aside>
        <h1>주차장 현황</h1>
        <p>주차 가능 빈자리: {availableSpaces}</p>
        <p>주차 완료 자리: {occupiedSpaces}</p>
        <p>총 주차 자리: {totalSpaces}</p>
        <button>새로 고침</button>
      </aside>
    </>
  );
};

export default Left;
