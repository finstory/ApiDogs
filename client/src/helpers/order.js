export const orderByProps = (list, props = "name", orderBy = "asc") => {

    return list.sort((a, b) => {

        switch (props) {
            case "name":
                a = a.name; b = b.name;
                break;

            default:
                if (!a.middle) a = 99;
                else a = a.middle;
                if (!b.middle) b = 99;
                else b = b.middle;
                break;
        }

        if (a === b) return 0;

        switch (orderBy) {
            case "des":
                if (a < b) return -1;
                return 1;
            default:
                if (a > b) return -1;
                return 1;
        }
    })
}

export const filterByTemperaments = (list, temperamentQuery) => {

    if (temperamentQuery === "") return list;
    const listFilter = list.filter(obj => obj.temperament.includes(temperamentQuery));

    if (!listFilter.length) return undefined;
    else return listFilter;

}

export const filterByFrom = (list, props = "all") => {

    switch (props) {
        case "api":
            return list = list.filter(obj => obj.from_BD === false);

        case "yours":
            return list = list.filter(obj => obj.from_BD === true);

        default:
            return list;
    }

}