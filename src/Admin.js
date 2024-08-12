import React, { useState, useEffect } from 'react';
import { getFlashcards, addFlashcard, updateFlashcard, deleteFlashcard } from './flashcardService'; // Import CRUD operations
import { useNavigate } from 'react-router-dom';
import { logout } from './Auth/authService'; // Import logout function from authService

function Admin() {
  const [flashcards, setFlashcards] = useState([]);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
  const [editFlashcard, setEditFlashcard] = useState({ id: '', question: '', answer: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch flashcards when the component mounts
    async function fetchFlashcards() {
      try {
        const cards = await getFlashcards();
        setFlashcards(cards);
      } catch (err) {
        setError('Failed to load flashcards.');
        console.error(err);
      }
    }

    fetchFlashcards();
  }, []);

  const handleAddFlashcard = async (e) => {
    e.preventDefault();
    try {
      await addFlashcard(newFlashcard);
      setNewFlashcard({ question: '', answer: '' });
      // Refresh the list of flashcards
      const cards = await getFlashcards();
      setFlashcards(cards);
    } catch (err) {
      setError('Failed to add flashcard.');
      console.error(err);
    }
  };

  const handleEditFlashcard = async (e) => {
    e.preventDefault();
    try {
      await updateFlashcard(editFlashcard);
      setEditingId(null);
      setEditFlashcard({ id: '', question: '', answer: '' });
      // Refresh the list of flashcards
      const cards = await getFlashcards();
      setFlashcards(cards);
    } catch (err) {
      setError('Failed to update flashcard.');
      console.error(err);
    }
  };

  const handleDeleteFlashcard = async (id) => {
    try {
      await deleteFlashcard(id);
      // Refresh the list of flashcards
      const cards = await getFlashcards();
      setFlashcards(cards);
    } catch (err) {
      setError('Failed to delete flashcard.');
      console.error(err);
    }
  };

  const handleStartEditing = (flashcard) => {
    setEditingId(flashcard.id);
    setEditFlashcard(flashcard);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redirect to login page after logout
    } catch (err) {
      setError('Logout failed. Please try again.');
    }
  };

  return (
    <div className="bg-black text-red-400 min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
      {error && <p className="text-red-300">{error}</p>}

      <button
        onClick={handleLogout}
        className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Add Flashcard</h2>
        <form onSubmit={handleAddFlashcard} className="space-y-4">
          <input
            type="text"
            value={newFlashcard.question}
            onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
            placeholder="Question"
            className="px-4 py-2 border border-red-600 bg-gray-800 text-red-400 rounded"
            required
          />
          <input
            type="text"
            value={newFlashcard.answer}
            onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
            placeholder="Answer"
            className="px-4 py-2 border border-red-600 bg-gray-800 text-red-400 rounded"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Add Flashcard
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Manage Flashcards</h2>
        {flashcards.length === 0 ? (
          <p>No flashcards available.</p>
        ) : (
          <ul className="space-y-4">
            {flashcards.map((flashcard) => (
              <li key={flashcard.id} className="border border-red-600 bg-gray-800 p-4 rounded">
                <p className="font-bold">Question:</p>
                <p>{flashcard.question}</p>
                <p className="font-bold">Answer:</p>
                <p>{flashcard.answer}</p>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleStartEditing(flashcard)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteFlashcard(flashcard.id)}
                    className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {editingId && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Edit Flashcard</h2>
          <form onSubmit={handleEditFlashcard} className="space-y-4">
            <input
              type="text"
              value={editFlashcard.question}
              onChange={(e) => setEditFlashcard({ ...editFlashcard, question: e.target.value })}
              placeholder="Question"
              className="px-4 py-2 border border-red-600 bg-gray-800 text-red-400 rounded"
              required
            />
            <input
              type="text"
              value={editFlashcard.answer}
              onChange={(e) => setEditFlashcard({ ...editFlashcard, answer: e.target.value })}
              placeholder="Answer"
              className="px-4 py-2 border border-red-600 bg-gray-800 text-red-400 rounded"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setEditFlashcard({ id: '', question: '', answer: '' });
              }}
              className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Admin;
