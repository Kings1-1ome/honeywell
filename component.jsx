import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormWithApi = () => {
  const [formData, setFormData] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data'); // Assuming your backend server is running on the same host as your React app
        setFormData(response.data.data); // Assuming response.data contains the actual form data
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <form>
        {formData &&
          formData.split('\n').map((line, index) => {
            const [fieldName, fieldValue] = line.split(':');
            return (
              <div key={index}>
                <label htmlFor={fieldName}>{fieldName}</label>
                <input type="text" id={fieldName} value={fieldValue} readOnly />
              </div>
            );
          })}
      </form>
    </div>
  );
};

export default FormWithApi;
