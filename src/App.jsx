import React, { useState, useEffect } from 'react';
import QuizList from './components/QuizList';
import QuizPage from './components/QuizPage';
import SummaryPage from './components/SummaryPage';

const quizzes = [
  {
    id: 1,
    title: 'General Knowledge',
    description: 'Test your knowledge on various topics!',
    category: 'General',
    difficulty: 'Medium',
    questions: [
      {
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 'Paris',
        explanation: 'Paris is the capital and most populous city of France.',
      },
      {
        question: 'Who painted the Mona Lisa?',
        options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
        correctAnswer: 'Leonardo da Vinci',
        explanation: 'Leonardo da Vinci painted the Mona Lisa, one of the most famous works of art in the world.',
      },
      {
        question: 'What is the highest mountain in the world?',
        options: ['K2', 'Kangchenjunga', 'Mount Everest', 'Lhotse'],
        correctAnswer: 'Mount Everest',
        explanation: 'Mount Everest, located in the Himalayas, is Earth’s highest mountain above sea level.',
      },
      {
        question: 'How many continents are there in the world?',
        options: ['5', '6', '7', '8'],
        correctAnswer: '7',
        explanation: 'The 7 continents are Asia, Africa, North America, South America, Antarctica, Europe, and Australia.',
      },
      {
        question: 'What is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correctAnswer: 'Pacific Ocean',
        explanation: 'The Pacific Ocean is the largest and deepest of the world\'s oceanic divisions.',
      },
    ],
  },
  {
    id: 2,
    title: 'Technology Trivia',
    description: 'Put your tech knowledge to the test!',
    category: 'Technology',
    difficulty: 'Hard',
    questions: [
      {
        question: 'What does HTML stand for?',
        options: ['Hyper Text Markup Language', 'High-Level Text Management Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'],
        correctAnswer: 'Hyper Text Markup Language',
        explanation: 'HTML stands for Hyper Text Markup Language, the standard markup language for creating web pages.',
      },
      {
        question: 'What is the name of the operating system created by Google?',
        options: ['Windows', 'iOS', 'Android', 'Linux'],
        correctAnswer: 'Android',
        explanation: 'Android is a mobile operating system developed by Google, primarily designed for touchscreen mobile devices.',
      },
      {
        question: 'Which company created the iPhone?',
        options: ['Samsung', 'Microsoft', 'Apple', 'Nokia'],
        correctAnswer: 'Apple',
        explanation: 'Apple Inc. is responsible for the creation and development of the iPhone.',
      },
      {
        question: 'What does CPU stand for?',
        options: ['Central Processing Unit', 'Computer Processing Unit', 'Control Processing Unit', 'Core Processing Unit'],
        correctAnswer: 'Central Processing Unit',
        explanation: 'CPU stands for Central Processing Unit, the primary component of a computer that interprets and executes instructions.',
      },
      {
        question: 'Which social media platform is known for its 280-character limit on posts?',
        options: ['Facebook', 'Instagram', 'Twitter', 'TikTok'],
        correctAnswer: 'Twitter',
        explanation: 'Twitter is known for its short-form posts, originally limited to 140 characters, and now expanded to 280 characters.',
      },
    ],
  },
  {
    id: 3,
    title: 'Movie Mania',
    description: 'Are you a movie buff? Let\'s find out!',
    category: 'Entertainment',
    difficulty: 'Medium',
    questions: [
      {
        question: 'Which movie won the Academy Award for Best Picture in 2023?',
        options: ['Everything Everywhere All at Once', 'The Fabelmans', 'Top Gun: Maverick', 'Avatar: The Way of Water'],
        correctAnswer: 'Everything Everywhere All at Once',
        explanation: '"Everything Everywhere All at Once" swept the 95th Academy Awards, winning seven awards including Best Picture.',
      },
      {
        question: 'Who directed the movie "Jaws"?',
        options: ['George Lucas', 'Steven Spielberg', 'Quentin Tarantino', 'Martin Scorsese'],
        correctAnswer: 'Steven Spielberg',
        explanation: 'Steven Spielberg directed "Jaws," a 1975 American thriller film about a man-eating great white shark.',
      },
      {
        question: 'Which actor is known for playing the character Indiana Jones?',
        options: ['Tom Hanks', 'Harrison Ford', 'George Clooney', 'Brad Pitt'],
        correctAnswer: 'Harrison Ford',
        explanation: 'Harrison Ford portrayed the iconic character of archaeologist and adventurer Indiana Jones.',
      },
      {
        question: 'What is the name of the fictional school in the Harry Potter series?',
        options: ['Hogwarts School of Witchcraft and Wizardry', 'Beauxbatons Academy of Magic', 'Durmstrang Institute', 'Ilvermorny School of Witchcraft and Wizardry'],
        correctAnswer: 'Hogwarts School of Witchcraft and Wizardry',
        explanation: 'Hogwarts is the British wizarding school, led by Headmaster Albus Dumbledore.',
      },
      {
        question: 'In the movie "The Lion King," what type of animal is Simba?',
        options: ['Tiger', 'Cheetah', 'Leopard', 'Lion'],
        correctAnswer: 'Lion',
        explanation: 'Simba, the protagonist of Disney\'s "The Lion King," is a young lion who is destined to rule the Pride Lands.',
      },
    ],
  },
];
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

function App() {
  const [currentPage, setCurrentPage] = useState('quizList');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [leaderboard, setLeaderboard] = useState(
    getFromLocalStorage('leaderboard', {})
  );
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [hintUsed, setHintUsed] = useState(false);
  const [quizProgress, setQuizProgress] = useState(
    getFromLocalStorage('quizProgress', {})
  );

  useEffect(() => {
    saveToLocalStorage('leaderboard', leaderboard);
  }, [leaderboard]);

  useEffect(() => {
    saveToLocalStorage('quizProgress', quizProgress);
  }, [quizProgress]);

  useEffect(() => {
    let timer;
    if (currentPage === 'quiz' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      handleAnswer(null);
    }
    return () => clearInterval(timer);
  }, [timeLeft, currentPage]);

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    const savedProgress = getFromLocalStorage(`quizProgress_${quiz.id}`, {
      currentQuestion: 0,
      userAnswers: [],
      score: 0,
    });
    setCurrentQuestion(savedProgress.currentQuestion);
    setUserAnswers(savedProgress.userAnswers);
    setScore(savedProgress.score);
    setTimeLeft(30);
    setHintUsed(false);
    setCurrentPage('quiz');
    setQuizProgress((prevProgress) => ({
      ...prevProgress,
      [quiz.id]: savedProgress.currentQuestion,
    }));
  };

  const handleAnswer = (answer) => {
    if (currentPage !== 'quiz') return;

    const newUserAnswers = [...userAnswers, answer];
    setUserAnswers(newUserAnswers);

    let newScore = score;
    if (answer === selectedQuiz.questions[currentQuestion].correctAnswer) {
      newScore += 1;
      setScore(newScore);
    }

    const newCurrentQuestion = currentQuestion + 1;
    setQuizProgress((prevProgress) => ({
      ...prevProgress,
      [selectedQuiz.id]: newCurrentQuestion,
    }));

    saveToLocalStorage(`quizProgress_${selectedQuiz.id}`, {
      currentQuestion: newCurrentQuestion,
      userAnswers: newUserAnswers,
      score: newScore,
    });

    if (newCurrentQuestion < selectedQuiz.questions.length) {
      setCurrentQuestion(newCurrentQuestion);
      setTimeLeft(30);
      setHintUsed(false);
    } else {
      setCurrentPage('summary');
      updateLeaderboard(newScore);
      localStorage.removeItem(`quizProgress_${selectedQuiz.id}`);
    }
  };

  const restartQuiz = () => {
    setCurrentPage('quizList');
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setTimeLeft(30);
    setHintUsed(false);
  };

  const updateLeaderboard = (finalScore) => {
    setLeaderboard((prevLeaderboard) => {
      const updatedLeaderboard = {
        ...prevLeaderboard,
        [selectedQuiz.id]: [
          ...(prevLeaderboard[selectedQuiz.id] || []),
          { score: finalScore, timestamp: new Date().toISOString() },
        ]
          .sort((a, b) => b.score - a.score)
          .slice(0, 5),
      };
      saveToLocalStorage('leaderboard', updatedLeaderboard);
      return updatedLeaderboard;
    });
  };

  const useHint = () => {
    if (!hintUsed) {
      const correctAnswer = selectedQuiz.questions[currentQuestion].correctAnswer;
      const incorrectOptions = selectedQuiz.questions[
        currentQuestion
      ].options.filter((option) => option !== correctAnswer);
      const optionsToRemove = incorrectOptions
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      setSelectedQuiz((prevQuiz) => ({
        ...prevQuiz,
        questions: prevQuiz.questions.map((q, index) =>
          index === currentQuestion
            ? { ...q, options: q.options.filter((option) => !optionsToRemove.includes(option)) }
            : q
        ),
      }));
      setHintUsed(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {currentPage === 'quizList' && (
        <QuizList
          quizzes={quizzes}
          startQuiz={startQuiz}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          difficultyFilter={difficultyFilter}
          setDifficultyFilter={setDifficultyFilter}
          quizProgress={quizProgress}
          leaderboard={leaderboard}
        />
      )}
      {currentPage === 'quiz' && (
        <QuizPage
          quiz={selectedQuiz}
          currentQuestion={currentQuestion}
          handleAnswer={handleAnswer}
          timeLeft={timeLeft}
          useHint={useHint}
          hintUsed={hintUsed}
        />
      )}
      {currentPage === 'summary' && (
        <SummaryPage
          quiz={selectedQuiz}
          score={score}
          userAnswers={userAnswers}
          restartQuiz={restartQuiz}
          leaderboard={leaderboard[selectedQuiz.id] || []}
        />
      )}
    </div>
  );
}

export default App;