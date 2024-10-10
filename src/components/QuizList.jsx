import React from 'react';
import PropTypes from 'prop-types';

const QuizList = ({
  quizzes,
  startQuiz,
  categoryFilter,
  setCategoryFilter,
  difficultyFilter,
  setDifficultyFilter,
  quizProgress,
  leaderboard,
}) => {
  const categories = ['All', ...new Set(quizzes.map((quiz) => quiz.category))];
  const difficulties = ['All', ...new Set(quizzes.map((quiz) => quiz.difficulty))];

  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      (categoryFilter === 'All' || quiz.category === categoryFilter) &&
      (difficultyFilter === 'All' || quiz.difficulty === difficultyFilter)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-6">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          {/* <img
            src=""
            alt="Quiz Master Logo"
            className="w-12 h-12"
          /> */}
          <h1 className="text-4xl font-bold text-indigo-700">Quiz Master</h1>
        </div>
        <div className="space-x-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="p-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-indigo-600">{quiz.title}</h2>
              <p className="text-gray-600 mb-4">{quiz.description}</p>
              <p className="text-sm text-gray-500">Category: {quiz.category}</p>
              <p className="text-sm text-gray-500">Difficulty: {quiz.difficulty}</p>

              {quizProgress[quiz.id] !== undefined && (
                <p className="text-sm text-blue-500 mt-2">
                  Progress: {quizProgress[quiz.id]} / {quiz.questions.length} questions
                </p>
              )}
              {leaderboard[quiz.id] && leaderboard[quiz.id].length > 0 && (
                <p className="text-sm text-green-500 mt-2">
                  Top Score: {leaderboard[quiz.id][0].score}
                </p>
              )}
            </div>
            <div className="bg-indigo-50 p-4">
              <button
                onClick={() => startQuiz(quiz)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                {quizProgress[quiz.id] ? 'Resume Quiz' : 'Start Quiz'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

QuizList.propTypes = {
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      difficulty: PropTypes.string.isRequired,
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          question: PropTypes.string.isRequired,
          options: PropTypes.arrayOf(PropTypes.string).isRequired,
          correctAnswer: PropTypes.string.isRequired,
          explanation: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  startQuiz: PropTypes.func.isRequired,
  categoryFilter: PropTypes.string.isRequired,
  setCategoryFilter: PropTypes.func.isRequired,
  difficultyFilter: PropTypes.string.isRequired,
  setDifficultyFilter: PropTypes.func.isRequired,
  quizProgress: PropTypes.objectOf(PropTypes.number).isRequired,
  leaderboard: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        score: PropTypes.number.isRequired,
        timestamp: PropTypes.string.isRequired,
      })
    )
  ).isRequired,
};

export default QuizList;
