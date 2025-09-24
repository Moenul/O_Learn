import React, { Component } from "react";
import ReactPlayer from "react-player";

export const VideoPlayer = (props) => {
    const { currentLesson, handleLessonComplete } = props;

    if (!currentLesson) {
        return (
            <p className="text-center mt-10 text-gray-500">
                Select a lesson to start learning.
            </p>
        );
    }
    return (
        <div className="space-y-4">
            <h3 className="text-2xl font-semibold">{currentLesson.title}</h3>
            <div className="aspect-video">
                <ReactPlayer
                    src={currentLesson.videoUrl}
                    width="100%"
                    height="100%"
                    controls
                    onEnded={handleLessonComplete}
                />
            </div>
        </div>
    );
};

export default VideoPlayer;
