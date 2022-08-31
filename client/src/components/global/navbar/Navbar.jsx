import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNav } from "../../../hooks/useNav";
import { Filter } from "./Filter";
export const Navbar = () => {
  const { goHome } = useNav();

  const handleNavigate = () => {
    goHome(); // * redirecciona al home.
    window.location.reload(false); // * justo al volver, recargar la pag.
  };

  return (
    <nav className="anim-showing">
      <div className="nav-logo">
        <NavLink to="/home/1" onClick={handleNavigate}>
          <img src="https://i.postimg.cc/7P2q8NP9/login.png" alt="2s" />
        </NavLink>
      </div>
      <div className="nav-link">
        <div className="nav-link__create-dog">
        <NavLink to="/createdog">
          <button type="submit">Create Dog</button>
          </NavLink>
        </div>
      </div>

      <Filter />

    </nav>
  );
};
