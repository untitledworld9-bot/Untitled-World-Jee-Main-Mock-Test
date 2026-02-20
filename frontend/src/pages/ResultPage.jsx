import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function ResultPage() {
  const { attemptId } = useParams();
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResult();
  }, [attemptId]);

  const fetchResult = async () => {
    try {
      const response = await axios.get(`/api/attempts/result/${attemptId}`);
      setAttempt(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch result:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading results...</div>;
  }

  if (!attempt) {
    return <div className="flex items-center justify-center h-screen">Result not found</div>;
  }

  const { totalMarks, correctAnswers, incorrectAnswers, unattempted, percentile, accuracy, sectionWiseScore } = attempt;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Test Completed! 🎉</h1>
          <p className="text-gray-600 text-lg">Here's your performance analysis</p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 mb-8"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center mb-8">
            {/* Total Marks */}
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-xl">
              <p className="text-sm font-semibold mb-2">Total Marks</p>
              <p className="text-4xl font-bold">{totalMarks}</p>
              <p className="text-xs mt-2">out of 300</p>
            </div>

            {/* Percentile */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
              <p className="text-sm font-semibold mb-2">Estimated Percentile</p>
              <p className="text-4xl font-bold">{percentile}%</p>
            </div>

            {/* Accuracy */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
              <p className="text-sm font-semibold mb-2">Accuracy</p>
              <p className="text-4xl font-bold">{accuracy}%</p>
            </div>

            {/* Time Taken */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
              <p className="text-sm font-semibold mb-2">Time Taken</p>
              <p className="text-4xl font-bold">{Math.floor(attempt.duration / 60)}</p>
              <p className="text-xs mt-2">minutes</p>
            </div>
          </div>

          {/* Answer Summary */}
          <div className="grid md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-xl">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{correctAnswers}</p>
              <p className="text-gray-600">Correct</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">{incorrectAnswers}</p>
              <p className="text-gray-600">Incorrect</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">{unattempted}</p>
              <p className="text-gray-600">Unattempted</p>
            </div>
          </div>
        </motion.div>

        {/* Section-wise Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Section-wise Performance</h2>
          <div className="space-y-6">
            {Object.entries(sectionWiseScore).map(([section, stats]) => {
              const total = stats.correct + stats.incorrect + stats.unattempted;
              const percentage = ((stats.correct / total) * 100).toFixed(1);

              return (
                <div key={section}>
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-bold text-gray-900">{Object.keys(sectionWiseScore)[Object.values(sectionWiseScore).indexOf(stats)]}</p>
                    <span className="text-lg font-bold text-indigo-600">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full"
                    ></motion.div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>✓ {stats.correct} Correct</span>
                    <span>✗ {stats.incorrect} Incorrect</span>
                    <span>- {stats.unattempted} Unattempted</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* AI Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🤖 AI Performance Analysis</h2>
          <div className="space-y-4">
            {/* Weak Areas */}
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <p className="font-bold text-red-900 mb-2">Areas to Improve:</p>
              <ul className="text-red-800 space-y-1">
                <li>• Focus more on Organic Chemistry concepts</li>
                <li>• Practice numerical problems in Mathematics</li>
                <li>• Revise Thermodynamics and Waves in Physics</li>
              </ul>
            </div>

            {/* Strong Areas */}
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="font-bold text-green-900 mb-2">Your Strengths:</p>
              <ul className="text-green-800 space-y-1">
                <li>✓ Excellent in Mechanics concepts</li>
                <li>✓ Strong in Coordinate Geometry</li>
                <li>✓ Good understanding of Inorganic Chemistry</li>
              </ul>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-bold text-blue-900 mb-2">Improvement Tips:</p>
              <ul className="text-blue-800 space-y-1">
                <li>📚 Increase your practice time to 2-3 hours daily</li>
                <li>⏱️ Work on time management - solve 1 question per minute</li>
                <li>🎯 Take 2-3 more mock tests before the actual exam</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mb-8">
          <Link
            to="/dashboard"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition"
          >
            Back to Dashboard
          </Link>
          <Link
            to="/dashboard"
            className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-indigo-50 transition"
          >
            Try Another Test
          </Link>
        </div>
      </div>
    </div>
  );
}