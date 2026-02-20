import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

export default function AdminPanel() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tests, setTests] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [testForm, setTestForm] = useState({ name: '', date: '', shift: 'Shift 1' });
  const [pdfFile, setPdfFile] = useState(null);
  const [selectedTestForPDF, setSelectedTestForPDF] = useState('');

  useEffect(() => {
    if (user?.role !== 'admin') {
      window.location.href = '/dashboard';
      return;
    }
    fetchAdminData();
  }, [user]);

  const fetchAdminData = async () => {
    try {
      const [testsRes, analyticsRes] = await Promise.all([
        axios.get('/api/tests'),
        axios.get('/api/admin/analytics'),
      ]);
      setTests(testsRes.data);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    }
  };

  const handleCreateTest = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/test/create', testForm);
      setTestForm({ name: '', date: '', shift: 'Shift 1' });
      fetchAdminData();
      alert('Test created successfully');
    } catch (error) {
      alert('Failed to create test');
    }
  };

  const handlePDFUpload = async (e) => {
    e.preventDefault();
    if (!pdfFile || !selectedTestForPDF) {
      alert('Please select a test and file');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', pdfFile);
    formData.append('testId', selectedTestForPDF);

    try {
      const response = await axios.post('/api/admin/test/upload-pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(`Questions created: ${response.data.questionsCreated}`);
      setPdfFile(null);
      setSelectedTestForPDF('');
      fetchAdminData();
    } catch (error) {
      alert('Failed to upload PDF');
    }
  };

  const handleDeleteTest = async (testId) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      try {
        await axios.delete(`/api/admin/test/${testId}`);
        fetchAdminData();
        alert('Test deleted successfully');
      } catch (error) {
        alert('Failed to delete test');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-400">Manage tests and view analytics</p>
        </div>
      </header>

      <div className="container mx-auto p-4">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b-2 border-gray-700">
          {['dashboard', 'create-test', 'upload-pdf', 'manage-tests'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-bold transition ${
                activeTab === tab
                  ? 'border-b-4 border-indigo-600 text-indigo-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.replace('-', ' ').toUpperCase()}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            {analytics && (
              <>
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 rounded-xl">
                  <p className="text-gray-300 mb-2">Total Attempts</p>
                  <p className="text-4xl font-bold">{analytics.totalAttempts}</p>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-xl">
                  <p className="text-gray-300 mb-2">Average Score</p>
                  <p className="text-4xl font-bold">{analytics.averageScore.toFixed(1)}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-xl">
                  <p className="text-gray-300 mb-2">Total Tests</p>
                  <p className="text-4xl font-bold">{tests.length}</p>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Create Test Tab */}
        {activeTab === 'create-test' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800 p-8 rounded-xl max-w-2xl"
          >
            <h2 className="text-2xl font-bold mb-6">Create New Test</h2>
            <form onSubmit={handleCreateTest} className="space-y-4">
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Test Name</label>
                <input
                  type="text"
                  value={testForm.name}
                  onChange={(e) => setTestForm({ ...testForm, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-indigo-600 outline-none text-white"
                  placeholder="JEE Main Mock Test 1"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Date</label>
                  <input
                    type="date"
                    value={testForm.date}
                    onChange={(e) => setTestForm({ ...testForm, date: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-indigo-600 outline-none text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Shift</label>
                  <select
                    value={testForm.shift}
                    onChange={(e) => setTestForm({ ...testForm, shift: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-indigo-600 outline-none text-white"
                  >
                    <option>Shift 1</option>
                    <option>Shift 2</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-bold transition"
              >
                Create Test
              </button>
            </form>
          </motion.div>
        )}

        {/* Upload PDF Tab */}
        {activeTab === 'upload-pdf' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800 p-8 rounded-xl max-w-2xl"
          >
            <h2 className="text-2xl font-bold mb-6">Upload Test PDF</h2>
            <form onSubmit={handlePDFUpload} className="space-y-4">
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Select Test</label>
                <select
                  value={selectedTestForPDF}
                  onChange={(e) => setSelectedTestForPDF(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-indigo-600 outline-none text-white"
                  required
                >
                  <option value="">Choose a test...</option>
                  {tests.map(test => (
                    <option key={test._id} value={test._id}>{test.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-2">Upload PDF</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-bold transition"
              >
                Upload & Parse PDF
              </button>
            </form>
          </motion.div>
        )}

        {/* Manage Tests Tab */}
        {activeTab === 'manage-tests' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold mb-6">Manage Tests</h2>
            {tests.map(test => (
              <div key={test._id} className="bg-gray-800 p-6 rounded-xl flex justify-between items-center">
                <div>
                  <p className="text-xl font-bold">{test.name}</p>
                  <p className="text-gray-400">{test.shift} - {new Date(test.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500 mt-2">Status: <span className="text-indigo-400">{test.status}</span></p>
                </div>
                <button
                  onClick={() => handleDeleteTest(test._id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
