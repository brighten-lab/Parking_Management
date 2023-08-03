import React, { useState } from "react";
import A from "./A";
import B from "./B";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Main = () =>{
    const [text, setText] = useState("주차장9");
    const [availA, setAvailA] = useState(0); 
    const [availB, setAvailB] = useState(0); 
    let Show = null;

    const btnclick = (title) => {
        setText(title);
      };

    switch (text) {
        case "주차장9":
            Show = <A setAvail={setAvailA}/>;
          break;
        case "옥산공영주차장":
            Show = <B setAvail={setAvailB}/>;
          break;
        default:
            Show = <A setAvail={setAvailA}/>;
      }

    return(
        <>
        <Header text={text} />
        {Show}
        <Footer onButtonClick={btnclick}  availA={availA} availB={availB}/>
        </>
    )
}
export default Main