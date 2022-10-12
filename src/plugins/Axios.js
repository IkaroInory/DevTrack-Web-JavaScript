import axios from "axios";

const _axios = axios.create({
    baseURL: "http://localhost:8181",
    timeout: 2000
});

export default _axios;
