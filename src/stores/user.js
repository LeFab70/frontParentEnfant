import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: [{
    name: "",
    role: "",
  }],
  reducers: {
    addUser: (state, action) => {
      const oneUser = action.payload;
      return {...state,  ...oneUser };
    },
  },
});
export const { addUser } = userSlice.actions;

export default userSlice.reducer;
