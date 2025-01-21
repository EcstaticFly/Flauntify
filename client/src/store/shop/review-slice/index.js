import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: []
};

export const getReviews = createAsyncThunk(
  "/order/getReviews",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/review/${id}`
    );

    return response.data;
  }
);
export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formData) => {
    const response = await axios.post(
      'http://localhost:5000/api/shop/review/add',formData
    );

    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      })
  },
});
export default reviewSlice.reducer;
