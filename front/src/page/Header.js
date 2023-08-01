import React, { useState, useEffect } from "react"; // React를 import해야 합니다.
import "../style/Header.css";

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <header>
        브라이튼 스마트주차유도 서비스 {currentTime.toLocaleTimeString()}
      </header>
    </>
  );
};

export default Header;
