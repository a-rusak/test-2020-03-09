import axios from "axios";
import { AppConfig } from "../AppConfig";

const config = {
  baseURL: AppConfig.BASE_URL,
  responseType: "json"
};

const http = axios.create(config);

export const loadToc = () => http.get("toc.json");

export const loadSection = id =>
  http.get(`content-${id}.html`, {
    responseType: "text"
  });

export const saveSection = ({ id, content }) =>
  http.post(`save`, {
    id,
    content
  });
