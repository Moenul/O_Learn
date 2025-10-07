import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCourses } from "../../../features/courses/coursesSlice";
import { markLectureComplete } from "../../../features/auth/userSlice";
import LectureList from "../../../components/LectureList";
import VideoPlayer from "../../../components/VideoPlayer";
import Navbar from "../../../components/layout/Navbar";

const Learn = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { list: courses, status } = useSelector((state) => state.courses);
    const userProgress = useSelector((state) => state.user.progress);

    const [currentLecture, setCurrentLecture] = useState(null);

    // Fetch courses if not already loaded
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCourses());
        }
    }, [status, dispatch]);

    // Find the selected course
    const course = courses.find((c) => String(c.id) === String(id));

    // Select the first lecture by default
    useEffect(() => {
        if (course && course.modules?.length > 0) {
            setCurrentLecture(course.modules[0].lectures[0]);
        }
    }, [course]);

    if (!course) {
        return (
            <p className="text-center mt-10 text-gray-500">Loading course...</p>
        );
    }

    const progress = userProgress[course.id] || [];
    // Handle markLectureComplete complete
    const handleLectureComplete = () => {
        if (currentLecture) {
            dispatch(
                markLectureComplete({
                    courseId: course.id,
                    lectureId: currentLecture.id,
                })
            );
        }
    };

    return (
        <>
            <Navbar />
            <div className="px-4 py-4 pt-16 max-w-6xl mx-auto ">
                {/* Video Player */}
                <section className="max-w-4xl mx-auto flex-1">
                    <VideoPlayer
                        currentLecture={currentLecture}
                        handleLectureComplete={handleLectureComplete}
                    ></VideoPlayer>
                    <h3 className="text-2xl font-semibold">
                        {currentLecture?.title}
                    </h3>
                </section>

                {/* Sidebar - Lecture List */}
                <LectureList
                    course={course}
                    progress={progress}
                    currentLecture={currentLecture}
                    setCurrentLecture={setCurrentLecture}
                ></LectureList>
            </div>
        </>
    );
};

export default Learn;
