import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionCard from './QuestionCard';
import AnswerCard from './AnswerCard';

const InterviewBot = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    // Fetch questions from backend
    axios.get('http://localhost:5000/api/questions')
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleNextQuestion = () => {
    setAnswer('');
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmitAnswer = () => {
    axios.post('http://localhost:5000/api/submit-answer', {
      question: questions[currentQuestionIndex].question,
      answer: answer,
    })
    .then(response => {
      alert('Answer submitted successfully!');
      handleNextQuestion();
    })
    .catch(error => console.log(error));
  };

  if (questions.length === 0) return <div>Loading questions...</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h1>Interview Bot</h1>
      <QuestionCard question={currentQuestion.question} />
      <textarea
        value={answer}
        onChange={handleAnswerChange}
        placeholder="Type your answer here"
      />
      <button onClick={handleSubmitAnswer}>Submit Answer</button>
      {currentQuestionIndex < questions.length - 1 && (
        <button onClick={handleNextQuestion}>Next Question</button>
      )}
      {currentQuestionIndex === questions.length - 1 && (
        <div>
          <h3>End of Interview!</h3>
        </div>
      )}
      <AnswerCard answer={currentQuestion.answer} />
    </div>
  );
};

export default InterviewBot;
