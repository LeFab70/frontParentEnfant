import { createSlice } from "@reduxjs/toolkit";
export const periodeEncours = createSlice({
  name: "periodeEncours",
  initialState: {
    dateDebut: "",
    dateFin: "",
    close: "",
    idPeriodEncours: "",
  },
  reducers: {
    addPeriod: (state, action) => {
      state.question = action.payload;
    },
  },
});
export const { addPeriod } = periodeEncours.actions;

export default periodeEncours.reducer;
