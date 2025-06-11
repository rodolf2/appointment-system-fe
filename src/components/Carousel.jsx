import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const staticSlides = [
    {
      title: "Requesting and releasing of documents general guidelines.",
      description:
        "To ensure efficient and orderly processing of document requests, the following regulations have been established for both Basic Education and Higher Education. Please be guided accordingly.",
      isStatic: true,
    },
    {
      title: "Objectives",
      description: [
        "La Verdad Christian College, Inc. aims to provide help through educational assistance to poor but deserving students from different parts of the country so that they may acquire quality education without the worries of high cost of education.",
        "It also aims to alleviate poverty by offering opportunities to poor but determined students to acquire higher quality education to fulfill their dreams and succeed with God's help and mercy.",
      ],
      isStatic: true,
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
  useEffect(() => {
    const fetchAndSetSlides = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/announcements`
        )
        const dynamicSlides = response.data.map((announcement) => ({
          title: announcement.title,
          description: announcement.description,
          isHtml: true,
          isStatic: false,
        }));

        setSlides([...dynamicSlides, ...staticSlides]);
      } catch (error) {
        console.error("Failed to fetch announcements for carousel:", error);
        setSlides(staticSlides);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetSlides();
  }, []);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    if (slides.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    if (slides.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return (
      <div className="relative w-full h-screen mx-auto bg-[#161f55] text-white flex items-center justify-center">
        <p className="text-2xl">Loading Announcements...</p>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="relative w-full h-screen mx-auto bg-[#161f55] text-white flex items-center justify-center">
        <p className="text-2xl">No Announcements Available.</p>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-screen mx-auto bg-[#161f55] text-white p-6 flex flex-col items-center justify-center pt-10 font-lato">
      <div className="text-center max-w-[1000px] flex flex-col justify-center items-center h-screen">
        <h2 className="text-[36px] font-semibold w-[800px]">
          {currentSlide.title}
        </h2>
        <div className="border-b-4 border-[#F3BC62] w-[50%] my-5"></div>

        {/* DYNAMIC CONTENT RENDERING */}
        {currentSlide.isHtml ? (
          <div
            className="prose prose-invert prose-xl text-[30px] pb-10 max-h-[350px] overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: currentSlide.description }}
          />
        ) : (
          <div
            className={`text-[30px] pb-10 ${
              Array.isArray(currentSlide.description) ? "max-h-[350px]" : ""
            }`}
          >
            {Array.isArray(currentSlide.description) ? (
              <div className="text-left w-full max-w-[800px] mx-auto">
                {currentSlide.description.map((desc, index) => (
                  <p
                    key={index}
                    className={`mb-4 ${
                      currentSlide.title === "College Program Offered"
                        ? index === 0
                          ? "text-center font-semibold mb-6"
                          : "pl-8 text-[26px]"
                        : "text-[30px] text-center" // Style for objectives and other content
                    }`}
                  >
                    {desc}
                  </p>
                ))}
              </div>
            ) : (
              <p>{currentSlide.description}</p>
            )}
          </div>
        )}

        {currentSlide.isStatic && currentSlide.title.includes("guidelines") && (
          <Link to={"/home/guidelines"}>
            <button className="text-[25px] border border-white px-4 py-2 my-4 rounded hover:bg-white hover:text-[#2A3064] transition">
              See more
            </button>
          </Link>
        )}
      </div>

      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <button onClick={handlePrev}>
          <FaArrowLeft className="w-10 h-10" />
        </button>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
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
