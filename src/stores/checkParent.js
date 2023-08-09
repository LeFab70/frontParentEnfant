import { createSlice } from "@reduxjs/toolkit";
export const checkParent = createSlice({
  name: "checkParent",
  initialState: {
    isOk: 2,
  },

  reducers: {
    switchParent: (state, action) => {
      //state.push(action.payload);
      const oneMember = action.payload;
      return { ...state, ...oneMember };
      //   const pp = state.find((parent) => parent.id === oneParent.id);
      //  if(pp) pp.fname=oneParent.fname
      //   //return { ...state, ...oneParent };
    },
    discrimentParent: (state) => {
      state.isOk--;
    },
  },
});
export const { switchParent, discrimentParent } = checkParent.actions;

export default checkParent.reducer;
