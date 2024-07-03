import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './UserDashBoard.css';
import CreatedQuizCard from './CreatedQuizCard';
import CreateQuiz from './CreateQuiz';
import { getQuizzes } from "./axios";

const UserDashboard = ({ user }) => {
  const [createdQuizzes, setCreatedQuizzes] = useState([]);
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editQuiz, setEditQuiz] = useState([]);
  console.log("createdQuizzes", createdQuizzes);

  useEffect(() => {
    getQuizzes().then((json) => {
      setCreatedQuizzes(json);
      setLoading(false);
    });
  }, []);

  const editQuizHandle = async (title, questions, isOpen) => {
    if (!title) setEditQuiz([]);
    else {
      setLoading(true);
      console.dir({
        quizId: createdQuizzes[editQuiz]._id,
        uid: user.uid,
        title,
        questions,
        isOpen,
      });
      const results = await fetch('/API/quizzes/edit', {
        method: 'POST',
        body: JSON.stringify({
          quizId: createdQuizzes[editQuiz]._id,
          uid: user.uid,
          title,
          questions,
          isOpen,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const submitData = await results.json();
      console.dir(submitData);
      const temp = [...createdQuizzes];
      temp[editQuiz[0]].title = title;
      temp[editQuiz[0]].questions = questions;
      temp[editQuiz[0]].isOpen = isOpen;
      setCreatedQuizzes(temp);
      setEditQuiz([]);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (editQuiz.length)
    return (
      <CreateQuiz
        user={user}
        quizTitle={createdQuizzes[editQuiz].title}
        questions={createdQuizzes[editQuiz].questions}
        isOpen={createdQuizzes[editQuiz].isOpen}
        editQuizHandle={editQuizHandle}
      />
    );

  return (
    <div className='dash-body'>
      <div className='quizzes'>
        <div className='heading'>
          <div className='line-left' />
          <h2>Created </h2>
          <div className='line' />
        </div>
        <div className='card-holder'>
          {createdQuizzes.map((quiz) => (
            <CreatedQuizCard
              key={quiz.code}
              index={quiz.code}
              setEditQuiz={setEditQuiz}
              title={quiz.title}
              code={quiz.code}
              questionsNum={quiz.questionsNum}
              responses={quiz.responses}
              questions={quiz.questions}
              isOpen={quiz.isOpen}
              img={quiz.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

UserDashboard.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserDashboard;
