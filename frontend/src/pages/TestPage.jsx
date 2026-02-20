import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function TestPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [marked, setMarked] = useState({});
  const [timeLeft, setTimeLeft] = useState(180 * 60); // 3 hours in seconds
  const [currentSection, setCurrentSection] = useState('Physics');
  const [loading, setLoading] = useState(true);
  const [attemptId, setAttemptId] = useState(null);

  const sections = ['Physics', 'Chemistry', 'Mathematics'];
  const sectionQuestions = {
    Physics: [0, 24],
    Chemistry: [25, 49],
    Mathematics: [50, 74],
  };

  useEffect(() => {
    fetchTestData();
    startAttempt();
  }, [testId]);

  useEffect(() => {
    // Timer
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          submitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Prevent tab switch
    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert('⚠️ Warning: Do not switch tabs during the test!');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const fetchTestData = async () => {
    try {
      const response = await axios.get(`/api/tests/${testId}/questions`);
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      setLoading(false);
    }
  };

  const startAttempt = async () => {
    try {
      const response = await axios.post('/api/attempts/start', { testId });
      setAttemptId(response.data.attemptId);
    } catch (error) {
      console.error('Failed to start attempt:', error);
    }
  };

  const handleAnswerSelect = (answer) => {
    setResponses({
      ...responses,
      [questions[currentQuestion]._id]: answer,
    });
  };

  const handleMarkForReview = () => {
    setMarked({
      ...marked,
      [questions[currentQuestion]._id]: !marked[questions[currentQuestion]._id],
    });
  };

  const handleClearResponse = () => {
    const newResponses = { ...responses };
    delete newResponses[questions[currentQuestion]._id];
    setResponses(newResponses);
  };

  const handleSaveAndNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const submitTest = async () => {
    if (!attemptId) return;

    try {
      const formattedResponses = questions.map(q => ({
        questionId: q._id,
        selectedAnswer: responses[q._id] || null,
      }));

      const response = await axios.post('/api/attempts/submit', {
        attemptId,
        responses: formattedResponses,
      });

      navigate(`/result/${attemptId}`);
    } catch (error) {
      console.error('Failed to submit test:', error);
      alert('Failed to submit test');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const question = questions[currentQuestion];
  const formattedTime = `${Math.floor(timeLeft / 3600).toString().padStart(2, '0')}:${Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 p-4 sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Untitled World JEE Mock Test</h1>
          <div className="text-2xl font-bold text-red-400">{formattedTime}</div