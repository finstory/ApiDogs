import { Route, Routes } from "react-router-dom";

import { LandPage } from "../pages/LandPage";

import { DogRouter } from "./DogRouter";
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandPage />} />
      <Route path="/*" element={<DogRouter />} />
    </Routes>
  );
};
