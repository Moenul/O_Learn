import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../features/courses/coursesSlice";
import useAuth from "../hooks/useAuth";
import CourseCard from "../components/CourseCard";

export default function Home() {
    const dispatch = useDispatch();
    const {
        list: courses,
        status,
        error,
    } = useSelector((state) => state.courses);
    const { user, isAuthenticated } = useAuth();

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
        <div className="px-4 py-4 pt-20 max-w-6xl mx-auto space-y-6">
            {isAuthenticated ? (
                <>
                    <p className="text-center text-2xl">Welcome {user.name}</p>
                </>
            ) : (
                <></>
            )}
            <h1 className="text-3xl font-bold text-center">
                Available Courses
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {courses?.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
}

// useCallback function pass
// useMemo  variable  expensive calculation
// Memoization React.memo child component export default React.memo(Home);
