import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/flashcards')
      .then(response => setFlashcards(response.data))
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  if (flashcards.length === 0) {
    return <div className="flex items-center justify-center h-screen">Loading flashcards...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className={`flip-card w-80 h-48 relative ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
      >
        <div className="flip-card-inner w-full h-full">
          <div className="flip-card-front bg-white border-2 border-gray-400 shadow-lg hover:shadow-xl transition-all">
            <div className="text-xl font-semibold text-center px-4 flex items-center justify-center h-full">
              {flashcards[currentCardIndex].question}
            </div>
          </div>
          <div className="flip-card-back bg-gray-200 border-2 border-gray-400 shadow-lg hover:shadow-xl transition-all">
            <div className="text-xl font-semibold text-center px-4 flex items-center justify-center h-full">
              {flashcards[currentCardIndex].answer}
            </div>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handlePrev}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
