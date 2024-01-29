import React, { useState } from 'react';
import '../components/QuestionBox.css';
import questionsData from './questions';
import logo from './logo3.png';

const QuestionBox = () => {
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState(questionsData);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle('dark-mode', darkMode);
  };

  const question = questions[index];

  const checkAns = (ans) => {
    if (selectedOption) {
      return selectedOption.text === ans && selectedOption.isCorrect
        ? 'correct'
        : selectedOption.text === ans
        ? 'incorrect'
        : '';
    }
    return '';
  };

  const handleOptionClick = (option) => {
    if (!selectedOption) {
      const updatedQuestions = [...questions];
      updatedQuestions[index].options = updatedQuestions[index].options.map((opt) => ({
        ...opt,
        selected: opt.id === option.id,
      }));
      setQuestions(updatedQuestions);
  
      setSelectedOption({ ...option, selected: true });
  
      setTimeout(() => {
        if (index < questions.length - 1) {
          setIndex((prevIndex) => prevIndex + 1);
          setSelectedOption(null);
          setHighlightedIndex(null);
        } else {
          setShowResult(true);
        }
      }, 1000);
    }
  };
  

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setHighlightedIndex(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setQuestions(questionsData);
    setHighlightedIndex(null);
  };

  const handleHighlight = () => {
    setHighlightedIndex(index);
  };

  const handleRemoveHighlight = () => {
    setHighlightedIndex(null);
  };

  const calculateScore = () => {
    const correctAnswers = questions.filter((q) =>
      q.options.some((opt) => opt.isCorrect && opt.selected)
    ).length;

    const percentage = ((correctAnswers / questions.length) * 100).toFixed(2);
    return `${correctAnswers} out of ${questions.length} (${percentage}%)`;
  };

  return (
    <>
      <div className="header">
        <div className="mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </div>
        <img id="logo" src={logo} alt="Quiz Logo" />
      </div>
      <div className={`box ${darkMode ? 'dark-text' : 'light-text'}`}>
        <h1>Quiz App</h1>
        <hr />
        {showResult ? (
          <div className="result-container">
            <h2 id="score">Final Result</h2>
            <p id="score1">{calculateScore()}</p>
            <button id="restart" onClick={handleRestart}>Restart Again</button>
          </div>
        ) : (
          <div>
            <h2 className={highlightedIndex === index ? 'highlighted' : ''}>
              {index + 1}.{question.text}
            </h2>
            <ul>
              {question.options.map((option) => (
                <li
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  className={checkAns(option.text)}
                >
                  {option.text}
                </li>
              ))}
            </ul>
            <div className='button-container'>
              <button className='highlight-btn' onClick={handleHighlight}>
                Highlight
              </button>
              <button  id="new-btn" onClick={handleRemoveHighlight}>
                Remove Highlight
              </button>
            </div>
            <div id='ques'>{index + 1} of {questions.length} questions</div>
          </div>
        )}
      </div>
    </>
  ); 
};

export default QuestionBox;
