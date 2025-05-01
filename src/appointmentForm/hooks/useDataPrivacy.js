import { useState, useRef } from "react";

const useDataPrivacy = (onNext) => {
  const [isChecked, setIsChecked] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const textRef = useRef(null); // Reference for the privacy text

  const handleCheckBox = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      setHighlight(false);
    }
  };

  const handleNext = () => {
    if (!isChecked) {
      setHighlight(true);
      textRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      setHighlight(false);
      onNext();
    }
  };
  return {
    isChecked,
    highlight,
    textRef,
    handleCheckBox,
    handleNext,
  };
};

export default useDataPrivacy;
