import { useState, useEffect } from 'react';
import API from '../api';

function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.get('/incidents')
      .then(response => {
        setIncidents(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading report data...</p>;

  return (
    <div>
      <h2>All Incidents</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', color: 'black' }}>
            <th>ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr key={incident._id}>
              <td>{incident.incidentID}</td>
              <td>{incident.title}</td>
              <td>{incident.crimeType}</td>
              <td>{new Date(incident.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IncidentList;