
export const useManagerText = () => {
    const upperCaseList = (list) => {
        return list.map((string) => string[0].toUpperCase() + string.substring(1));
    };

    const firsUpperCase = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    };
    // charAt(0).toUpperCase() + breed.slice(1);
    return { upperCaseList, firsUpperCase };

}
