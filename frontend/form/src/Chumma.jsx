import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import "./style.css"// Import useNavigate hook

function Chumma() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Use reset method to reset form
  } = useForm();

  const [message, setMessage] = useState(''); // State to display success or error messages
  const [isError, setIsError] = useState(false); // State to determine message type
  const navigate = useNavigate();  // Initialize useNavigate hook

  const onSubmit = async (data) => {
    try {
      console.log("called")
      const response = await axios.post('https://employee-task-0ann.onrender.com/api/employee', data);
      setMessage(response.data.message);
      setIsError(false); // Set to false for success
      // Reset form fields after successful submission
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred!');
      setIsError(true); // Set to true for error
    }
  };

  // Function to navigate to the display page
  const navigateToDisplay = () => {
    navigate('/display');  // Programmatically navigate to /display route
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>Employee Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div>
          <label>Name:</label>
          <input type="text" {...register('name', { required: 'Name is required' })} />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>

        {/* Employee ID Field */}
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            {...register('employeeId', {
              required: 'Employee ID is required',
              maxLength: { value: 10, message: 'Employee ID cannot exceed 10 characters' },
            })}
          />
          {errors.employeeId && <p style={{ color: 'red' }}>{errors.employeeId.message}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Invalid email format' },
            })}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        {/* Phone Number Field */}
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            {...register('phoneNumber', {
              required: 'Phone Number is required',
              pattern: { value: /^[0-9]{10}$/, message: 'Phone Number must be 10 digits' },
            })}
          />
          {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber.message}</p>}
        </div>

        {/* Department Field */}
        <div>
          <label>Department:</label>
          <select {...register('department', { required: 'Department is required' })}>
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineer">Engineer</option>
            <option value="Marketing">Marketing</option>
          </select>
          {errors.department && <p style={{ color: 'red' }}>{errors.department.message}</p>}
        </div>

        {/* Date of Joining Field */}
        <div>
          <label>Date of Joining:</label>
          <input
            type="date"
            {...register('dateOfJoining', {
              required: 'Date of Joining is required',
              validate: {
                notFutureDate: (value) => {
                  const today = new Date();
                  const selectedDate = new Date(value);
                  return selectedDate <= today || 'Date of Joining cannot be in the future';
                },
              },
            })}
          />
          {errors.dateOfJoining && <p style={{ color: 'red' }}>{errors.dateOfJoining.message}</p>}
        </div>

        {/* Role Field */}
        <div>
          <label>Role:</label>
          <input type="text" {...register('role', { required: 'Role is required' })} />
          {errors.role && <p style={{ color: 'red' }}>{errors.role.message}</p>}
        </div>

        {/* Submit Button */}
        <div style={{ marginTop: '10px' }}>
          <button type="submit">Submit</button>
        </div>

        {/* Reset Button */}
        <div style={{ marginTop: '10px' }}>
          <button type="button" onClick={() => reset()}>Reset</button>
        </div>

        {/* Display Success/Error Message */}
        {message && (
          <p style={{ color: isError ? 'red' : 'green', marginTop: '10px' }}>
            {message}
          </p>
        )}

        {/* Button to navigate to Display Page */}
        <div style={{ marginTop: '10px' }}>
          <button type="button" onClick={navigateToDisplay}>Go to Display Page</button>
        </div>
      </form>
    </div>
  );
}

export default Chumma;
