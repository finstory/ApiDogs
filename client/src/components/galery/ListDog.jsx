import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { CardDog } from "./CardDog";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../../store/action";

export const ListDog = () => {
  const dispatch = useDispatch();
  const getRedux = useSelector((state) => state);
  const {
    listDogs: { list, statusListDogs },
    dogsFilter: { listFilter, statusFilter },
  } = getRedux;

  const [pagination, setPagination] = useState([]);

  // * get "page" del params.
  const param = useParams();
  const pageId = parseInt(param.page) || 1;

  // * Manejo del paguinado.
  const goPage = (page) => {
    if (!listFilter) setPagination([]);
    else
      setPagination(listFilter.slice(0 + 8 * (page - 1), 8 + 8 * (page - 1)));
  };

  // * altarnar el paginado ( -1 back, +1 next ).
  const handleNavegation = (num) => {
    goPage(pageId + num);
  };

  // * petición inicial a la api y registro de cambios al filtrar.
  useEffect(() => {
    !list.length && dispatch(getAllDogs()); // * peti. inicial.

    goPage(1); // * al filtrar, hay pag. que no existen.

  }, [JSON.stringify(listFilter)]);
  // * recarga de paguinado inicial.
  useEffect(() => {
    // $ se actualiza el paguinado según mi params ":page".
    statusListDogs === 200 && goPage(pageId);
  }, [statusListDogs]);

  // ? opcional, para recordar nuestra posiición Y anterior en el listado.
  // useEffect(() => {
  //   goPosition();
  // }, [pagination]);
  return (
    <>
      {pagination.length && statusFilter === 200 ? (
        pagination.map((dog) => <CardDog key={dog.id} {...dog} page={pageId} />)
      ) : statusFilter === 0 ? (
        <>
          <img
            className="loading"
            src="https://i.postimg.cc/BvkPyKsb/loading.gif"
            alt=""
            style={{ boxShadow: "0px 0px", padding: "70px" }}
          />
        </>
      ) : (
        <img
          src="https://i.postimg.cc/7h8QCHcK/error404.gif"
          alt="loading"
          className="loading anim-opacity"
          style={{ height: "60vh",imageRendering:"pixelated" }}
        />
      )}
      <div className="container-pagination">
        {pageId <= 1 ? (
          <div className="pagination__back disabled">BACK</div>
        ) : (
          <NavLink
            onClick={() => handleNavegation(-1)}
            to={`/home/${pageId - 1}`}
            className="pagination__back"
          >
            BACK
          </NavLink>
        )}
        <div className="pagination__id">
          <p>{pageId}</p>
        </div>

        {listFilter && listFilter.length <= pageId * 8 ? (
          <div className="pagination__next disabled">NEXT</div>
        ) : (
          <NavLink
            onClick={() => handleNavegation(1)}
            to={`/home/${pageId + 1}`}
            className="pagination__next"
          >
            NEXT
          </NavLink>
        )}
      </div>
    </>
  );
};
