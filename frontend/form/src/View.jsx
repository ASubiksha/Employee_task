import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

function DisplayEmployees() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate hook

  useEffect(() => {
    // Fetch employees when the component mounts
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://employee-task-0ann.onrender.com/api/employees');
        setEmployees(response.data);
      } catch (err) {
        setError('Failed to fetch employees');
      }
    };

    fetchEmployees();
  }, []);

  // Function to navigate back to the previous page
  const goBack = () => {
    navigate(-1);  // Go back to the previous page
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Employee List</h2>

      {/* Display error message if fetching fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display employee data */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px',
        }}
      >
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Employee ID</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Phone</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Department</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Date of Joining</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeId} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '10px' }}>{employee.name}</td>
              <td style={{ padding: '10px' }}>{employee.employeeId}</td>
              <td style={{ padding: '10px' }}>{employee.email}</td>
              <td style={{ padding: '10px' }}>{employee.phoneNumber}</td>
              <td style={{ padding: '10px' }}>{employee.department}</td>
              <td style={{ padding: '10px' }}>{employee.dateOfJoining}</td>
              <td style={{ padding: '10px' }}>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to go back */}
      <div style={{ marginTop: '20px' }}>
        <button type="button" onClick={goBack}>Back</button>
      </div>
    </div>
  );
}

export default DisplayEmployees;
