import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("user/login", async (creds) => {
    const res = await axios.get(
        `http://localhost:4000/users?email=${creds.email}&password=${creds.password}`
    );
    if (res.data.length === 0) throw new Error("Invalid credentials");
    return { user: res.data[0], token: "fake-jwt-token" }; // Mock token
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: "",
        status: "idle",
        error: null,
        enrolled: [],
        progress: { 2: ["l1"] },
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.enrolled = [];
            state.progress = {};
        },
        enrollCourse: (state, action) => {
            if (
                !state.enrolled.some(
                    (course) => course.id === action.payload.id
                )
            ) {
                state.enrolled.push(action.payload);
            }
        },
        markLectureComplete: (state, action) => {
            const { courseId, lectureId } = action.payload;
            state.progress[courseId] = state.progress[courseId] || [];
            if (!state.progress[courseId].includes(lectureId))
                state.progress[courseId].push(lectureId);
        },
        registerUser: (state, action) => {
            state.user = action.payload;
            state.token = "fake-token"; // mock token
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (s) => {
                s.status = "loading";
            })
            .addCase(login.fulfilled, (s, a) => {
                s.status = "succeeded";
                s.user = a.payload.user;
                s.token = a.payload.token;
            })
            .addCase(login.rejected, (s, a) => {
                s.status = "failed";
                s.error = a.error.message;
            });
    },
});

export const { logout, enrollCourse, markLectureComplete, registerUser } =
    userSlice.actions;

export default userSlice.reducer;
