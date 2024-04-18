import ApiService from '../services/ApiService';
import { useState } from 'react';
import '../App.css';

function DynamicForm() {
  const [formFields, setFormFields] = useState([{ name: '', age: '' }]);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.submitForm(formFields);
      if (response.ok) {
        alert('Form submitted successfully');
      } else {
        alert('Error submitting form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const addFields = () => {
    let object = { name: '', age: '' };
    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields.splice(index, 1);
      return updatedFields;
    });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {formFields.map((form, index) => (
          <div key={index}>
            <input
              name="name"
              placeholder="Name"
              onChange={(event) => handleFormChange(event, index)}
              value={form.name}
            />
            <input
              name="age"
              placeholder="Age"
              onChange={(event) => handleFormChange(event, index)}
              value={form.age}
            />
            <button type="button" onClick={() => removeFields(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addFields}>Add More..</button>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DynamicForm;
