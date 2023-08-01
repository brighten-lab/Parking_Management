import { BrowserRouter, Routes, Route as ReactRoute } from "react-router-dom";
import React from "react";
import CCTVPlayer from "./Rtsp";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/cctv" element={<CCTVPlayer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
