import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../redux/slices/coursesSlice";
import { Link } from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch();
    const {
        list: courses,
        status,
        error,
    } = useSelector((state) => state.courses);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCourses());
        }
    }, [status, dispatch]);

    if (status === "loading") {
        return <p className="text-center text-gray-500">Loading courses...</p>;
    }

    if (status === "failed") {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-center">
                Available Courses
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="border rounded-xl p-4 shadow hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold mb-2">
                            {course.title}
                        </h2>
                        <p className="text-gray-600 text-sm mb-4">
                            {course.description?.slice(0, 80)}...
                        </p>
                        <Link
                            to={`/course/${course.id}`}
                            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            View Course
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
