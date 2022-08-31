import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Details } from "../pages/Detalis";
import { Navbar } from "../components/global/navbar/Navbar";
import { CreateDog } from "../pages/CreateDog";
import { Footer } from "../components/global/footer/Footer";

export const DogRouter = () => {
  return (
    <>
      <div className="anim-start-landing container-global">
        <Navbar />
        <Routes>
          <Route path="home/:page" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="createdog" element={<CreateDog />} />
          <Route path="details/:dog" element={<Details />} />
        </Routes>
        <Footer/>
      </div>
    </>
  );
};
