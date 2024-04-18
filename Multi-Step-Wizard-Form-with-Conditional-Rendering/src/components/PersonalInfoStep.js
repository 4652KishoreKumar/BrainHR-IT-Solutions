
import React from 'react';

const PersonalInfoStep = ({ formData, handleChange, nextStep, errors, setErrors }) => {
  const { firstName, lastName } = formData;
  

  const handleNext = () => {
    // Object to store new errors
    const newErrors = {};
  
    // Check if firstName is empty
    if (!firstName) {
      newErrors.firstName = 'First name is required';
    } else {
      newErrors.firstName = '';
    }
  
    // Check if lastName is empty
    if (!lastName) {
      newErrors.lastName = 'Last name is required';
    } else {
      newErrors.lastName = '';
    }
  
    // Update errors object with newErrors
    setErrors(newErrors);
  
    // Proceed to next step only if there are no errors
    if (!newErrors.firstName && !newErrors.lastName) {
      nextStep();
    }
  };
  
  
  
   
    


  return (
    <div className="step">
      <h2 className="step-header">Step 1: Personal Information</h2>
      <div className="form-group">
        <label className="label" htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          className="input"
          value={firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
        />
        {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
      </div>
      <div className="form-group">
        <label className="label" htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          className="input"
          value={lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
        />
        {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
      </div>
      <div className="button-container">
        <button className="button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
