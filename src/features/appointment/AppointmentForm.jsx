import { useState } from "react";
import { useSearchParams } from "react-router";
import DataPrivacy from "../../appointmentForm/DataPrivacy";
import Attachment from "../../appointmentForm/Attachment";
import AppInfo from "../../appointmentForm/AppInfo";
import AppSchedule from "../../appointmentForm/AppSchedule";
import ReturnHome from "../../appointmentForm/ReturnHome";
import Feedback from "@/appointmentForm/Feedback";
import SelectDocuments from "@/appointmentForm/SelectDocuments";

const AppointmentForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(() => {
    const stepFromParams = searchParams.get("step");
    return stepFromParams ? parseInt(stepFromParams, 10) : 1;
  });
  const [formData, setFormData] = useState({
    name: "",
    transactionNumber: ""
  });

  const goToNextStep = (step, data = {}) => {
    const nextStep = step || currentStep + 1;
    console.log('Moving to step:', nextStep);
    setCurrentStep(nextStep);
    setSearchParams({ step: nextStep.toString() });
    
    // Update form data if provided
    if (data.name) setFormData(prev => ({ ...prev, name: data.name }));
    if (data.transactionNumber) setFormData(prev => ({ ...prev, transactionNumber: data.transactionNumber }));
  };

  const goToPreviousStep = (step) => {
    const prevStep = step || currentStep - 1;
    console.log('Moving back to step:', prevStep);
    setCurrentStep(prevStep);
    setSearchParams({ step: prevStep.toString() });
  };

  return (
    <>
      {currentStep === 1 && <DataPrivacy onNext={goToNextStep} />}
      {currentStep === 2 && (
        <AppInfo
          onNext={goToNextStep}
          onBack={goToPreviousStep}
          currentStep={1}
        />
      )}
      {currentStep === 3 && (
        <SelectDocuments
          onNext={goToNextStep}
          onBack={goToPreviousStep}
          currentStep={2}
        />
      )}
      {currentStep === 4 && (
        <Attachment
          onNext={goToNextStep}
          onBack={goToPreviousStep}
          currentStep={3}
        />
      )}
      {currentStep === 5 && (
        <AppSchedule
          onNext={goToNextStep}
          onBack={goToPreviousStep}
          currentStep={4}
        />
      )}
      {currentStep === 6 && (
        <Feedback
          onNext={goToNextStep}
          onBack={goToPreviousStep}
          currentStep={5}
          name={formData.name}
          transactionNumber={formData.transactionNumber}
        />
      )}
      {currentStep === 7 && (
        <ReturnHome
          onNext={goToNextStep}
          onBack={goToPreviousStep}
          currentStep={6}
        />
      )}
    </>
  );
};

export default AppointmentForm;
