import React from 'react';

const AnswerCard = ({ answer }) => {
  return (
    <div>
      <h3>Bot's Answer:</h3>
      <pre>{answer}</pre>
    </div>
  );
};

export default AnswerCard;
