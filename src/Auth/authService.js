import { auth } from '../firebase'; // Adjust import path as needed
import { signOut } from 'firebase/auth';

export const logout = async () => {
  try {
    await signOut(auth);
    console.log('Logged out successfully');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
