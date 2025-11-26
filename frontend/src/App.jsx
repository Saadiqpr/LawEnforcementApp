import { useState } from 'react';
import API from './api'; // Import our API helper
import './App.css';

function App() {
  // 1. Setup state to hold the value of each input field
  const [incidentID, setIncidentID] = useState('');
  const [title, setTitle] = useState('');
  const [crimeType, setCrimeType] = useState('');
  const [date, setDate] = useState('');
  const [locationID, setLocationID] = useState('');
  
  // State for showing success or error messages
  const [message, setMessage] = useState('');

  // 2. This function runs when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from reloading
    setMessage('Submitting...');

    // Package the data up into an object
    const incidentData = {
      incidentID,
      title,
      crimeType,
      date,
      locationID,
    };

    try {
      // Send the POST request to the backend
      await API.post('/incidents', incidentData);
      
      // If successful:
      setMessage('Success! Incident created.');
      // Clear the form fields
      setIncidentID('');
      setTitle('');
      setCrimeType('');
      setDate('');
      setLocationID('');
    } catch (error) {
      console.error('Error creating incident:', error);
      setMessage('Error: Could not create incident. See console for details.');
    }
  };

  // 3. The HTML (JSX) for the form
  return (
    <div className="App" style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Report a New Incident</h1>
      
      {/* Show a message if one exists */}
      {message && <p style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Incident ID (e.g., INC-999):</label>
          <input
            type="text"
            value={incidentID}
            onChange={(e) => setIncidentID(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Crime Type:</label>
          <input
            type="text"
            value={crimeType}
            onChange={(e) => setCrimeType(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Location ID:</label>
          <input
            type="text"
            value={locationID}
            onChange={(e) => setLocationID(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Submit Report</button>
      </form>
    </div>
  );
}

export default App;