
import React from 'react';

const BusinessInfoStep = ({ formData, handleChange, nextStep, prevStep, errors, setErrors }) => {
  const { companyName, businessType } = formData;

  const handleNext = () => {
    // Object to store new errors
    const newErrors = {};
  
    // Check if companyName is empty
    if (!companyName) {
      newErrors.companyName = 'Company name is required';
    } else {
      newErrors.companyName = '';
    }
  
    // Check if businessType is empty
    if (!businessType) {
      newErrors.businessType = 'Business type is required';
    } else {
      newErrors.businessType = '';
    }
  
    // Update errors object with newErrors
    setErrors(newErrors);
  
    // Proceed to next step only if there are no errors
    if (!newErrors.companyName && !newErrors.businessType) {
      nextStep();
    }
  };
  

  return (
    <div className="step-container">
      <h2 className="step-header">Step 2: Business Information</h2>
      <div className="form-group">
        <label className="label" htmlFor="companyName">Company Name</label>
        <input
          type="text"
          id="companyName"
          className="input"
          value={companyName}
          onChange={(e) => handleChange('companyName', e.target.value)}
        />
        {errors.companyName && <span className="error-msg">{errors.companyName}</span>}
      </div>
      <div className="form-group">
        <label className="label" htmlFor="businessType">Business Type</label>
        <input
          type="text"
          id="businessType"
          className="input"
          value={businessType}
          onChange={(e) => handleChange('businessType', e.target.value)}
        />
        {errors.businessType && <span className="error-msg">{errors.businessType}</span>}
      </div><div>
      <button  className="button" onClick={prevStep}>Back</button>
      <button className="button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default BusinessInfoStep;
