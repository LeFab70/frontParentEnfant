import Axios from "./Caller.Service";
//import { toast } from "react-toastify";
const login = (credential) => {
  // console.log(credential)
  return Axios.post("/login", credential);
};
const saveToken = (token) => {
  localStorage.setItem("token", token);
};
const logout = () => {
  localStorage.removeItem("token");
 
};
const isLogger = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const getToken = () => {
  return localStorage.getItem("token");
};
export const serviceAccount = {
  saveToken,
  logout,
  isLogger,
  login,
  getToken,
};
