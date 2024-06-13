import React from 'react';

interface ArrowRightProps {
  onClick: () => void;
}

const ArrowRight: React.FC<ArrowRightProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="arrow-button">
      &rarr;
    </button>
  );
};

export default ArrowRight;
