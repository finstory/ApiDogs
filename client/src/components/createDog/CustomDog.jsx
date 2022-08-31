import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useManagerText } from "../../hooks/useManagerText";
import { useNav } from "../../hooks/useNav";
import { getAllDogs, getAllTemperaments } from "../../store/action";
import { allValidate, minValue } from "../../helpers/validation";
import { AlertError } from "./AlertError";
const axios = require("axios");

export const CustomDog = () => {
  const dispatch = useDispatch();
  const getRedux = useSelector((state) => state);
  const { temperaments, page } = getRedux;
  const { goHome } = useNav();
  const { firsUpperCase } = useManagerText();

  const [viewTemp, setViewTemp] = useState(false); // ? off/on alert temp.
  const [openError, setOpenError] = useState({}); // ? off/on alert errors.
  const [showTempe, setShowTempe] = useState([]); // ? ver temp.
  const [queryTempe, setQueryTempe] = useState([]);
  const [listValidate, setListValidate] = useState([]);
  const [inputValue, handleInputChange, reset] = useForm({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    minLife: "",
    maxLife: "",
    breed_group: "",
    temperament: [""],
    image: "",
  });

  let { minLife, maxLife, temperament, image } = inputValue;

  // * compruebo que todas las validaciones se cumplan.
  const allValidatesOK = () => {
    let list = allValidate(inputValue, queryTempe, temperaments);
    list = list.filter((obj) => obj.condition === false);
    if (!list.length) return true;
    else return false;
  };

  const submitPostDog = async () => {
    if (allValidatesOK()) {
      // * si todo ok, realizo la petición y regreso al home.
      const doge = {
        ...inputValue,
        temperament: queryTempe,
      };

      const instance = {
        method: "post",
        url: "https://facu-neutral-node-js.herokuapp.com/dogs",
        headers: {
          "Content-Type": "application/json",
        },
        data: doge,
      };
      axios(instance).catch(function (error) {
        console.log(error);
      });
      goHome();
      setTimeout(() => {
        dispatch(getAllDogs());
      }, 1000);
    }
  };

  //* Manejo de ventana temperamentos */

  const addTemperament = (e, t) => {
    e.preventDefault();

    if (t && !queryTempe.includes(t)) setQueryTempe([...queryTempe, t]);

    if (showTempe.length === 1 && !queryTempe.includes(showTempe[0])) {
      setQueryTempe([...queryTempe, ...showTempe]);
      reset();
    }
  };

  const managerAlert = (e, bool) => {
    e.preventDefault();
    setViewTemp(bool);
  };

  //? Opcional, muestra de errores en los inputs */
  const errorOnFocus = ({ target }) => {
    const name = target.name;
    setOpenError({ ...openError, [name]: true });
  };

  const errorBlur = ({ target }) => {
    const name = target.name;
    setOpenError({ ...openError, [name]: false });
  };

  const typeExists = (type) => {
    const list = listValidate.filter(
      (obj) => obj.type === type && obj.condition === false
    );
    if (list.length) return true;
    else return false;
  };

  useEffect(() => {
    setListValidate(allValidate(inputValue, queryTempe, temperaments));
    console.log(queryTempe);
  }, [JSON.stringify(inputValue), queryTempe]);

  useEffect(() => {
    !temperaments.length && dispatch(getAllTemperaments());
  }, []);

  useEffect(() => {
    temperament === "" && setShowTempe(temperaments);
    setShowTempe(
      temperaments.filter((string) => string.includes(temperament)).slice(0, 5)
    );
  }, [temperament, temperaments]);

  return (
    <>
      <section
        className="container-detalis"
        onKeyDown={(e) => {
          if (e.keyCode === 27) managerAlert(e, false);
        }}
      >
        {viewTemp && (
          <div className="alert-temperament anim-earthquake">
            <form
              className="search-temp anim-earthquake"
              onSubmit={addTemperament}
            >
              <div className="search-temp-input">
                <input
                  type="search"
                  name="temperament"
                  placeholder="Search your Temperaments..."
                  autoComplete="off"
                  value={temperament}
                  onChange={handleInputChange}
                  onFocus={errorOnFocus}
                  onBlur={errorBlur}
                />
              </div>
              <button
                type="submit"
                className="search-temp-label"
                onClick={addTemperament}
              >
                Adder
              </button>
            </form>

            <div className="alert-temperament__wrapper">
              {showTempe.length
                ? showTempe.map((temp) => (
                    <div
                      key={temp}
                      className="label-temeprament temperament-serach anim-opacity"
                      onClick={(e) => {
                        addTemperament(e, temp);
                      }}
                    >
                      {firsUpperCase(temp)}
                    </div>
                  ))
                : ""}
            </div>

            <div className="alert-temperament__wrapper">
              {queryTempe.length
                ? queryTempe.map((temp) => (
                    <div
                      key={temp}
                      className="label-temeprament-selected anim-opacity"
                    >
                      <div className="selected-text">{firsUpperCase(temp)}</div>
                      <div
                        className="selected-button"
                        onClick={() => {
                          setQueryTempe(
                            queryTempe.filter((string) => string !== temp)
                          );
                        }}
                      >
                        X
                      </div>
                    </div>
                  ))
                : ""}
            </div>

            <button
              className="alert-temperament__close"
              onClick={(e) => managerAlert(e, false)}
            >
              Close
            </button>
          </div>
        )}
        <div className="card-detalis ">
          <div className="create-wrapper anim-earthquake">
            <p>
              <span>Breed:</span> <br />
              <input
                className={`input-breed ${
                  typeExists("breed_group") && "input-error"
                }`}
                type="search"
                name="breed_group"
                placeholder="Doberman..."
                autoComplete="off"
                onChange={handleInputChange}
                onFocus={errorOnFocus}
                onBlur={errorBlur}
              />
              {openError.breed_group && (
                <AlertError listValidate={listValidate} type={"breed_group"} />
              )}
              <br />
            </p>

            <div className="create-front-img">
              <p>
                <span>Image:</span> <br />
                <input
                  className="input-image"
                  type="search"
                  name="image"
                  placeholder="http//www.dog...jpg"
                  onChange={handleInputChange}
                  onFocus={errorOnFocus}
                  onBlur={errorBlur}
                />
                {openError.image && (
                  <AlertError listValidate={listValidate} type={"image"} />
                )}
              </p>

              <img
                src={
                  !image
                    ? "https://www.quicideportes.com/assets/images/custom/no-image.png"
                    : image
                }
                alt=""
              />
            </div>
          </div>

          <form className="create-wrapper anim-earthquake">
            <p>
              <span>Name:</span> <br />
              <input
                className={`input-name ${
                  typeExists("name") ? "input-error" : ""
                }`}
                type="search"
                name="name"
                placeholder="American Cocker..."
                autoComplete="off"
                onChange={handleInputChange}
                onFocus={errorOnFocus}
                onBlur={errorBlur}
              />
              {openError.name && (
                <AlertError listValidate={listValidate} type={"name"} />
              )}
              <br />
            </p>
            <div className="create-wrapper-info">
              <p>
                <span>Weigth:</span> <br />{" "}
                <input
                  className={typeExists("minWeight") ? "input-error" : ""}
                  type="number"
                  name="minWeight"
                  min="1"
                  max="60"
                  placeholder="Min"
                  onChange={handleInputChange}
                  onFocus={errorOnFocus}
                  onBlur={errorBlur}
                />
                {openError.minWeight && (
                  <AlertError listValidate={listValidate} type={"minWeight"} />
                )}
                <input
                  className={typeExists("maxWeight") ? "input-error" : ""}
                  type="number"
                  name="maxWeight"
                  min="1"
                  max="60"
                  placeholder="Max"
                  onChange={handleInputChange}
                  onFocus={errorOnFocus}
                  onBlur={errorBlur}
                />
                {openError.maxWeight && (
                  <AlertError listValidate={listValidate} type={"maxWeight"} />
                )}
              </p>
              <p>
                <span>Heigth:</span> <br />{" "}
                <input
                  className={typeExists("minHeight") ? "input-error" : ""}
                  type="number"
                  name="minHeight"
                  min="1"
                  max="60"
                  placeholder="Min"
                  onChange={handleInputChange}
                  onFocus={errorOnFocus}
                  onBlur={errorBlur}
                />
                {openError.minHeight && (
                  <AlertError listValidate={listValidate} type={"minHeight"} />
                )}
                <input
                  className={typeExists("maxHeight") ? "input-error" : ""}
                  type="number"
                  name="maxHeight"
                  min="1"
                  max="60"
                  placeholder="Max"
                  onChange={handleInputChange}
                  onFocus={errorOnFocus}
                  onBlur={errorBlur}
                />
                {openError.maxHeight && (
                  <AlertError listValidate={listValidate} type={"maxHeight"} />
                )}
              </p>
              <p>
                <span>Life Span:</span> <br />{" "}
                <input
                  className={typeExists("minLife") ? "input-error" : ""}
                  type="number"
                  name="minLife"
                  min="1"
                  max="60"
                  placeholder="Min"
                  onChange={handleInputChange}
                  onFocus={errorOnFocus}
                  onBlur={errorBlur}
                />
                {openError.minLife && (
                  <AlertError listValidate={listValidate} type={"minLife"} />
                )}
                <input
                  className={typeExists("maxLife") ? "input-error" : ""}
                  type="number"
                  name="maxLife"
                  min="1"
                  max="60"
                  placeholder="Max"
                  onChange={handleInputChange}
                  onFocus={errorOnFocus}
                  onBlur={errorBlur}
                />
                {openError.maxLife && (
                  <AlertError listValidate={listValidate} type={"maxLife"} />
                )}
              </p>
            </div>
            <p>
              <span>Temperaments:</span>{" "}
              <button
                className="more-temeprament"
                onClick={(e) => managerAlert(e, true)}
              >
                ✏️
              </button>
              <AlertError listValidate={listValidate} type={"queryTempe"} />
            </p>
            <p style={{ fontSize: "20px" }}>
              {queryTempe.length
                ? queryTempe.map((temp) => <>{firsUpperCase(temp) + " "}</>)
                : ""}
            </p>
          </form>
        </div>
      </section>

      <NavLink to={`/home/${page}`} className="details-back anim-opacity">
        BACK
      </NavLink>

      <button
        className={`details-back create-dog-button anim-opacity ${
          !allValidatesOK() ? "create-dog-button-error" : ""
        }`}
        onClick={() => {
          submitPostDog();
        }}
      >
        CREATE DOG
      </button>
    </>
  );
};
