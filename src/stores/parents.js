import { createSlice } from "@reduxjs/toolkit";
//import { PURGE } from "redux-persist";

// const initialState = {
//   details: {
//     id: "",
//     fname: "",
//     lname: "",
//     adress: "",
//     city: "",
//     province: "",
//     codePostal: "",
//     email: "",
//     phone: "",
//     birthday: "",
//     sourceRevenue: "",
//     language: "",
//     origineEthnique: "",
//     sexe: "",
//     tuteur: "",
//   },
//   listParent: [],
// };
//import storage from "redux-persist/lib/storage";
//import AsyncStorage from "@react-native-async-storage/async-storage";
export const parentsSlice = createSlice({
  name: "parent",

  initialState: {
    fname: "",
    lname: "",
    adress: "",
    city: "",
    province: "",
    codePostal: "",
    email: "",
    phone: "",
    birthday: "",
    sourceRevenue: "",
    language: "",
    origineEthnique: "",
    sexe: "",
    tuteur: "",
    niveauScolaire: "",
  },
  // extraReducers: (builder) => {
  //   builder.addCase(PURGE, (state) => {
  //     return state;
  //   });
  // },
  // extraReducers: (builder) => {
  //   builder.addCase(PURGE, () => {
  //     // return initialState;
  //   });
  // },
  // extraReducers: (builder) => {
  //   builder.addCase(PURGE, (state) => {
  //     customEntityAdapter.removeAll(state);
  //   });
  // },
  // extraReducers: (builder) => {
  //   builder.addCase(PURGE, (state) => {
  //     storage.remove("root");
  //   });
  // },

  reducers: {
    addParent: (state, action) => {
      const oneParent = action.payload;
      // const test = { ...state.details };
      // const testp = { ...state.details, ...oneParent };
      // console.log(oneParent, test, testp);
      return { ...state, ...oneParent };
      //state.push(action.payload);
      //   const pp = state.find((parent) => parent.id === oneParent.id);
      //  if(pp) pp.fname=oneParent.fname
      //   //return { ...state, ...oneParent };
    },
    // addParentList: (state, action) => {
    //   //const oneParent = action.payload;
    //   // console.log("oneparent:");
    //   // console.log(oneParent);
    //   //state.listParents.push({ ...action.payload });
    //   // console.log(state)
    //   console.log(state.listParent);
    //   // console.log(state.details);
    // },
    updateParent: (state, action) => {
      const oneParent = action.payload;
      console.log("oneparent:");
      console.log(oneParent);
      const pp = state.find((parent) => parent.id === oneParent.id);
      if (pp) pp.fname = oneParent.fname; //return { ...state, ...oneParent }
      else state.push(action.payload);
      //return { ...state, ...oneParent };
    },
  },
});
export const { addParent, updateParent } = parentsSlice.actions;

export default parentsSlice.reducer;
