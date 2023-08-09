import axios from "axios";
import { serviceAccount } from "./Auth.Service";
// definir linstance de connexion pour
// les url
// utiliser intercepteur de requete

const Axios = axios.create({
  baseURL: "https://backend-parent-enfant.onrender.com",
});

/* intercepteur de requete axios
  permet de changer les entetes https 
  pour y ajouter le token avant lenvoie
*/
Axios.interceptors.request.use((request) => {
  if (serviceAccount.isLogger()) {
    //si luser est connecte, on injecte le token dans lentete de la requete
    request.headers.Authorization = "Bearer " + serviceAccount.getToken();
  }

  return request;
});
export default Axios;
