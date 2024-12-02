import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <>
      <div className="main-container">
        <div>
          <img src="/" alt="PICTURE NG LOBBY" />
        </div>
        <div className="content">
          <div className="about-us">
            <div className="independent-underline-border">ABOUT US</div>
            <p>
              The La Verdad Christian College or LVCC is a private non-stock,
              non-sectarian educational institution established in Apalit,
              Pampanga, Philippines. It is the first private school in the
              Philippines that GRANTS FULL SCHOLARSHIP PROGRAM to deserving
              students by providing tuition-free education and no miscellaneous
              fees. It is one of the best schools in Pampanga, up to regional
              and national levels.
            </p>
          </div>
          <div className="vision">
            <div className="independent-underline-border">VISION</div>
            <p>
              The institution that ensures quality learning and biblical moral
              standards.
            </p>
          </div>
          <div className="mission">
            <div className="independent-underline-border">MISSION</div>
            <p>
              To be the frontrunner in providing academic excellence and
              normally upright principles.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
