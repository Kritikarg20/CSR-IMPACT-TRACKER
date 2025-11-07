import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { login, signup } from '../utils/api';     // ✅ backend API calls
import { saveToken } from '../utils/auth';        // ✅ token storage helper

export default function AuthForm({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const toggleMode = () => {
    setIsSignup((prev) => !prev);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      let response;
      if (isSignup) {
        response = await signup(email, password);
        if (response.msg === 'Signup successful!') {
          setMessage('Signup successful! Please login.');
          toggleMode();
        } else {
          setMessage(response.msg || 'Signup failed.');
        }
      } else {
        response = await login(email, password);
        if (response.token) {
          saveToken(response.token);
          onLogin();
        } else {
          setMessage(response.msg || 'Login failed.');
        }
      }
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-scale-in">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">CSR Impact Tracker</h1>
            <p className="text-sm text-gray-600">Event Analytics Dashboard</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        {message && <p className="text-center text-red-500 mt-4">{message}</p>}

        <p className="mt-6 text-center text-sm text-gray-600">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            className="text-blue-600 cursor-pointer font-medium"
            onClick={toggleMode}
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
}
