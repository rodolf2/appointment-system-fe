import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: "Requesting and releasing of documents general guidelines.",
      description:
        "To ensure efficient and orderly processing of document requests, the following regulations have been established for both Basic Education and Higher Education. Please be guided accordingly.",
    },
    {
      title: "Objectives",
      description: [
        "La Verdad Christian College, Inc. aims to provide help through educational assistance to poor but deserving students from different parts of the country so that they may acquire quality education without the worries of high cost of education.",
        "It also aims to alleviate poverty by offering opportunities to poor but determined students to acquire higher quality education to fulfill their dreams and succeed with God's help and mercy.",
      ],
    },
    {
      title: "College Program Offered",
      description: [
        "CHED PROGRAMS",
        "• 4-Year Bachelor of Science in Accountancy",
        "• 4-Year Bachelor of Science in Accounting Info. Systems",
        "• 4-Year Bachelor of Science in Social Work",
        "• 4-Year Bachelor of Arts in Broadcasting",
        "• 4-Year Bachelor of Science in Information Systems",
        "• 2-Year Associate in Computer Technology",
      ],
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-screen mx-auto bg-[#161f55] text-white p-6 flex flex-col items-center justify-center pt-10 font-lato">
      <div className="text-center max-w-[1000px] flex flex-col justify-center items-center h-screen">
        <h2 className="text-[36px] font-semibold w-[800px]">
          {slides[currentIndex].title}
        </h2>
        <div className="border-b-4 border-[#F3BC62] w-[50%] my-5"></div>
        <div
          className={`text-[30px] pb-10 ${
            Array.isArray(slides[currentIndex].description)
              ? "overflow-y-scroll max-h-[200px] scrollbar-thin scrollbar-thumb-[#F3BC62] scrollbar-track-[#2A3064]"
              : ""
          } ${
            slides[currentIndex].title === "Objectives"
              ? "text-center"
              : slides[currentIndex].title === "College Program Offered"
              ? "text-start"
              : ""
          }`}
        >
          {Array.isArray(slides[currentIndex].description) ? (
            slides[currentIndex].description.map((desc, index) => (
              <p key={index} className="mb-4">
                {desc}
              </p>
            ))
          ) : (
            <p>{slides[currentIndex].description}</p>
          )}
        </div>
        <Link to={"/home/guidelines"}>
          <button className="text-[25px] border border-white px-4 py-2 my-4 rounded hover:bg-white hover:text-[#2A3064] transition">
            See more
          </button>
        </Link>
      </div>

      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold hover:text-gray-400">
        <button onClick={handlePrev}>
          <FaArrowLeft className="w-10 h-10" />
        </button>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl font-bold hover:text-gray-400">
        <button onClick={handleNext}>
          <FaArrowRight className="w-10 h-10" />
        </button>
      </div>

      <div className="flex justify-center">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-6 h-6 rounded-full cursor-pointer mx-5 ${
              currentIndex === index ? "bg-white" : "bg-gray-500 hover:bg-white"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
