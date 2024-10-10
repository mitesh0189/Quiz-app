import React from 'react';
import PropTypes from 'prop-types';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Icons for correct/incorrect answers

const SummaryPage = ({ quiz, score, userAnswers, restartQuiz, leaderboard }) => (
  <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 p-6">
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Quiz Summary</h1>
      
      <p className="text-xl font-semibold text-indigo-600 mb-6 text-center">
        Your score: <span className="text-green-600">{score}</span> / {quiz.questions.length}
      </p>

      {/* Display questions and answers */}
      <div className="space-y-6 mb-8">
        {quiz.questions.map((question, index) => (
          <div key={index} className="border-b pb-4">
            <p className="font-semibold text-lg">{question.question}</p>

            {/* Correct Answer */}
            <div className="flex items-center space-x-2 mt-2">
              <FaCheckCircle className="text-green-500" />
              <p className="text-green-600">Correct answer: {question.correctAnswer}</p>
            </div>

            {/* User's Answer */}
            <div className="flex items-center space-x-2 mt-1">
              {userAnswers[index] === question.correctAnswer ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <FaTimesCircle className="text-red-500" />
              )}
              <p
                className={
                  userAnswers[index] === question.correctAnswer
                    ? 'text-green-600'
                    : 'text-red-600'
                }
              >
                Your answer: {userAnswers[index] || 'Not answered'}
              </p>
            </div>

            {/* Explanation */}
            <p className="text-gray-600 mt-2 italic">{question.explanation}</p>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Leaderboard</h2>
      <div className="overflow-auto max-h-40 mb-6">
        <ul className="list-decimal list-inside space-y-2">
          {leaderboard.map((entry, index) => (
            <li
              key={index}
              className={`${
                index === 0 ? 'text-yellow-500 font-bold' : 'text-gray-800'
              }`}
            >
              Score: {entry.score} <span className="text-gray-500">(on {new Date(entry.timestamp).toLocaleString()})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Restart Quiz Button */}
      <div className="text-center">
        <button
          onClick={restartQuiz}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Take Another Quiz
        </button>
      </div>
    </div>
  </div>
);

SummaryPage.propTypes = {
  quiz: PropTypes.shape({
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        correctAnswer: PropTypes.string.isRequired,
        explanation: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  userAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  restartQuiz: PropTypes.func.isRequired,
  leaderboard: PropTypes.arrayOf(
    PropTypes.shape({
      score: PropTypes.number.isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SummaryPage;
