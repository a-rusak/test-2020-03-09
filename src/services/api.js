import axios from "axios";

const config = {
  baseURL: "data/",
  responseType: "json"
};

const instance = axios.create(config);

const transformResponse = data => {
  return data;
};

export const loadToc = () =>
  instance.get("toc.json", {
    transformResponse
  });
