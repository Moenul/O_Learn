import ReactPlayer from "react-player";

export const VideoPlayer = (props) => {
    const { currentLecture, handleLectureComplete } = props;

    if (!currentLecture) {
        return (
            <p className="text-center mt-10 text-gray-500">
                Select a lecture to start learning.
            </p>
        );
    }
    return (
        <div className="aspect-video">
            <ReactPlayer
                src={currentLecture.videoUrl}
                width="100%"
                height="100%"
                controls
                onEnded={handleLectureComplete}
            />
        </div>
    );
};

export default VideoPlayer;
