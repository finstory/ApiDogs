import React from "react";
import { NavLink } from "react-router-dom";

export const LandPage = () => {
  return (
    <div className="container-landing-page anim-start-landing">
      <div className="card-landing anim-translate-to-down">
        <div className="card-landing__text anim-showing">
          "Everyone thinks they have the best dog.
          <br /> And none of them are wrong." <br />
          <br />- W.R.Purche -
        </div>
        <div className="card-landing__button anim-showing">
          <NavLink className="card-landing__button-navlink" to="./home/1">
            Search Your Dogs
          </NavLink>
        </div>
      </div>
    </div>
  );
};
