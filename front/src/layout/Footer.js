import React from "react";
import styled from "styled-components";
import "../style/Footer.css";

const FooterButton = styled.button`
  background-color: #1362b2;
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
  @media (max-width: 1200px) {
    width: 160px;
    height: 50px;
    font-size: 13px;
  }
  @media (min-width:1200px) and (max-width:1500px){
    width: 95%;
    height: 50px;
    font-size: 13px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 4px;
  margin-left: 285px;
  margin-right: 220px;
`;

const Footer = ({ onButtonClick, availA, availB}) => {
  const data = [
    { title: "주차장9", link: "/", avail: availA },
    { title: "옥산공영주차장", link: "/B", avail: availB  },
    { title: "남천둔차공영주차장", link: "/" , avail: availA },
    { title: "남매그린공원공영주차장", link: "/", avail: availA  },
    { title: "계양공영주차장", link: "/", avail: availA  },
    { title: "임당역환승공영주차장", link: "/", avail: availA  },
    { title: "신대리1공영주차장", link: "/", avail: availA  },
    { title: "한마음길노상공영주차장", link: "/", avail: availA  },
  ];

  const buttonClick = (title) => {
    onButtonClick(title);
  };

  return (
    <footer>
      <GridContainer>
        {data.map((item, index) => (
          <FooterButton key={index} to={item.link} onClick={() => buttonClick(item.title)}>
            <span>{item.title}</span>
            <span className="num">현재주차가능:{item.avail}</span>
          </FooterButton>
        ))}
      </GridContainer>
    </footer>
  );
};

export default Footer;
