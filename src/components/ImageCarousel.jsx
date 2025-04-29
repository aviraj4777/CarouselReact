import React from "react";
import data from "./data.json";

const ImageCarousel = () => {
  const DATA_LENGTH = data.length;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const ref = React.useRef(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % DATA_LENGTH);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + DATA_LENGTH) % DATA_LENGTH);
  };

  React.useEffect(() => {
    ref.current = setInterval(handleNext, 3000); // slower cycle for better UX
    return () => clearInterval(ref.current);
  }, []);

  const pauseCarousel = () => clearInterval(ref.current);
  const resumeCarousel = () => {
    ref.current = setInterval(handleNext, 3000);
  };

  return (
    <div
      className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl"
      onMouseEnter={pauseCarousel}
      onMouseLeave={resumeCarousel}
    >
      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="bg-sky-300 p-2 rounded-full absolute top-1/2 left-4 transform -translate-y-1/2 z-10 hover:bg-sky-400 transition"
      >
        {"<"}
      </button>

      <img
        className="w-full h-auto max-h-[70vh] object-cover transition-all duration-500 rounded-xl"
        src={data[currentIndex].download_url}
        alt={`Image ${currentIndex + 1}`}
      />

      <button
        onClick={handleNext}
        className="bg-sky-300 p-2 rounded-full absolute top-1/2 right-4 transform -translate-y-1/2 z-10 hover:bg-sky-400 transition"
      >
        {">"}
      </button>
    </div>
  );
};

export default ImageCarousel;
