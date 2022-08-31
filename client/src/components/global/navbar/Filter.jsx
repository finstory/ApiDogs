import { useEffect } from "react";
import { useForm } from "../../../hooks/useForm";
import { useNav } from "../../../hooks/useNav";
import { useDispatch, useSelector } from "react-redux";
import { filterDogs } from "../../../store/action";
import SvgSearch from "../../../assets/svg/svgSearch";
import SvgBreed from "../../../assets/svg/svgBreed";

export const Filter = () => {
  const dispatch = useDispatch();
  const getRedux = useSelector((state) => state);
  const {
    listDogs: { list },
    listBreeds,
  } = getRedux;
  const [inputValue, handleInputChange] = useForm({
    breed: "",
    temperament: "",
    order: "none",
    from: "none",
  });
  const { order, temperament, breed, from } = inputValue;
  const breedOk = breed.charAt(0).toUpperCase() + breed.slice(1);
  const { goHome } = useNav();

  const submitSearchBreed = (e) => {
    e.preventDefault();
    dispatch(filterDogs(list, listBreeds, order, temperament, from, breedOk));
    goHome(); // * regresa al home, hay paguinas que no existen al filtrar.
  };

  // * cualquier cambio en los fitros los activará.
  useEffect(() => {
    if (list.length) {
      if (listBreeds.length)
        dispatch(filterDogs(list, listBreeds, order, temperament, from));
      // * punto inicial, filtro "breed" desactivado.
      else dispatch(filterDogs(list, list, order, temperament, from));

      // afterPosition(); // ? opcional.
      goHome();
    }
  }, [order, temperament, from]);

  // * reset filtro "breed".
  useEffect(() => {
    if (list.length) {
      if (breed === "") {
        dispatch(
          filterDogs(list, listBreeds, order, temperament, from, "none")
        );
        goHome();
      }
    }
  }, [breed]);

  return (
    <>
      {/* // * Search Breeds} */}
      <form className="search-bar" onSubmit={submitSearchBreed}>
        <div className="search-bar-input">
          <input
            type="search"
            name="breed"
            placeholder="Breeds..."
            aria-label="search your breed"
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="search-bar-label"
          onClick={submitSearchBreed}
        >
          <SvgBreed />
        </button>
      </form>

      {/* // * Temperaments} */}
      <form className="search-bar">
        <div className="search-bar-input">
          <input
            type="search"
            name="temperament"
            placeholder="Temperaments..."
            aria-label="search your temperaments"
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="search-bar-label"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <SvgSearch />
        </button>
      </form>

      {/* // * From} */}
      <div className="nav-link">
        <div className="selector">
          <div className="selector-label">
            <p>From</p>
          </div>
          <div className="selector-input">
            <select name="from" onChange={handleInputChange}>
              <option value="all"> ✱ None</option>
              <option value="api">🌏 Api</option>
              <option value="yours">​👁️‍🗨️ Yours</option>
            </select>
          </div>
        </div>
      </div>

      {/* // * Order By } */}
      <div className="nav-link">
        <div className="selector">
          <div className="selector-label input-order">
            <p>Order</p>
          </div>
          <div className="selector-input">
            <select name="order" onChange={handleInputChange}>
            <option value="none">✱ None</option>
              <option value="namedown">🡻 Name</option>
              <option value="nameup">🡹 Name</option>
              <option value="weightup">🡹 Weight</option>
              <option value="weightdown">🡻 Weight</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
