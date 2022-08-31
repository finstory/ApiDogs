import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNav } from "../../hooks/useNav";

export const CardLoading = ({ status, name }) => {
  const page = useSelector((state) => state.page);

  return (
    <>
      <div className="card-detalis anim-opacity ">
        <div className="detalis-wrapper">
          <div className="wrapper-front-img">
            <img
            className="loading anim-earthquake"
              src="https://i.postimg.cc/BvkPyKsb/loading.gif"
              alt=""
              style={{scale:"0.8",boxShadow: "0px 0px"}}
            />
          </div>
        </div>
        <div className="detalis-wrapper">
          {
            // * mientras busco, estoy en loading...
            status === 0 ? (
              <strong>{"Loading..."}</strong>
            ) : (
              // * sino, recibo status 404 y lo muetro en pantalla...
              <strong style={{color: "rgba(128, 23, 13, 0.926)",fontSize:"70px"}}>{"Not Found..."}</strong>
            )
          }


        </div>
      </div>
    </>
  );
};
