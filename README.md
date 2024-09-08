# Gemini Clone

This project is a clone of Gemini using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Live Demo

You can access the live demo of this project at [Live Demo](https://gemini-clone-weld.vercel.app/).

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

1. Clone the repository: `https://github.com/kamlesh-Sahani/Gemini_Clone_MERN_TYPESCRIPT.git`
2. Navigate to the project directory: `cd Gemini_Clone_MERN_TYPESCRIPT`
3. Install dependencies:
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`
4. Set up environment variables:
   - Create a `.env` file in the root of the backend directory.
   - Add your environment variables to the `.env` file (refer to the provided variables above).
5. Start the backend server: `nodemon dist/app.js`  for development mode.
6. Start the frontend development server: `npm start` in the frontend directory.

![Screenshot from 2024-09-08 23-40-57](https://github.com/user-attachments/assets/e0568408-ee98-4410-918b-4d9977b932f6)
![Screenshot from 2024-09-08 23-40-43](https://github.com/user-attachments/assets/cce959d5-2295-48e9-a365-96dc1212ce94)
![Screenshot from 2024-09-08 23-40-00](https://github.com/user-attachments/assets/233c3dff-c3c5-40d2-953a-56fa9543862f)
![Screenshot from 2024-09-08 23-39-52](https://github.com/user-attachments/assets/5d8e2f6b-a45a-4d03-b3ed-14654ed79b0b)
![Screenshot from 2024-09-08 23-39-25](https://github.com/user-attachments/assets/d962bae5-1b42-4281-bf1b-253f91cb2dca)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

