import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import UploadJsonPage from "./pages/UploadJsonPage";
import React from "react";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/upload" element={<UploadJsonPage />} />
    </Routes>
  );
};

export default App;
