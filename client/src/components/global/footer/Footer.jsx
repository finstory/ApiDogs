import { Redirect } from "react";
import { Link, NavLink } from "react-router-dom";
export const Footer = () => {
  return (
    <footer className="container-footer anim-showing">
      <div className="footer">
        Powered By
        <a
          href="https://www.linkedin.com/in/facundo-alvarez-983147238/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facu Neutral
        </a>
        © 2022.
      </div>
    </footer>
  );
};
