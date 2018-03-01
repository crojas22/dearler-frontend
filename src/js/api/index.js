// const apiUrl = "http://localhost:8080/api/";
const apiUrl = "https://dealer-back.herokuapp.com/api/";

export const fetchDataApi = (url, method) => {
    return fetch(apiUrl + url, {
        method: method
    })
        .then(response => {
            return response.json()
        })
};

export const sendDataApi = (url, data, method) => {
    return fetch(apiUrl + url, {
        method: method,
        body: JSON.stringify(data),
        headers: new Headers({'Content-Type': 'application/json'})
    })
};