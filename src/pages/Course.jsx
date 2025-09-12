import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCourses } from "../redux/slices/coursesSlice";

export default function Course() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { list: courses, status } = useSelector((state) => state.courses);

    const [currentLesson, setCurrentLesson] = useState(null);

    // Fetch courses if not already loaded
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCourses());
        }
    }, [status, dispatch]);

    // Find the selected course
    const course = courses.find((c) => String(c.id) === String(id));

    // Select the first lesson by default
    useEffect(() => {
        if (course && course.lessons?.length > 0) {
            setCurrentLesson(course.lessons[0]);
        }
    }, [course]);

    if (!course) {
        return (
            <p className="text-center mt-10 text-gray-500">Loading course...</p>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar - Lesson List */}
            <aside className="w-full md:w-1/3 border rounded-lg p-4 bg-gray-50">
                <h2 className="text-xl font-bold mb-4">{course.title}</h2>
                <ul className="space-y-2">
                    {course.lessons.map((lesson, index) => {
                        return (
                            <li key={lesson.id}>
                                <button>{lesson.title}</button>
                            </li>
                        );
                    })}
                </ul>
            </aside>
            <div>
                <h2>{currentLesson?.title}</h2>
            </div>
        </div>
    );
}
