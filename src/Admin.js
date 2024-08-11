import React, { useState, useEffect } from 'react';
import { getFlashcards, addFlashcard, updateFlashcard, deleteFlashcard } from './flashcardService'; // Import CRUD operations
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Flashcard</h2>
        <form onSubmit={handleAddFlashcard} className="space-y-4">
          <input
            type="text"
            value={newFlashcard.question}
            onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
            placeholder="Question"
            className="px-4 py-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            value={newFlashcard.answer}
            onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
            placeholder="Answer"
            className="px-4 py-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Flashcard
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Manage Flashcards</h2>
        {flashcards.length === 0 ? (
          <p>No flashcards available.</p>
        ) : (
          <ul className="space-y-4">
            {flashcards.map((flashcard) => (
              <li key={flashcard.id} className="border border-gray-300 p-4 rounded">
                <p className="font-bold">Question:</p>
                <p>{flashcard.question}</p>
                <p className="font-bold">Answer:</p>
                <p>{flashcard.answer}</p>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleStartEditing(flashcard)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteFlashcard(flashcard.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
          <h2 className="text-xl font-semibold mb-2">Edit Flashcard</h2>
          <form onSubmit={handleEditFlashcard} className="space-y-4">
            <input
              type="text"
              value={editFlashcard.question}
              onChange={(e) => setEditFlashcard({ ...editFlashcard, question: e.target.value })}
              placeholder="Question"
              className="px-4 py-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              value={editFlashcard.answer}
              onChange={(e) => setEditFlashcard({ ...editFlashcard, answer: e.target.value })}
              placeholder="Answer"
              className="px-4 py-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setEditFlashcard({ id: '', question: '', answer: '' });
              }}
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
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
