import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const userEnrolled = useSelector((state) => state.user.enrolled);

    return (
        <>
            <Navbar />
            <div className="px-4 py-4 pt-16 max-w-6xl mx-auto flex gap-2">
                <Sidebar />
                <section className="w-full min-h-dvh">
                    <h1>Enrolled Courses</h1>
                    <div className="flex gap-2">
                        {userEnrolled.map((course) => {
                            return (
                                <div
                                    key={course.id}
                                    className="p-3 rounded-sm border"
                                >
                                    <p className="text-lg">{course.title}</p>
                                    <p>{course.description}</p>
                                    <Link
                                        to={`learn/${course.id}`}
                                        className="px-4 py-1 rounded-sm bg-sky-500 shadow cursor-pointer"
                                    >
                                        Watch
                                    </Link>
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
