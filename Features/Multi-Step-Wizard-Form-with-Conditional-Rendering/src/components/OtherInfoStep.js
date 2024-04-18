
import React from 'react';

const OtherInfoStep = ({ formData, handleChange, prevStep, errors,handleSubmit }) => {
  const { additionalInfo } = formData;

  return (
    <div className="step">
      <h2 className="step-header">Step 3: Other Information</h2>
      <div className="form-group">
        <label className="label" htmlFor="additionalInfo">Additional Information:</label>
        <textarea
          id="additionalInfo"
          className="input"
          value={additionalInfo}
          onChange={(e) => handleChange('additionalInfo', e.target.value)}
        />
      </div>
      <div className="button-container">
        <button className="button secondary" onClick={prevStep}>Back</button>
        {errors.additionalInfo && <span className="error-msg">{errors.additionalInfo}</span>}
        <button className="button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default OtherInfoStep;
