import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TestInstructions() {
  const navigate = useNavigate();
  const { testId } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-2xl bg-white rounded-2xl shadow-2xl p-8"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Test Instructions</h1>

        <div className="space-y-6 mb-8">
          {/* Test Details */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Test Details</h2>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="font-semibold">Total Questions:</p>
                <p className="text-lg">75</p>
              </div>
              <div>
                <p className="font-semibold">Duration:</p>
                <p className="text-lg">3 Hours</p>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="bg-green-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-green-900 mb-4">Sections</h2>
            <div className="space-y-2 text-gray-700">
              <p>• <strong>Physics:</strong> 25 Questions</p>
              <p>• <strong>Chemistry:</strong> 25 Questions</p>
              <p>• <strong>Mathematics:</strong> 25 Questions</p>
            </div>
          </div>

          {/* Marking */}
          <div className="bg-orange-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-orange-900 mb-4">Marking Scheme</h2>
            <div className="space-y-2 text-gray-700">
              <p>• <strong>Correct Answer:</strong> +4 Marks</p>
              <p>• <strong>Wrong Answer:</strong> -1 Mark</p>
              <p>• <strong>Unattempted:</strong> 0 Marks</p>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-red-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-red-900 mb-4">Important Notes</h2>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Cannot change answers after submission</li>
              <li>✓ Do not refresh the page during the test</li>
              <li>✓ Do not switch tabs</li>
              <li>✓ Ensure stable internet connection</li>
            </ul>
          </div>
        </div>

        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/test/${testId}`)}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition"
        >
          START TEST
        </motion.button>
      </motion.div>
    </div>
  );
}