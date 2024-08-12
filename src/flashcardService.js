import axios from 'axios';

// Base URL of your backend API
const API_URL = 'http://3.110.175.178:5000/api/flashcards';

export const getFlashcards = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addFlashcard = async (flashcard) => {
  const response = await axios.post(API_URL, flashcard);
  return response.data;
};

export const updateFlashcard = async (flashcard) => {
  const response = await axios.put(`${API_URL}/${flashcard.id}`, flashcard);
  return response.data;
};

export const deleteFlashcard = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
