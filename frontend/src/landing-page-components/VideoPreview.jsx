import React from "react";

const VideoPreview = ({ ref }) => {
  const benefits = ["Interactive node exploration", "Zoom and pan controls", "Color-coded categories", "Export to multiple formats"];

  return (
    <div className="max-w-6xl! flex items-center gap-8" ref={ref}>
      <div className="w-1/2">
        <video src="/video/video site Lesson.mp4" autoPlay loop muted playsInline preload="auto" className="w-full rounded-2xl!"></video>
      </div>
      <div className="w-1/2 flex flex-col gap-4">
        <h3 className="text-white">Beautiful, Interactive Mind Maps</h3>
        <p className="text-white text-base! mb-4!">
          Your knowledge comes alive in stunning visual diagrams. Each concept is a node, each relationship a connection. Navigate through your notes
          like never before.
        </p>
        <div>
          {benefits.map((benefit, index) => (
            <div key={`benefit-${index}`} className="mb-4! flex gap-3 items-center relative">
              <div className="video-preview-icon-border rounded-circle">
                <img src="/general-icons/checkmark-pink.svg" alt="Check icon" className="w-4" />
              </div>
              <p className="text-white text-base!">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
