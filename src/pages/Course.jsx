import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCourses } from "../features/courses/coursesSlice";
import { markLessonComplete } from "../features/auth/userSlice";
import LessonList from "../components/LessonList";
import VideoPlayer from "../components/VideoPlayer";

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

    return (
        <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar - Lesson List */}
            <LessonList
                course={course}
                progress={progress}
                currentLesson={currentLesson}
                setCurrentLesson={setCurrentLesson}
            ></LessonList>

            {/* Video Player */}
            <section className="flex-1">
                <VideoPlayer
                    currentLesson={currentLesson}
                    handleLessonComplete={handleLessonComplete}
                ></VideoPlayer>
            </section>
        </div>
    );
}
