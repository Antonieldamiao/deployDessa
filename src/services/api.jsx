import { Http } from "@material-ui/icons";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.React_APP_API_URL
});

export default api;