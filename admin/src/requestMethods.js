import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmFkNGJhZTMzZmUzN2RiYzA0YWMwNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NTM4NDA0MiwiZXhwIjoxNjQ1NjQzMjQyfQ.u6tgrIUiJ7iMSPRvzsNNxe71eZAnoysvS1zrAdY_030"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` }
});