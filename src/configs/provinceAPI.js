import axios from "axios";

export const getProvinces = () => {
  return axios.get("https://provinces.open-api.vn/api/?depth=1");
};
