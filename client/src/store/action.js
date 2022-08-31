const GET_ALL_DOGS = "GET_ALL_DOGS";
const GET_DOG_BY_ID = "GET_DOG_BY_ID";
const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
const DOGS_FILTER = "DOGS_FILTER";
const DOGS_BREED_FILTER = "DOGS_BREED_FILTER";
const SET_FILTER = "SET_FILTER";
const SAVE_PAGE = "SAVE_PAGE";

const axios = require('axios');

export const getAllDogs = () => {
    return async function (dispatch) {
        try {
            const intance = axios.create({
                baseURL: "https://facu-neutral-node-js.herokuapp.com/dogs"
            });

            const { data, status } = await intance.get();


            dispatch({ type: GET_ALL_DOGS, payload: { data, status } })
            dispatch({ type: DOGS_FILTER, payload: { data, status: 200 } })
        } catch (error) {
            const { response: { status } } = error;
            dispatch({ type: GET_ALL_DOGS, payload: { status } })
        }
    };
};

export const getDogById = (id) => {
    return async function (dispatch) {
        try {
            dispatch({ type: GET_DOG_BY_ID, payload: { status: 0 } });
            const intance = axios.create({
                baseURL: `https://facu-neutral-node-js.herokuapp.com/dogs/${id}`
            });

            const { data, status } = await intance.get();

            dispatch({ type: GET_DOG_BY_ID, payload: { data, status } })

        } catch (error) {
            const { response: { status } } = error;
            dispatch({ type: GET_DOG_BY_ID, payload: { status } })

        }
    };
};

export const getAllTemperaments = () => {
    return async function (dispatch) {
        try {
            const intance = axios.create({
                baseURL: `https://facu-neutral-node-js.herokuapp.com/temperaments`
            });

            const { data } = await intance.get();

            dispatch({ type: GET_ALL_TEMPERAMENTS, payload: data })

        } catch (error) {
            console.log(error);
        }
    };
};

// * filtrado en cadena para evitar pisar otros filtros aplicados.
export const filterDogs = (list, listBreed, order, temperament, from, breed) => {
    return async function (dispatch) {

        // * si el filtro "breed" se solicita, lo buscamos en el back end.
        if (breed && breed !== "none") {
            try {

                // ? status en loading...
                dispatch({ type: DOGS_FILTER, payload: { status: 0 } });

                const intance = axios.create({
                    baseURL: "https://facu-neutral-node-js.herokuapp.com/dogs",
                    params: { name: breed }
                });

                const { data } = await intance.get();

                // $ almaceno la petición hasta que se necesite, por lo que al activar otro filtro se evita peticiones innecesearias.

                dispatch({ type: DOGS_BREED_FILTER, payload: { data } });

                listBreed = data;

                if (!data.length) throw new Error();

            } catch (e) {
                // ! si falla la petición o queda la lista vacía, entonces devuevlo error 404 y dejo mis filtros vaciós.
                dispatch({ type: DOGS_FILTER, payload: { data: [], status: 404 } })
                return;
            }
        }
        if (!listBreed.length) listBreed = list;
        dispatch({ type: SET_FILTER, payload: { list, listBreed, order, temperament, from, breed } })
    };
};

export const savePage = (page) => {
    return function (dispatch) {
        dispatch({ type: SAVE_PAGE, payload: page })
    };
};