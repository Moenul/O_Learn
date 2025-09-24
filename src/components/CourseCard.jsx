import { Link } from "react-router-dom";

export default function CourseCard(props) {
    const { course } = props;

    return (
        <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
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
    );
}
