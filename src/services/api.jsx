import axios from "axios";

const api = axios.create({baseURL: "https://apipw2if.herokuapp.com"});

export default api;