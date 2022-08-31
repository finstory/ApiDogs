import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CardDetalis } from "../components/details/CardDetalis";
import { CardLoading } from "../components/details/CardLoading";
import { getDogById } from "../store/action";

export const Details = () => {
  const dispatch = useDispatch();
  const getRedux = useSelector((state) => state);
  const {
    dogDetails: { dog, statusDogDetails },
    page,
  } = getRedux;

  // * get "pokemon" del params.
  const param = useParams();
  const dogId = param.dog.toLowerCase();

  useEffect(() => {
    dispatch(getDogById(dogId));
  }, []);

  return (
    <>
      <main className="container-main">
        <section className="container-detalis">
          {statusDogDetails === 200 ? (
            // * si todo ok, muestra los detalles del dog.
            <CardDetalis {...dog} />
          ) : (
            // $  sino, esperamos o manejamos el error 404 aquí.
            <CardLoading status={statusDogDetails} />
          )}
        </section>
        <NavLink to={`/home/${page}`} className="details-back anim-opacity">
          BACK
        </NavLink>
      </main>
    </>
  );
};
