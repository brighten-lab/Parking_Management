import React, { useState } from "react";
import A from "./A";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Main = () =>{
    const [text, setText] = useState("주차장9");

    const btnclick = (title) => {
        setText(title);
      };

    return(
        <>
        <Header text={text}/>
        <A />
        <Footer onButtonClick={btnclick} />
        </>
    )
}
export default Main