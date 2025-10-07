import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
    return (
        <div className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white flex flex-col">
            <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <div className="flex-1 flex flex-col">
                <h2 className="text-xl font-semibold mb-1">{course.title}</h2>
                <p className="text-gray-500 text-xs mb-2">
                    {course.category} • {course.level}
                </p>
                <p className="text-gray-600 text-sm mb-3">
                    {course.shortDescription?.slice(0, 80)}...
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="mr-4">⏱ {course.duration}</span>
                    <span className="flex items-center">
                        ⭐ {course.rating}
                    </span>
                </div>
                <div className="flex items-center mb-4">
                    {course.discountPrice ? (
                        <>
                            <span className="text-lg font-bold text-blue-600 mr-2">
                                ${course.discountPrice}
                            </span>
                            <span className="text-sm line-through text-gray-400">
                                ${course.price}
                            </span>
                        </>
                    ) : (
                        <span className="text-lg font-bold text-blue-600">
                            ${course.price}
                        </span>
                    )}
                </div>
                <Link
                    to={`/course/${course.id}`}
                    className="mt-auto inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    View Course
                </Link>
            </div>
        </div>
    );
}
