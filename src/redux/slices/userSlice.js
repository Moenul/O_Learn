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
        progress: {},
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.enrolled = [];
            state.progress = {};
        },
        enrollCourse: (state, action) => {
            if (!state.enrolled.includes(action.payload))
                state.enrolled.push(action.payload);
        },
        markLessonComplete: (state, action) => {
            const { courseId, lessonId } = action.payload;
            state.progress[courseId] = state.progress[courseId] | [];
            if (!state.progress[courseId].includes(lessonId))
                state.progress[courseId].push(lessonId);
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

export const { logout, enrollCourse, markLessonComplete, registerUser } =
    userSlice.actions;

export default userSlice.reducer;
