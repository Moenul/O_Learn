import { useMemo } from "react";

export default function LectureList(props) {
    const { course, progress, currentLecture, setCurrentLecture } = props;

    const getNextUnlockLectureId = (course, progress) => {
        for (const module of course.modules) {
            for (const lecture of module.lectures) {
                if (!progress.includes(lecture.id)) {
                    return lecture.id;
                }
            }
        }
        return null;
    };

    const nextUnlockedLectureId = useMemo(
        () => getNextUnlockLectureId(course, progress),
        [course, progress]
    );

    return (
        <aside className="w-full md:w-1/3 border rounded-lg p-4 bg-gray-50 mt-4">
            <h2 className="text-xl font-bold mb-4">{course.title}</h2>
            <ul className="space-y-2">
                {course.modules.map((module) => {
                    return (
                        <div key={module.id}>
                            <p className="px-2 py-2 flex justify-between">
                                <p>{module.title}</p>
                                <span>v</span>
                            </p>
                            <div className="collapsable-container space-y-2">
                                {module.lectures.map((lecture) => {
                                    const completed = progress.includes(
                                        lecture.id
                                    );
                                    return (
                                        <li key={lecture.id}>
                                            <button
                                                onClick={() =>
                                                    (nextUnlockedLectureId ===
                                                        lecture.id ||
                                                        completed) &&
                                                    setCurrentLecture(lecture)
                                                }
                                                className={`w-full text-left px-3 py-2 rounded-lg transition cursor-pointer ${
                                                    nextUnlockedLectureId ===
                                                        lecture.id ||
                                                    lecture.isPreview ||
                                                    completed
                                                        ? "bg-white hover:bg-blue-50 border"
                                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                } ${
                                                    completed
                                                        ? "border-green-500"
                                                        : ""
                                                } ${
                                                    currentLecture?.id ===
                                                    lecture.id
                                                        ? "!border-blue-500 !font-semibold !bg-sky-100"
                                                        : ""
                                                }`}
                                            >
                                                {lecture.title}
                                                {completed && (
                                                    <span className="ml-2 text-green-600">
                                                        ✓
                                                    </span>
                                                )}
                                                {nextUnlockedLectureId !==
                                                    lecture.id &&
                                                    !completed && (
                                                        <span className="ml-2 text-red-500">
                                                            🔒
                                                        </span>
                                                    )}
                                            </button>
                                        </li>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </ul>
        </aside>
    );
}
