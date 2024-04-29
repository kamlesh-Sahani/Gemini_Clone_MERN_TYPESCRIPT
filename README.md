
---

# Gemini Clone

This project is a clone of Gemini using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Live Demo

You can access the live demo of this project at [Live Demo](https://your-live-demo-url.com).

## Features

- **Frontend**: React.js with Redux for state management.
- **Backend**: Node.js with Express.js for API endpoints.
- **Database**: MongoDB for data storage.
- **Authentication**: Firebase authentication.

## Environment Variables

In the frontend, the following environment variables are used:

- `VITE_API_KEY`: Google Maps API key.
- `VITE_FIREBASE_KEY`: Firebase API key.
- `VITE_FIREBASE_DOMAIN`: Firebase authentication domain.
- `VITE_FIREBASE_DATABASE`: Firebase database URL.
- `VITE_FIREBASE_PROJECT`: Firebase project ID.
- `VITE_FIREBASE_STORAGE`: Firebase storage bucket.
- `VITE_FIREBASE_MESSAGING`: Firebase messaging sender ID.
- `VITE_FIREBASE_APP_ID`: Firebase app ID.
- `VITE_DATABASE_URL`: MongoDB database connection URL.

## Backend APIs

### Result Routes

- `POST /api-v1/result/new`: Sets data.
- `GET /api-v1/result/all/:user`: Gets all data for a specific user.
- `GET /api-v1/result/:id`: Gets a single data entry by ID.

### User Routes

- `POST /api-v1/user/new`: Creates a new user.
- `POST /api-v1/user/login`: Logs in a user.
- `POST /api-v1/user/isuser`: Checks if a user exists.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/gemini-clone.git`
2. Navigate to the project directory: `cd gemini-clone`
3. Install dependencies:
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`
4. Set up environment variables:
   - Create a `.env` file in the root of the backend directory.
   - Add your environment variables to the `.env` file (refer to the provided variables above).
5. Start the backend server: `npm start` or `npm run dev` for development mode.
6. Start the frontend development server: `npm start` in the frontend directory.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
