import axios from "axios";
const url = "http://localhost:3000";

const userApi = axios.create({
  baseURL: `${url}/auth/v1/user`,
  withCredentials: true,
});

const noteApi = axios.create({
  baseURL: `${url}/api/v1/note`,
  withCredentials: true,
});

export { url, userApi, noteApi };
