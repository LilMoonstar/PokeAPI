import React from 'react';

interface ArrowLeftProps {
  onClick: () => void;
}

const ArrowLeft: React.FC<ArrowLeftProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="arrow-button">
      &larr;
    </button>
  );
};

export default ArrowLeft;
