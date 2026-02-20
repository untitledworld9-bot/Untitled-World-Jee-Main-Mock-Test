import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShift, setSelectedShift] = useState('Shift 1');

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await axios.get('/api/tests');
      setTests(response.data);
    } catch (error) {
      console.error('Failed to fetch tests:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl font-bold text-gray-900"
          >
            Welcome 🤗 {user?.name}
          </motion.h1>
          <p className="text-gray-600 mt-2">Ready to ace your JEE Mains?</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b-2">
          <button className="px-4 py-2 text-lg font-bold border-b-4 border-indigo-600 text-indigo-600">
            JEE Mains Mock Test
          </button>
          <button className="px-4 py-2 text-lg font-gray-600 hover:text-gray-900">
            Performance History
          </button>
          <button className="px-4 py-2 text-lg font-gray-600 hover:text-gray-900">
            Profile Settings
          </button>
        </div>

        {/* Regular Mock Tests */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Regular Mock Tests</h2>
          {loading ? (
            <p className="text-gray-600">Loading tests...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {tests.map((test, index) => (
                <motion.div
                  key={test._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer transition transform hover:scale-105"
                >
                  <div className="text-2xl font-bold text-indigo-600 mb-2">Mock {index + 1}</div>
                  <p className="text-gray-600 text-sm">{test.name}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    {new Date(test.date).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/test/${test._id}/instructions`}
                    className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg text-center hover:bg-indigo-700 transition block"
                  >
                    Start Test
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Real Attempt Simulation */}
        <section className="mb-12 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">JEE Mains January 2026 Attempt</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Select Shift</label>
              <select
                value={selectedShift}
                onChange={(e) => setSelectedShift(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 outline-none"
              >
                <option>Shift 1</option>
                <option>Shift 2</option>
              </select>
            </div>
          </div>
          <button
            disabled={!selectedDate}
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            Start Attempt
          </button>
        </section>
      </div>
    </div>
  );
}