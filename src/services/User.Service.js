import Axios from "./Caller.Service";

const getAllUsers = async () => {
  const { data } = await Axios.get("/users");
  return data;
};

const getUser = async (uid) => {
  return await Axios.get("/users/" + uid);
};
const addUser = async (user) => {
  //console.log(user)
  return await Axios.put("/users", user);
};

export const serviceUsers = {
  getAllUsers,
  getUser,
  addUser,
};
