import { createSlice } from "@reduxjs/toolkit";
export const childSlice = createSlice({
  name: "child",
  initialState: {
    question: "",
    reponse: "",

    autorization_picture: "",
    health_info: "",
    details_health: "",
    allergies_connues: "",
    restrictions_foods: "",
    medicaments: "",
    eat_alone: "",
  },
  reducers: {
    addChild: (state, action) => {
      state.question = action.payload;
    },
  },
});
export const { addChild } = childSlice.actions;

export default childSlice.reducer;
