import Axios from "./Caller.Service";

//get les volets
export const getPeriods = async () => {
  const { data } = await Axios.get("/periode")
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
export const addPeriods = async (post) => {
  const postData = await Axios.put("/periode", post)
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
export const deletePeriods = async (id) => {
  if (!id) return Promise.reject("Data is not provided...");

  const data = await Axios.delete(`/periode/${id}`);

  // fetch(`http://localhost:3200/posts/${idPost}`, {
  //   method: "DELETE",
  //   //body: JSON.stringify(idPost),
  //   headers: { "content-type": "application/json" },
  // });
  return data;
};

//delete le volet
export const alterPeriods = async (id) => {
 // if (!id) return Promise.reject("Data is not provided...");
  //const data = args[1];
 //console.log(...args[0]);
  //console.log( args);
  //console.log( args[0]);
 // console.log(...data);
  if (!id) return Promise.reject("Data is not provided...");
  //console.log("volet:__");
  //console.log(data);
  console.log( id);
  const dataPatch = await Axios.patch(`/periode/${id}`)
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
