import { IconButton } from '@material-ui/core';
import { EditRounded } from '@material-ui/icons';
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './QuizCard.css';

const CreatedQuizCard = ({
  title,
  responses,
  code,
  questions,
  isOpen,
  index,
  setEditQuiz,
  img,
  questionsNum,
}) => {
  return (
    <div className='quiz-card'>
      <div style={{backgroundColor:"blue", height:"100%", backgroundImage: `url(${img})`, backgroundSize:"cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}>
      </div>
      <div>
        <h1 id='created-quiz-title'>{title}</h1>
        <p className='card-code'>Code: {code}</p>
      </div>
      <div id='horizontal-line'></div>
      <div id='row'>
        <div id='responses'>
          Responses : {responses}
        </div>
        <div id='questions'>Questions : {questionsNum}</div>
      </div>
      <div className='bottom-bar'>
        {isOpen ? <div id='open'>open</div> : <div id='closed'>closed</div>}
        <IconButton onClick={() => setEditQuiz([index])}>
          <EditRounded />
        </IconButton>
      </div>
    </div>
  );
};

CreatedQuizCard.propTypes = {
  title: PropTypes.string.isRequired,
  responses: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
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
  isOpen: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  setEditQuiz: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
  questionsNum: PropTypes.number.isRequired,
};

export default CreatedQuizCard;
