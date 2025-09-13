import api from "../libs/axios";

export const getCourses = () => api.get("/courses");
