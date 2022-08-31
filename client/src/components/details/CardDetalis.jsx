import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

// ! - usar valores default para evitar valores undefined en etiquetas.
export const CardDetalis = ({
  name = "",
  image = "",
  temperament = "",
  weight = "",
  height = "",
  life_span = "",
}) => {
  const firstUpperCase = (list) => {
    return list
      .split(" ")
      .map((string) => string.charAt(0).toUpperCase() + string.slice(1))
      .toString()
      .replace(/,/g, " ");
  };
  
  name = firstUpperCase(name);
  return (
    <>
      <div className="card-detalis anim-opacity ">
        <div className="detalis-wrapper">
          <div className="wrapper-front-img ">
            <img className="anim-earthquake" src={image} alt="" />
          </div>
        </div>
        <div className="detalis-wrapper anim-earthquake">
          <strong>{name}</strong>
          <div className="detalis-wrapper-info">
            <p>
              <span>Weigth:</span> <br /> {weight} kg
            </p>
            <p>
              <span>Life Span:</span> <br /> {life_span}
            </p>
            <p>
              <span>Heigth:</span> <br /> {height} ft
            </p>
          </div>
          <p>
            <span>Temperaments:</span>
            <br />
            {temperament}
          </p>
        </div>
      </div>
    </>
  );
};
