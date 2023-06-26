import React from "react";
import "../style/location.css";

const A = () => {
  return (
    <div className="wrapper">
      <div className="header">
        <div className="header-row">
          <div className="header-item">주차장 현황</div>
          <div className="header-item">주차 가능 빈자리</div>
          <div className="header-item">주차 완료 자리</div>
          <div className="header-item">총 자리</div>
        </div>
        <div className="header-row">
          <div className="header-item">
            <button>새로고침</button>
          </div>
          <div className="header-item">0</div>
          <div className="header-item">0</div>
          <div className="header-item">0</div>
        </div>
      </div>
      <div className="body">
        <div className="car"></div>
        <div className="car"></div>
        <div className="car"></div>
        <div className="car"></div>
        <div className="car"></div>
        <div className="car"></div>
        <div className="car"></div>
        <div className="car"></div>
        <div className="car"></div>
      </div>
    </div>
  );
};

export default A;
