import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Users, Heart, Star, Upload, Download, LogOut, TrendingUp } from 'lucide-react';
import { COLORS } from '../utils/constants';
import { calculateKPIs, generateInsights } from '../utils/csvHelpers';
import KPICard from './KPICard.jsx';
import ChartCard from './ChartCard.jsx';
import InsightCard from './InsightCard.jsx';

export default function Dashboard({ events, onNavigateToUpload, onLogout, notification, onExportPDF }) {
  const kpis = calculateKPIs(events);
  const insights = generateInsights(events, kpis);

  const attendanceData = [...events].sort((a, b) => b.attendees - a.attendees).slice(0, 10);
  
  const typeData = Object.entries(
    events.reduce((acc, e) => {
      acc[e.event_type] = (acc[e.event_type] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const donationData = [...events]
    .sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
    .slice(-10);

  return (
    <div className="min-h-screen bg-gray-50">
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {notification}
        </div>
      )}
      
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-600">CSR Impact Tracker</h1>
                <p className="text-sm text-gray-600">Event Analytics</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onNavigateToUpload}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Upload size={18} />
                <span className="hidden sm:inline">Upload</span>
              </button>
              <button
                onClick={onExportPDF}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Export PDF</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Attendees"
            value={kpis.totalAttendees.toLocaleString()}
            icon={Users}
            gradient="bg-blue-600"
          />
          <KPICard
            title="Total Donations"
            value={`₹${kpis.totalDonations.toLocaleString()}`}
            icon={Heart}
            gradient="bg-blue-600"
          />
          <KPICard
            title="Avg Feedback"
            value={kpis.avgFeedback.toFixed(1)}
            icon={Star}
            gradient="bg-blue-600"
          />
          <KPICard
            title="Total Volunteers"
            value={kpis.totalVolunteers.toLocaleString()}
            icon={Users}
            gradient="bg-blue-600"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, i) => (
              <InsightCard key={i} insight={insight} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Attendance by Event" description="Top events by attendance">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="event_name" angle={-45} textAnchor="end" height={100} fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Bar dataKey="attendees" fill={COLORS.primary} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Event Type Distribution" description="Breakdown by category">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={typeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {typeData.map((entry, index) => (
                    <Cell key={index} fill={COLORS.chartColors[index % COLORS.chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Donation Trend" description="Recent donations">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={donationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="event_date" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Line type="monotone" dataKey="donations" stroke={COLORS.accent} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Event Performance" description="Compare metrics">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="event_name" angle={-45} textAnchor="end" height={100} fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Bar dataKey="attendees" fill={COLORS.primary} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </main>
    </div>
  );
}