import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { logout } from './Auth/authService'; // Import the logout function
import './index.css';

function UserPage() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/flashcards')
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

  const handleLogout = () => {
    logout(); // Call the logout function from authservice
    window.location.href = '/'; // Redirect to the login page
  };

  if (flashcards.length === 0) {
    return <div className="flex items-center justify-center h-screen text-red-400">Loading flashcards...</div>;
  }

  return (
    <div className="bg-black text-white flex flex-col items-center justify-center h-screen p-4">
      <header className="absolute top-0 left-0 w-full bg-red-700 p-4 flex justify-between items-center">
        <h1 className="text-center text-white text-2xl font-bold w-full">Welcome to the Flashcard App</h1>
        <button
          className="text-white text-md underline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
      
      <div
        className={`flip-card w-96 h-64 mt-6 relative ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
      >
        <div className="flip-card-inner w-full h-full">
          <div className="flip-card-front bg-gray-800 border-2 border-red-600 shadow-lg hover:shadow-xl transition-all">
            <div className="text-xl font-semibold text-center px-4 flex items-center justify-center h-full">
              {flashcards[currentCardIndex].question}
            </div>
          </div>
          <div className="flip-card-back bg-gray-900 border-2 border-red-600 shadow-lg hover:shadow-xl transition-all">
            <div className="text-xl font-semibold text-center px-4 flex items-center justify-center h-full">
              {flashcards[currentCardIndex].answer}
            </div>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 mt-4">
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center space-x-2"
          onClick={handlePrev}
        >
          <span>←</span>
          <span>Previous</span>
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center space-x-2"
          onClick={handleNext}
        >
          <span>Next</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

export default UserPage;
