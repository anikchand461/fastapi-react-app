import axios from "axios";

const api = axios.create({
  baseURL: "https://fastapi-react-app-e1i2.onrender.com",
});

export default api;
