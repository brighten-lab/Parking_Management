import React from "react";
import styled from "styled-components";
import "../style/Footer.css";

const FooterButton = styled.button`
  background-color: #1c3fa7;
  color: #ffee00;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 60px;
  border-radius: 3px;
  font-size: 16px;
  color:rgb(255, 225, 0);
  font-weight: 600;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 4px;
  margin-left: 285px;
  margin-right: 220px;
`;

const Footer = ({ onButtonClick }) => {
  const data = [
    { title: "주차장9", link: "/" },
    { title: "옥산공영주차장", link: "/B" },
    { title: "남천둔차공영주차장", link: "/" },
    { title: "남매그린공원공영주차장", link: "/" },
    { title: "계양공영주차장", link: "/" },
    { title: "임당역환승 공영주차장", link: "/" },
    { title: "신대리1공영주차장", link: "/" },
    { title: "한마음길노상공영주차장", link: "/" },
  ];

  const buttonClick = (title) => {
    // 버튼 클릭 시 Main 컴포넌트로 버튼 이름 전달
    onButtonClick(title);
  };

  return (
    <footer>
      <GridContainer>
        {data.map((item, index) => (
          <FooterButton key={index} to={item.link} onClick={() => buttonClick(item.title)}>
            <span>{item.title}</span>
            <span className="num">현재주차가능: </span>
          </FooterButton>
        ))}
      </GridContainer>
    </footer>
  );
};

export default Footer;
