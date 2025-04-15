import { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";

const VideoCard = ({ videoSrc, title }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
    setHasStarted(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="w-full max-w-[900px] mx-auto mb-10">
      <div className="relative rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full"
          onPlay={() => {
            setIsPlaying(true);
            setHasStarted(true);
          }}
          onPause={handlePause}
          onEnded={handlePause}
          controls
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Play Button */}
        {!isPlaying && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition duration-300"
          >
            <FaPlay className="text-white text-6xl hover:scale-110 transition-transform duration-200" />
          </button>
        )}

        {/* Title only before playing */}
        {!isPlaying && !hasStarted && (
          <div className="absolute bottom-4 left-4 text-white text-2xl font-semibold">
            {title.split("\n").map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
