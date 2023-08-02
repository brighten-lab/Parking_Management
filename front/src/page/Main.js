import React, { useState } from "react";
import A from "./A";
import B from "./B";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Main = () =>{
    const [text, setText] = useState("주차장9");

    const btnclick = (title) => {
        setText(title);
      };

    let Show = null;

    switch (text) {
        case "주차장9":
            Show = <A />;
          break;
        case "옥산공영주차장":
            Show = <B />;
          break;
        default:
            Show = <A />;
      }

    return(
        <>
        <Header text={text} />
        {Show}
        <Footer onButtonClick={btnclick} />
        </>
    )
}
export default Main