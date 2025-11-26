import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import IncidentList from './components/IncidentList';
import IncidentForm from './components/IncidentForm';
import GenericCollectionTable from './components/GenericCollectionTable';
import './App.css';

function DashboardPlaceholder() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>
      <p>Welcome to the CrimeDB Admin Panel.</p>
      <p>Select a module from the sidebar to manage data.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPlaceholder />} />
            
            {/* CUSTOM INCIDENT ROUTES */}
            <Route path="incidents" element={<IncidentList />} />
            <Route path="incidents/create" element={<IncidentForm />} />

            {/* UNIVERSAL CRUD ROUTES FOR ALL OTHER 14 COLLECTIONS */}
            <Route path="people" element={<GenericCollectionTable collectionName="people" />} />
            <Route path="reports" element={<GenericCollectionTable collectionName="reports" />} />
            <Route path="arrests" element={<GenericCollectionTable collectionName="arrests" />} />
            <Route path="charges" element={<GenericCollectionTable collectionName="charges" />} />
            <Route path="cases" element={<GenericCollectionTable collectionName="cases" />} />
            <Route path="sentences" element={<GenericCollectionTable collectionName="sentences" />} />
            <Route path="departments" element={<GenericCollectionTable collectionName="departments" />} />
            <Route path="officers" element={<GenericCollectionTable collectionName="officers" />} />
            <Route path="prisons" element={<GenericCollectionTable collectionName="prisons" />} />
            <Route path="locations" element={<GenericCollectionTable collectionName="locations" />} />
            {/* Added the missing ones: */}
            <Route path="evidence" element={<GenericCollectionTable collectionName="evidence" />} />
            <Route path="forensics" element={<GenericCollectionTable collectionName="forensics" />} />
            <Route path="vehicles" element={<GenericCollectionTable collectionName="vehicles" />} />
            <Route path="weapons" element={<GenericCollectionTable collectionName="weapons" />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;