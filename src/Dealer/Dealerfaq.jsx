import React, { useState } from 'react';

import Headerdealer from '../component/Headerdealer';
 
const faqsData = [
  {
    question: "What is React?",
    answer: "React is a JavaScript library for building user interfaces. It allows developers to build single-page applications with a component-based architecture.",
  },
  {
    question: "How do I create a new React app?",
    answer: "You can create a new React app using Create React App by running 'npx create-react-app my-app' in your terminal.",
  },
  {
    question: "What is a component in React?",
    answer: "A component in React is a reusable piece of UI that can be used to build your application. Components can be either class-based or functional.",
  },
 
];
 
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
 
 
  const faqItemStyle = {
    borderBottom: '1px solid #ddd',
    padding: '10px 0',
  };
 
  const faqQuestionStyle = {
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
 
  const faqAnswerStyle = {
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  };
 
  const faqToggleStyle = {
    fontSize: '1.2em',
    fontWeight: 'bold',
  };
 
  return (
    <div style={faqItemStyle}>
      <div style={faqQuestionStyle} onClick={() => setIsOpen(!isOpen)}>
        {question}
        <span style={faqToggleStyle}>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <div style={faqAnswerStyle}>{answer}</div>}
    </div>
  );
};
 
const Dealerfaq = () => {
 
  return (
   <>
   <Headerdealer/>
   <div className='topbottom-user'>
      <h1>Frequently Asked Questions</h1>
      {faqsData.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
   </>
  );
};
 
export default Dealerfaq;