import { orderByProps, filterByTemperaments, filterByFrom } from "../helpers/order";

const initialState = {

    listDogs: { list: [], statusListDogs: 0 },
    listBreeds: [],
    dogsFilter: { listFilter: [], statusFilter: 0 },
    dogDetails: { dog: [], statusDogDetails: 0 },
    temperaments: [],
    page: 1,
    position: 0,

};
const appReducer = (state = initialState, { payload, type }) => {

    switch (type) {

        case "GET_ALL_DOGS":
            return {
                ...state,
                listDogs: {
                    list: payload.data,
                    statusListDogs: payload.status
                },
                listBreeds: payload.data,
            };

        case "GET_DOG_BY_ID":
            return {
                ...state,
                dogDetails: {
                    dog: payload.data,
                    statusDogDetails: payload.status
                },
            };

        case "GET_ALL_TEMPERAMENTS":
            return {
                ...state,
                temperaments: payload
            };

        case "DOGS_FILTER":
            return {
                ...state,
                dogsFilter: {
                    listFilter: payload.data,
                    statusFilter: payload.status
                }
            };

        case "DOGS_BREED_FILTER":
            return {
                ...state,
                listBreeds: payload.data,
            };

        case "SET_FILTER":
            const { list, listBreed, order, temperament, from, breed } = payload;

            let listResults = [...listBreed];
            let status = 0;

            // * reset de mi filtro "breed".
            console.log(listResults)
            if (breed === "none") {
                state.listBreeds = [];
                listResults = [...list];
            }
            // * filtro por ordemiento.
            switch (order) {
                case "namedown":
                    listResults = orderByProps(listResults, "name", "des");
                    break;
                case "weightup":
                    listResults = orderByProps(listResults, "pes", "asc");
                    break;
                case "weightdown":
                    listResults = orderByProps(listResults, "pes", "des");
                    break;
                case "nameup":
                    listResults = orderByProps(listResults, "name", "asc");
                    break;
                default:
                    listResults = !state.listBreeds.length ? list : listBreed;
                    break;

            }

            // * filtro por temepramento.
            listResults = filterByTemperaments(listResults, temperament);

            listResults = filterByFrom(listResults, from);

            if (listResults) status = 200;
            else status = 404;

            return {
                ...state,
                dogsFilter: {
                    listFilter: listResults,
                    statusFilter: status
                }
            };

        case "SAVE_PAGE":
            return {
                ...state,
                page: payload,
            };

        default:
            return state;
    }
};

export default appReducer;
