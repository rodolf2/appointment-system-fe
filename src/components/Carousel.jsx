import { useState, useEffect, useCallback, useMemo } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const staticSlides = useMemo(
    () => [
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
    ],
    []
  );
  useEffect(() => {
    const fetchAndSetSlides = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/announcements`
        );
        const dynamicSlides = response.data.map((announcement) => ({
          title: announcement.title,
          description: announcement.description,
          isHtml: true,
          isStatic: false,
        }));

        setSlides([...staticSlides, ...dynamicSlides]);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setSlides(staticSlides);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetSlides();
  }, [staticSlides]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  if (loading) {
    return (
      <div className="min-h-[300px] sm:min-h-[400px] flex items-center justify-center bg-[#161F55] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div
      className="relative bg-[#161F55] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="relative min-h-[320px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] flex items-center justify-center">
          {/* Arrow Navigation - Now with improved visibility and hover effects */}
          <button
            onClick={prevSlide}
            className={`
              absolute left-2 sm:left-4 z-10 p-2 sm:p-3
              rounded-full bg-white/10 hover:bg-white/20
              text-white/70 hover:text-white
              transition-all duration-300 transform
              ${
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }
              focus:outline-none focus:ring-2 focus:ring-white/30
            `}
            aria-label="Previous slide"
          >
            <FaArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Slide Content */}
          <div className="text-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
            <h2
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
              font-bold text-white mb-4 sm:mb-6 transition-all duration-500 ease-out
              transform ${currentIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
            >
              {slides[currentIndex]?.title}
            </h2>

            <div className="text-white/90 space-y-2 sm:space-y-3">
              {typeof slides[currentIndex]?.description === "string" ? (
                <p
                  className="text-sm xs:text-base sm:text-lg md:text-xl 
                  transition-all duration-500 delay-100 ease-out
                  transform ${currentIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
                >
                  {slides[currentIndex].description}
                </p>
              ) : (
                slides[currentIndex]?.description?.map((item, idx) => (
                  <p
                    key={idx}
                    className="text-sm xs:text-base sm:text-lg md:text-xl 
                    transition-all duration-500 delay-100 ease-out
                    transform ${currentIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
                  >
                    {item}
                  </p>
                ))
              )}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className={`
              absolute right-2 sm:right-4 z-10 p-2 sm:p-3
              rounded-full bg-white/10 hover:bg-white/20
              text-white/70 hover:text-white
              transition-all duration-300 transform
              ${
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }
              focus:outline-none focus:ring-2 focus:ring-white/30
            `}
            aria-label="Next slide"
          >
            <FaArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Dot Navigation */}
          <div
            className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 
            flex items-center justify-center gap-2 sm:gap-3"
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3
                  rounded-full transition-all duration-300
                  ${
                    currentIndex === index
                      ? "bg-white scale-125"
                      : "bg-white/40 hover:bg-white/60"
                  }
                `}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
