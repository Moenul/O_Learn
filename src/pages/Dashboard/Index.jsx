import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const userEnrolled = useSelector((state) => state.user.enrolled);
    const userProgress = useSelector((state) => state.user.progress);

    const countTotalLectures = (course) => {
        let calculatedLecture = 0;
        course.modules.map((mod) => {
            mod.lectures
                ? (calculatedLecture += mod.lectures.length)
                : (calculatedLecture += 0);
        });
        return calculatedLecture;
    };

    const countTotalCompleteLecture = (courseId) => {
        return userProgress[courseId] ? userProgress[courseId].length : 0;
    };

    return (
        <>
            <Navbar />
            <div className="px-4 py-4 pt-16 max-w-6xl mx-auto flex gap-2">
                <Sidebar />
                <section className="w-full min-h-dvh">
                    {userEnrolled.length < 1 ? (
                        <div>No course enrolled</div>
                    ) : (
                        ""
                    )}
                    <div className="grid grid-cols-1 gap-2">
                        {userEnrolled.map((course) => {
                            return (
                                <div
                                    key={course.id}
                                    className="p-2 rounded-sm border flex gap-2"
                                >
                                    <div className=" w-40 h-auto aspect-video overflow-hidden rounded-sm border">
                                        <img
                                            className="object-cover"
                                            src={course.thumbnail}
                                            alt=""
                                        />
                                    </div>
                                    <div className="w-full  flex flex-col justify-between">
                                        <div>
                                            <p className="text-lg">
                                                {course.title}
                                            </p>
                                            <div className="text-xs bg-amber-200 w-fit px-2 py-0.5 rounded-sm shadow">
                                                {course.level}
                                            </div>
                                        </div>
                                        <div className="w-full flex items-end gap-4">
                                            <div>
                                                <b>Total Lesson: </b>
                                                <span>
                                                    {countTotalLectures(course)}
                                                </span>
                                            </div>
                                            <div>
                                                <b>Complete Lesson: </b>
                                                <span>
                                                    {countTotalCompleteLecture(
                                                        course.id
                                                    )}
                                                </span>
                                            </div>
                                            <div>
                                                <b>Progresess: </b>
                                                <span>
                                                    {(countTotalCompleteLecture(
                                                        course.id
                                                    ) *
                                                        100) /
                                                        countTotalLectures(
                                                            course
                                                        )}
                                                    %
                                                </span>
                                            </div>
                                            <div>
                                                <b>Duration: </b>
                                                <span>{course.duration}</span>
                                            </div>
                                            <div className="ml-auto">
                                                <Link to={`learn/${course.id}`}>
                                                    <p className="px-6 py-1 rounded-sm bg-sky-400 shadow cursor-pointer">
                                                        Watch
                                                    </p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </>
    );
};

export default Dashboard;
