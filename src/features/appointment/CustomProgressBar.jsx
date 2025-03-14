import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";

const CustomProgressBar = ({ currentStep }) => {
  // Adjust the step percentage calculation based on the total number of steps
  const totalSteps = 4; // Total number of steps in your form
  const stepPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <ProgressBar
      percent={stepPercentage}
      filledBackground="linear-gradient(to right, #4A90E2, #161f55)"
    >
      {[1, 2, 3, 4].map((step, index) => (
        <Step key={index}>
          {({ accomplished }) => (
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
                accomplished || currentStep === step
                  ? "bg-[#161f55]"
                  : "bg-gray-300"
              }`}
            >
              {step}
            </div>
          )}
        </Step>
      ))}
    </ProgressBar>
  );
};

export default CustomProgressBar;
