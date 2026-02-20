import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

const features = [
  {
    icon: '📝',
    title: 'Mock Test',
    description: 'Practice with realistic JEE Main format tests',
  },
  {
    icon: '📄',
    title: 'PDF Upload',
    description: 'Upload PDFs and auto-parse questions',
  },
  {
    icon: '🤖',
    title: 'AI Analysis',
    description: 'Get intelligent performance analysis',
  },
  {
    icon: '📊',
    title: 'History',
    description: 'Track your performance over time',
  },
];

export default function LandingPage() {
  const { user } = useAuth();

  const handleCardClick = (path) => {
    if (!user) {
      window.location.href = '/login';
    } else {
      window.location.href = path;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-4"
        >
          Ace Your JEE Mains
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-600 mb-8"
        >
          Practice with realistic mock tests and get AI-powered insights
        </motion.p>
        {!user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 justify-center"
          >
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition"
            >
              Login
            </Link>
          </motion.div>
        )}
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleCardClick('/dashboard')}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer transition transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to ace your JEE Mains?</h2>
          <p className="text-lg mb-8">Start practicing now with our comprehensive mock tests</p>
          {!user && (
            <Link
              to="/signup"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Start Free Trial
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
