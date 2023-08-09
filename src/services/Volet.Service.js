import Axios from "./Caller.Service";

//get les volets
export const getVolets = async () => {
  const { data } = await Axios.get("/volets")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.message;
    });
  // fetch("http://localhost:3200/volets");
  //console.log("------0");
  //console.log(data)
  return data;
};

//create les volets
export const addVolet = async (post) => {
  const postData = await Axios.put("/volets", post)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
  //console.log(postData)
  return postData;
};
//   if (!post) return Promise.reject("Data is not provided...");

//   const data = await fetch("http://localhost:3200/posts", {
//     method: "POST",
//     body: JSON.stringify(post),
//     headers: { "content-type": "application/json" },
//   });
//   return data.json();

//delete les posts
export const deleteVolet = async (id) => {
  if (!id) return Promise.reject("Data is not provided...");

  const data = await Axios.delete(`/volets/${id}`);

  // fetch(`http://localhost:3200/posts/${idPost}`, {
  //   method: "DELETE",
  //   //body: JSON.stringify(idPost),
  //   headers: { "content-type": "application/json" },
  // });
  return data;
};

//delete le volet
export const alterVolet = async (...args) => {
  const { id, data } = args[0];
  //const data = args[1];
  //console.log(...args);
  // console.log( args[1]);
  //console.log( args[0]);
  //console.log(data);
  if (!id) return Promise.reject("Data is not provided...");
  //console.log("volet:__");
  //console.log(data);
  //console.log("id__:" + id);
  const dataPatch = await Axios.patch(`/volets/${id}`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  // fetch(`http://localhost:3200/posts/${idPost}`, {
  //   method: "DELETE",
  //   //body: JSON.stringify(idPost),
  //   headers: { "content-type": "application/json" },
  // });
  return dataPatch;
};
