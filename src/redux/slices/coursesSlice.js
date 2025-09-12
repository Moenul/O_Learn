import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCourses = createAsyncThunk(
    "courses/fetchCourses",
    async () => {
        const res = await axios.get("http://localhost:4000/courses");
        return res.data;
    }
);

const coursesSlice = createSlice({
    name: "courses",
    initialState: { list: [], status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (s) => {
                s.status = "loading";
            })
            .addCase(fetchCourses.fulfilled, (s, a) => {
                s.status = "success";
                s.list = a.payload;
            })
            .addCase(fetchCourses.rejected, (s, a) => {
                s.status = "failed";
                s.error = a.error.message;
            });
    },
});

export default coursesSlice.reducer;
