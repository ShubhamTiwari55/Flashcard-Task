# Flashcard Learning Tool

This is a simple Flashcard Learning Tool built with React for the frontend and Node.js (Expressjs) with MySQL for the backend. It allows users to flip through flashcards, and admins to manage the flashcards (add, edit, delete) along with signup and login.

## Features

- **User Functionality:**
  - View and flip flashcards with questions and answers.
  - Navigate through flashcards using "Next" and "Previous" buttons.
  - Login and sign up functionality with email/password and Google authentication.

- **Admin Functionality:**
  - Add new flashcards.
  - Edit existing flashcards.
  - Delete flashcards.
  - Admin dashboard protected by authentication.

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** Firebase Authentication (with email/password and Google sign-in)
- **Deployment:** 
  - Frontend: Vercel
  - Backend: AWS EC2 Instance (or locally if needed)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MySQL
- Firebase account for authentication setup

### Cloning the Repository

```bash
git clone https://github.com/your-username/flashcard-tool.git
cd flashcard-tool
