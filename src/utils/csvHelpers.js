export const parseCSVFile = (file, onComplete) => {
  const Papa = require('papaparse');
  
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      const parsed = results.data.map((row, idx) => ({
        id: idx,
        event_name: row.Event_Name || row.event_name || 'Event',
        event_type: row.Event_Type || row.event_type || 'General',
        event_date: row.Date || row.date || '2024-01-01',
        attendees: parseInt(row.Attendees || row.attendees || 0),
        feedback_score: parseFloat(row.Feedback_Score || row.feedback_score || 0),
        volunteers: parseInt(row.Volunteers || row.volunteers || 0),
        donations: parseFloat(String(row.Donations || row.donations || 0).replace(/[₹,\s]/g, ''))
      }));
      onComplete(parsed);
    }
  });
};

export const downloadCSV = (csvContent, filename) => {
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const calculateKPIs = (events) => {
  const totalAttendees = events.reduce((sum, e) => sum + (e.attendees || 0), 0);
  const totalDonations = events.reduce((sum, e) => sum + (e.donations || 0), 0);
  const avgFeedback = events.length 
    ? events.reduce((sum, e) => sum + (e.feedback_score || 0), 0) / events.length 
    : 0;
  const totalVolunteers = events.reduce((sum, e) => sum + (e.volunteers || 0), 0);

  return {
    totalAttendees,
    totalDonations,
    avgFeedback,
    totalVolunteers
  };
};

export const generateInsights = (events, kpis) => {
  if (!events.length) {
    return ['Upload event data to see insights'];
  }

  const { totalAttendees, totalDonations, avgFeedback } = kpis;
  
  return [
    `Average: ${Math.round(totalAttendees / events.length)} attendees per event`,
    `Donation per attendee: ₹${(totalDonations / totalAttendees || 0).toFixed(2)}`,
    `Feedback score: ${avgFeedback.toFixed(1)}/5.0 - ${avgFeedback >= 4.5 ? 'Excellent' : 'Very Good'}!`,
    `${events.length} events analyzed with ${kpis.totalVolunteers} volunteers`
  ];
};