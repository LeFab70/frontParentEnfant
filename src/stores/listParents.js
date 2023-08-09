import { createSlice } from "@reduxjs/toolkit";
export const parentsListSlice = createSlice({
  name: "parentList",
  initialState: {
    parents: [],
  },
  reducers: {
    addParentList: (state, action) => {
      //console.log(action.payload)
      state.parents = state.parents.filter((b) => b.id !== action.payload.id);
      state.parents.push(action.payload);
    },
    updateParent: (state, action) => {
      state.parents = state.parents.filter((b) => b.id !== action.payload.id);

      // const oneParent = action.payload;
      // console.log("oneparent:");
      // console.log(oneParent);
      // const pp = state.find((parent) => parent.id === oneParent.id);
      // if (pp) pp.fname = oneParent.fname; //return { ...state, ...oneParent }
      // else state.parents.push(action.payload);
      //return { ...state, ...oneParent };
    },
    clearList: (state) => {
      state.parents = []
      console.log(state.parents);
    },
  },
});
export const { addParentList, updateParent, clearList } =
  parentsListSlice.actions;

export default parentsListSlice.reducer;
