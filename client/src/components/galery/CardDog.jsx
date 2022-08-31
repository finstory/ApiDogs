import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { savePage } from "../../store/action";

export const CardDog = ({ id, name, image, temperament, weight, page }) => {
  // const { afterPosition } = useServices();
  const dispatch = useDispatch();

  const firstUpperCase = (list) => {
    return list
      .split(" ")
      .map((string) => string.charAt(0).toUpperCase() + string.slice(1))
      .toString()
      .replace(/,/g, " ");
  };
  
  name = firstUpperCase(name);
  temperament = firstUpperCase(temperament);

  if (temperament && temperament.length > 90)
    temperament = temperament.substring(0, 90) + "...";

  return (
    <div className="container-card anim-earthquake">
      <div className="card">
        <div className="front">
          <div className="front-img">
            <img src={image} alt={name} />
          </div>
          <div>
            <p>{name}</p>
          </div>
        </div>
        <div className="back">
          <div style={{ height: "45%" }}>
            <p>
              <span style={{ color: "rgba(221, 208, 185, 0.749)" }}>
                Temperaments:
              </span>
              <br />
              {temperament}
            </p>
          </div>
          <div style={{ height: "55%" }}>
            <p>
              <span style={{ color: "rgba(221, 208, 185, 0.749)" }}>
                Weigth:
              </span>{" "}
              <br /> {weight + " Kg"}
            </p>
            <NavLink
              className="back__button"
              to={`/details/${id}`}
              onClick={() => {
                dispatch(savePage(page));
              }}
            >
              Details
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
