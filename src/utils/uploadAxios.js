import axios from "axios";

const uploadApi = axios.create({
  baseURL: process.env.REACT_APP_URL_PHOTO
});

export default uploadApi;