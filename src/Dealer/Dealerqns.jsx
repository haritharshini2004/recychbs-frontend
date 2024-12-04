import React, { useState } from 'react';
import Header from '../component/Header';
import Headerdealer from '../component/Headerdealer';
 
const Dealerqns = () => {
 
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [replies, setReplies] = useState({});
 
  const handleQuestionChange = (event) => {
    setCurrentQuestion(event.target.value);
  };
 
 
  const handleQuestionSubmit = (event) => {
    event.preventDefault();
    if (currentQuestion.trim()) {
      setQuestions([...questions, currentQuestion]);
      setReplies({ ...replies, [currentQuestion]: [] }); 
      setCurrentQuestion('');
    }
  };
 
 
  const handleReplyClick = (question) => {
   
    const newReplies = [
      'Reply 1: This is a pre-defined reply.',
      'Reply 2: Another pre-defined response.',
      'Reply 3: Yet another reply.'
    ];
    setReplies({
      ...replies,
      [question]: newReplies
    });
  };
 
 
  const handleDeleteQuestion = (question) => {
    setQuestions(questions.filter(q => q !== question));
    const updatedReplies = { ...replies };
    delete updatedReplies[question];
    setReplies(updatedReplies);
  };
 
  return (
  <>
  <Headerdealer/>
    <div className='container-fluid topbottom-user'>
      
     
      <div style={{ marginBottom: '20px' }}>
        <h2>Post a Question</h2>
        <form onSubmit={handleQuestionSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="question">Your Question:</label>
            <textarea
              id="question"
              value={currentQuestion}
              onChange={handleQuestionChange}
              rows="4"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>
            Post Question
          </button>
        </form>
      </div>
 
   
      <div>
        <h2>Questions</h2>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {questions.map((question, index) => (
            <li key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <div>
                <strong>Q:</strong> {question}
              </div>
              <button
                onClick={() => handleReplyClick(question)}
                style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', marginTop: '10px' }}
              >
                Show Replies
              </button>
              <button
                onClick={() => handleDeleteQuestion(question)}
                style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', marginLeft: '10px', marginTop: '10px' }}
              >
                Delete
              </button>
              {replies[question] && (
                <ul style={{ listStyleType: 'none', padding: '0', marginTop: '10px' }}>
                  {replies[question].map((reply, idx) => (
                    <li key={idx} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                      {reply}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </>
  );
};
 
export default Dealerqns;