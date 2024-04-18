
import React, { useState } from "react";
import PersonalInfoStep from "./PersonalInfoStep";
import BusinessInfoStep from "./BusinessInfoStep";
import OtherInfoStep from "./OtherInfoStep";
import "../App.css";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    businessType: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState("false");
  if (submit === "true") console.log(formData);
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };
 const  handleSubmit=() =>{
    setSubmit("true");
 }
  
  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
    setErrors({ ...errors, [fieldName]: "" });
  };



  return submit === "false" ? (
    <div className="multi-step-form">
      {step === 1 && (
        <PersonalInfoStep
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      {step === 2 && (
        <BusinessInfoStep
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      {step === 3 && (
        <OtherInfoStep
          formData={formData}
          handleChange={handleChange}
          prevStep={prevStep}
          errors={errors}
          handleSubmit = {handleSubmit}
        />
      )}
    </div>
  ) : (
    <div>
      <h1>Form Submitted Successfully!</h1>
      <p>Thank you for submitting the form.</p>
    </div>
  );
};

export default MultiStepForm;
