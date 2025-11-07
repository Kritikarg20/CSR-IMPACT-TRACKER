import React from 'react';
import { Upload, ArrowLeft, FileText } from 'lucide-react';
import Papa from 'papaparse';
import { SAMPLE_CSV } from '../utils/constants';
import { downloadCSV } from '../utils/csvHelpers';

export default function UploadPage({ onBack, onUpload, onClear, notification }) {
  const handleFileUpload = (file) => {
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
        onUpload(parsed);
      }
    });
  };

  const handleDownloadSample = () => {
    downloadCSV(SAMPLE_CSV, 'sample-csr-events.csv');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {notification}
        </div>
      )}
      
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">Upload Event Data</h1>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Import Your Event Data</h2>
          <p className="text-gray-600">Upload CSV file with your event information to generate insights</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors">
            <Upload className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Upload CSV File</h3>
            <p className="text-gray-600 mb-4">Drag and drop your CSV file here, or click to browse</p>
            <label className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
              <FileText size={18} />
              Choose File
              <input
                type="file"
                accept=".csv"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={onClear}
              className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Clear All Data
            </button>
            <button
              onClick={handleDownloadSample}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Download Sample
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Required Columns</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-blue-600">Event_Name</p>
              <p className="text-sm text-gray-600">Event title</p>
            </div>
            <div>
              <p className="font-medium text-blue-600">Event_Type</p>
              <p className="text-sm text-gray-600">Category</p>
            </div>
            <div>
              <p className="font-medium text-blue-600">Date</p>
              <p className="text-sm text-gray-600">Event date</p>
            </div>
            <div>
              <p className="font-medium text-blue-600">Attendees</p>
              <p className="text-sm text-gray-600">Number of people</p>
            </div>
            <div>
              <p className="font-medium text-blue-600">Feedback_Score</p>
              <p className="text-sm text-gray-600">Rating (0-5)</p>
            </div>
            <div>
              <p className="font-medium text-blue-600">Volunteers</p>
              <p className="text-sm text-gray-600">Count</p>
            </div>
            <div>
              <p className="font-medium text-blue-600">Donations</p>
              <p className="text-sm text-gray-600">Amount (₹)</p>
            </div>
            <div>
              <p className="font-medium text-blue-600">Organizer</p>
              <p className="text-sm text-gray-600">Optional</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}