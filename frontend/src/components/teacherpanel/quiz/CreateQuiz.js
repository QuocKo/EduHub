import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CreateQuiz.css';
import AddQuestionModal from './AddQuestionModal';
import QuestionsTable from './QuestionsTable';
import { Switch } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = ({
  user,
  quizTitle,
  questions,
  isOpen,
  editQuizHandle,
}) => {
  const [questionArray, setQuestionArray] = useState([]);
  const [title, setTitle] = useState('');
  const [access, setAccesss] = useState(true);
  const navigate = useNavigate();

  const addQuestionHandle = (title, optionType, options) => {
    const arr = [...questionArray];
    arr.push({ title, optionType, options });
    setQuestionArray(arr);
  };

  useEffect(() => {
    if (quizTitle) {
      setTitle(quizTitle);
      setQuestionArray(questions);
      setAccesss(isOpen);
    }
  }, [quizTitle, questions, isOpen]);

  const createQuiz = async () => {
    if (!(title.length || questionArray.length)) {
      alert('Please add title and questions.');
      return;
    } else if (!title.length) {
      alert('Please add Quiz title.');
      return;
    } else if (!questionArray.length) {
      alert('Please add any questions.');
      return;
    }
    console.log('Quiz Creation Starts...');
    try {
      const result = await fetch('https://65e01e12d3db23f762484bb2.mockapi.io/quiz', {
        method: 'POST',
        body: JSON.stringify({
          title,
          code: questionArray.length,
          responses: 0,
          questionsNum: questionArray.length,
          questions: questionArray,
          isOpen: true,
          img: "https://as2.ftcdn.net/v2/jpg/01/68/01/87/1000_F_168018748_qmW17F6anXnw8ah9odplfSBQfXXyD9cu.jpg",
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("questionArray", questionArray);
      console.log('Quiz posted ! ');
      const body = await result.json();
      navigate('/teacher/quiz/view');
      console.log('Quiz Code : ', body.quizId);
    } catch (e) {
      console.log('Quiz creation error : ', e);
    }
  };

  return (
    <div id='main-body'>
      <div id='create-quiz-body'>
        <div className='quiz-header'>
          <input
            type='text'
            className='input-text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id='quiz-title'
            placeholder='Untitled Quiz'
            autoFocus
            autoComplete='off'
          />
        </div>
        <div className='controls'>
          <AddQuestionModal addQuestionHandle={addQuestionHandle} />
          <div className='switch'>
            <Switch
              checked={access}
              onChange={(e) => setAccesss(e.target.checked)}
              color='secondary'
              name='access'
            />
            <h4>{access ? 'Public' : 'Private'}</h4>
          </div>
        </div>
      </div>
      <div className='questionTable'>
        <QuestionsTable
          questionArray={questionArray}
          setQuestionArray={setQuestionArray}
        />
      </div>
      <div style={{ margin: ' 0 auto' }}>
        {quizTitle && (
          <button className='add-btn' onClick={() => editQuizHandle()}>
            Close
          </button>
        )}
        <button
          className='button wd-200'
          onClick={() => {
            createQuiz();
          }}
        >
          {quizTitle ? 'Save ' : 'Create '}
          Quiz
        </button>
      </div>
    </div>
  );
};

CreateQuiz.propTypes = {
  user: PropTypes.object.isRequired,
  quizTitle: PropTypes.string,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      optionType: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          isCorrect: PropTypes.bool.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  isOpen: PropTypes.bool,
  editQuizHandle: PropTypes.func.isRequired,
};

export default CreateQuiz;
