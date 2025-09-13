import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { fetchCourses } from "../features/courses/coursesSlice";
import { markLessonComplete } from "../features/auth/userSlice";

export default function Course() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { list: courses, status } = useSelector((state) => state.courses);
    const userProgress = useSelector((state) => state.user.progress);

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

    const progress = userProgress[course.id] || [];

    // Handle lesson complete
    const handleLessonComplete = () => {
        if (currentLesson) {
            dispatch(
                markLessonComplete({
                    courseId: course.id,
                    lessonId: currentLesson.id,
                })
            );
        }
    };

    // Check if a lesson is unlocked
    const isLessonUnlocked = (lesson, index) => {
        if (index === 0) return true; // first lesson always unlocked
        const prevLesson = course.lessons[index - 1];
        return progress.includes(prevLesson.id);
    };

    return (
        <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar - Lesson List */}
            <aside className="w-full md:w-1/3 border rounded-lg p-4 bg-gray-50">
                <h2 className="text-xl font-bold mb-4">{course.title}</h2>
                <ul className="space-y-2">
                    {course.lessons.map((lesson, index) => {
                        const unlocked = isLessonUnlocked(lesson, index);
                        const completed = progress.includes(lesson.id);

                        return (
                            <li key={lesson.id}>
                                <button
                                    onClick={() =>
                                        unlocked && setCurrentLesson(lesson)
                                    }
                                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                                        unlocked
                                            ? "bg-white hover:bg-blue-50 border"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    } ${completed ? "border-green-500" : ""}`}
                                >
                                    {lesson.title}
                                    {completed && (
                                        <span className="ml-2 text-green-600">
                                            ✓
                                        </span>
                                    )}
                                    {!unlocked && (
                                        <span className="ml-2 text-red-500">
                                            🔒
                                        </span>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </aside>

            {/* Video Player */}
            <section className="flex-1">
                {currentLesson ? (
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold">
                            {currentLesson.title}
                        </h3>
                        <div className="aspect-video">
                            <ReactPlayer
                                url={currentLesson.videoUrl}
                                width="100%"
                                height="100%"
                                controls
                                onEnded={handleLessonComplete}
                            />
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">
                        Select a lesson to start learning.
                    </p>
                )}
            </section>
        </div>
    );
}
