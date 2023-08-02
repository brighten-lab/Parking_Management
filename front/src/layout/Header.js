import "../style/Header.css";

const Header = (props) => {
  const text = props.text;
  return (
    <>
      <header>
        실시간 스마트주차 유도시스템 {text}
      </header>
    </>
  );
};

export default Header;
