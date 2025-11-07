import React, { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import UploadPage from './components/UploadPage';
import { getToken, logoutUser } from './utils/auth';

export default function App() {
  const [view, setView] = useState('auth');
  const [events, setEvents] = useState([]);
  const [notification, setNotification] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(!!getToken()); // check for stored token

  useEffect(() => {
    if (isLoggedIn && view === 'auth') {
      setView('dashboard');
    }
  }, [isLoggedIn, view]);

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleLogin = () => {
    setLoggedIn(true); // update logged-in state
    setView('dashboard');
    showNotif('Welcome to CSR Impact Tracker!');
  };

  const handleLogout = () => {
    logoutUser();
    setLoggedIn(false);
    setView('auth');
    setEvents([]);
  };

  const handleUpload = (parsedEvents) => {
    setEvents(parsedEvents);
    setView('dashboard');
    showNotif('Data uploaded successfully!');
  };

  const handleClear = () => {
    setEvents([]);
    showNotif('All data cleared!');
  };

  const handleExportPDF = () => {
    window.print();
    showNotif('Use Print dialog to save as PDF');
  };

  if (!isLoggedIn && view === 'auth') {
    return <AuthForm onLogin={handleLogin} />;
  }

  if (view === 'upload') {
    return (
      <UploadPage
        onBack={() => setView('dashboard')}
        onUpload={handleUpload}
        onClear={handleClear}
        notification={notification}
      />
    );
  }

  return (
    <Dashboard
      events={events}
      onNavigateToUpload={() => setView('upload')}
      onLogout={handleLogout}
      notification={notification}
      onExportPDF={handleExportPDF}
    />
  );
}
