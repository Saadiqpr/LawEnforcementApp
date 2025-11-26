import { useState } from 'react';
import API from '../api';

function IncidentForm() {
  const [incidentID, setIncidentID] = useState('');
  const [title, setTitle] = useState('');
  const [crimeType, setCrimeType] = useState('');
  const [date, setDate] = useState('');
  const [locationID, setLocationID] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');
    try {
      await API.post('/incidents', { incidentID, title, crimeType, date, locationID });
      setMessage('Success! Incident created.');
      setIncidentID(''); setTitle(''); setCrimeType(''); setDate(''); setLocationID('');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error: Could not create incident.');
    }
  };

  return (
    <div style={{ textAlign: 'left', maxWidth: '500px', margin: '20px auto' }}>
      <h2>Report a New Incident</h2>
      {message && <p style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}><label>ID:</label><br/><input type="text" value={incidentID} onChange={(e)=>setIncidentID(e.target.value)} required style={{width:'100%'}}/></div>
        <div style={{ marginBottom: '10px' }}><label>Title:</label><br/><input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} required style={{width:'100%'}}/></div>
        <div style={{ marginBottom: '10px' }}><label>Type:</label><br/><input type="text" value={crimeType} onChange={(e)=>setCrimeType(e.target.value)} required style={{width:'100%'}}/></div>
        <div style={{ marginBottom: '10px' }}><label>Date:</label><br/><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} required style={{width:'100%'}}/></div>
        <div style={{ marginBottom: '10px' }}><label>Location ID:</label><br/><input type="text" value={locationID} onChange={(e)=>setLocationID(e.target.value)} required style={{width:'100%'}}/></div>
        <button type="submit" style={{ marginTop: '10px', padding: '10px' }}>Submit Report</button>
      </form>
    </div>
  );
}

export default IncidentForm;