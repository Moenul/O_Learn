import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCourses } from "../features/courses/coursesSlice";
import { enrollCourse } from "../features/auth/userSlice";
import ReactPlayer from "react-player";
import useAuth from "../hooks/useAuth";

export default function Course() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { isAuthenticated } = useAuth();

    const { list: courses, status } = useSelector((state) => state.courses);

    const userEnrolled = useSelector((state) => state.user.enrolled);

    // Fetch courses if not already loaded
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCourses());
        }
    }, [status, dispatch]);

    // Find the selected course
    const course = courses.find((c) => String(c.id) === String(id));

    if (!course) {
        return (
            <p className="text-center mt-10 text-gray-500">Loading course...</p>
        );
    }

    // const enrolled = userEnrolled[course] || [];

    // Handle enroll course
    const handleEnrollCourse = (course) => {
        dispatch(enrollCourse(course));
    };
    return (
        <>
            <div className="course-header min-h-[18rem] pt-34 mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-rose-400 ">
                <div className="px-4 py-4 max-w-6xl mx-auto flex flex-col md:flex-row justify-between">
                    <div className="space-y-4 w-7/12 min-h-42">
                        <h1 className="text-5xl font-semibold font-sans">
                            {course.title}
                        </h1>
                        <div className="flex gap-2">
                            <p>Instructor</p>
                            <p>Upload Date</p>
                        </div>
                    </div>
                    <div className="w-5/12 relative">
                        <div className="preview-card w-80 absolute z-10 top-0 left-1/2 transform -translate-x-1/2 p-2 border rounded-sm space-y-2 bg-white/80 backdrop-blur ">
                            <div className="intro-video w-full aspect-video rounded-sm overflow-hidden">
                                <ReactPlayer
                                    src={course.lessons[0].videoUrl}
                                    width="100%"
                                    height="100%"
                                    controls
                                />
                            </div>
                            <div className="flex gap-2">
                                <del className="text-lg opacity-50">
                                    5900 BDT
                                </del>
                                <p className="text-xl font-semibold">
                                    4700 BDT
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <label className="font-semibold">
                                    Duration :
                                </label>
                                21h
                            </div>
                            <div className="flex gap-2">
                                <label className="font-semibold">
                                    Lessons :
                                </label>
                                14
                            </div>

                            {isAuthenticated &&
                            userEnrolled.some((crs) => crs.id === course.id) ? (
                                <button className="flex items-center justify-center w-full px-6 py-2 rounded-sm font-semibold text-lg bg-purple-400 cursor-pointer">
                                    Watch Now
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEnrollCourse(course)}
                                    className="flex items-center justify-center w-full px-6 py-2 rounded-sm font-semibold text-lg bg-purple-400 cursor-pointer"
                                >
                                    Enroll Now
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-4 max-w-6xl mx-auto">
                <div className="detail-section flex flex-col md:flex-row justify-between">
                    <div className="space-y-4 w-7/12">
                        <div className="desc">
                            <h2 className="text-2xl font-semibold">
                                Course Info
                            </h2>
                            {course.description}
                        </div>
                        <div className="course-lessons">
                            <h2 className="text-2xl font-semibold">
                                Course Curriculum
                            </h2>
                            {course.lessons.map((lesson) => {
                                return <div>{lesson.title}</div>;
                            })}
                        </div>
                    </div>
                    <div className="w-5/12 relative"></div>
                </div>
            </div>
        </>
    );
}
