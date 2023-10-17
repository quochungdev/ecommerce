import axios from "axios";

export const getDistrictsByProvince = (provinceCode) => {
  return axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
};