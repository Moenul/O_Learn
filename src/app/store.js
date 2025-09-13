import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "../features/courses/coursesSlice";
import userReducer from "../features/auth/userSlice";

export const store = configureStore({
    reducer: {
        courses: coursesReducer,
        user: userReducer,
    },
});
