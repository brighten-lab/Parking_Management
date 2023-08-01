import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CCTVPlayer from "./Rtsp";
import Main from "./page/Main"

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/cctv" element={<CCTVPlayer />} />
    </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
