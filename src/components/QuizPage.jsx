import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const QuizPage = ({ 
  quiz, 
  currentQuestion, 
  setCurrentQuestion, // We need a way to update the current question
  handleAnswer, 
  timeLeft, 
  useHint, 
  hintUsed, 
  goToSummaryPage // Function to go to the summary/results page
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer
  const [submitted, setSubmitted] = useState(false); // Track if answer has been submitted
  const question = quiz.questions[currentQuestion];

  if (!question) {
    return <div>Loading...</div>;
  }

  const onAnswerClick = (option) => {
    setSelectedAnswer(option);
    setSubmitted(false); // Reset submitted state when a new option is clicked
  };

  const onSubmit = () => {
    setSubmitted(true);
    handleAnswer(selectedAnswer); // Pass selected answer to the parent function
  };

  const onNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1); // Move to next question
      setSelectedAnswer(null); // Reset selected answer for the next question
      setSubmitted(false); // Reset submitted state
    } else {
      goToSummaryPage(); // Navigate to summary/results page when last question is reached
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-200 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">{quiz.title}</h1>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </h2>
            <p className="text-red-500 font-bold">Time left: {timeLeft} seconds</p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div
              className="bg-indigo-500 h-4 rounded-full"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>

          <p className="text-lg mb-4">{question.question}</p>
        </div>

        {/* Answer Options with Hover Effect */}
        <div className="space-y-4 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswerClick(option)}
              className={`w-full bg-gray-100 hover:bg-indigo-100 text-left px-4 py-3 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                selectedAnswer === option ? 'bg-indigo-300' : ''
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        {selectedAnswer && !submitted && (
          <div className="text-center">
            <button
              onClick={onSubmit}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Submit Answer
            </button>
          </div>
        )}

        {/* Next Question Button */}
        {submitted && (
          <div className="mt-6 text-center">
            <button
              onClick={onNextQuestion}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        )}

        {/* 50/50 Hint Button */}
        <div className="text-center mt-4">
          <button
            onClick={useHint}
            disabled={hintUsed}
            className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              hintUsed ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {hintUsed ? 'Hint Used' : 'Use 50/50 Hint'}
          </button>
        </div>
      </div>
    </div>
  );
};

QuizPage.propTypes = {
  quiz: PropTypes.shape({
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
        correctAnswer: PropTypes.string.isRequired,
        explanation: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  currentQuestion: PropTypes.number.isRequired,
  setCurrentQuestion: PropTypes.func.isRequired, // A function to update the current question index
  handleAnswer: PropTypes.func.isRequired,
  timeLeft: PropTypes.number.isRequired,
  useHint: PropTypes.func.isRequired,
  hintUsed: PropTypes.bool.isRequired,
  goToSummaryPage: PropTypes.func.isRequired, // Function to navigate to the summary/results page
};

export default QuizPage;
