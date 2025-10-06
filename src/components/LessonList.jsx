export default function LessonList(props) {
    const { course, progress, currentLesson, setCurrentLesson } = props;

    // Check if a lesson is unlocked
    const isLessonUnlocked = (lesson, index) => {
        if (index === 0) return true; // first lesson always unlocked
        const prevLesson = course.lessons[index - 1];
        return progress.includes(prevLesson.id);
    };

    return (
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
                                className={`w-full text-left px-3 py-2 rounded-lg transition cursor-pointer ${
                                    unlocked
                                        ? "bg-white hover:bg-blue-50 border"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                } ${completed ? "border-green-500" : ""} ${
                                    currentLesson?.id === lesson.id
                                        ? "!border-blue-500 !font-semibold !bg-sky-100"
                                        : ""
                                }`}
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
    );
}
