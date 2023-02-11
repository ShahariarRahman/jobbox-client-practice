import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobsFilteredBy: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleJobFilter: (state, action) => {
      if (!state.jobsFilteredBy.includes(action.payload)) {
        state.jobsFilteredBy.push(action.payload);
      } else {
        state.jobsFilteredBy = state.jobsFilteredBy.filter(
          (jobFilteredBy) => jobFilteredBy !== action.payload
        );
      }
    },
  },
});

export const { toggleJobFilter } = filterSlice.actions;
export default filterSlice.reducer;
