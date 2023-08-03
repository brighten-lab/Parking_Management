import "../style/Header.css";

const Header = (props) => {
  const text = props.text;

  return (
    <>
      <header>
        실시간 스마트주차 유도시스템&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;  
        <span style={{ color: "#94b3cc" }}>{text}</span>
      </header>
    </>
  );
};

export default Header;
