import axios from "axios";

const config = {
  baseURL: "data/",
  responseType: "json"
};

const instance = axios.create(config);

export const loadToc = () => instance.get("toc.json");

export const loadSection = id =>
  instance.get(`content-${id}.html`, {
    responseType: "text"
  });
