import React, { useState } from 'react';

import Headerdealer from '../component/Headerdealer';
 
const faqsData = [
  {
    question: "What types of scrap do you collect?",
    answer: "We collect a variety of scrap materials including metal, paper, plastic, and electronic waste. Please check our website for a full list of accepted materials.",
  },
  {
    question: "How does the scrap collection process work?",
    answer: "You can schedule a scrap collection through our website. Simply fill out the form with your details, and our team will contact you to arrange a pickup time.",
  },
  {
    question: "Is there a fee for scrap collection?",
    answer: "No, our scrap collection service is free of charge. We aim to promote recycling and sustainability in our community.",
  },
  {
    question: "What should I do with hazardous materials?",
    answer: "Hazardous materials such as batteries, chemicals, and certain electronics require special handling. Please contact us for guidance on how to dispose of these items safely.",
  },
  {
    question: "How can I track my scrap collection request?",
    answer: "Once you schedule a collection, you will receive a confirmation email with a tracking link. You can use this link to monitor the status of your request.",
  },
  {
    question: "Do you offer recycling services for businesses?",
    answer: "Yes, we offer tailored recycling solutions for businesses. Please contact us directly to discuss your specific needs and how we can assist you.",
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach our customer support team via the contact form on our website, or by calling our support hotline. We are here to help you with any inquiries.",
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
   <div className='container-fluid topbottom'>
      <h1>Frequently Asked Questions</h1>
      {faqsData.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
   </>
  );
};
 
export default Dealerfaq;