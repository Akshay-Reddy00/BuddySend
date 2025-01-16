### Buddy Send
- Peer to peer money transfers.
- Users can transfer money for the registered users of the application.

## TechStack
- React
- Express
- MongoDb
- TailwindCss
- Typescript

## Folder Structure

```
├── /be              # Backend folder
│   ├── src          # Source code for APIs
│   ├── .env.example # Use variables listed here.
│   ├── .env         # Create this file and add the variables here.
│   ├── package.json # Backend dependencies and scripts
├── /fe              # Frontend folder
│   ├── public       # Icons for application
│   ├── src          # Source code for React application
│   ├── package.json # Frontend dependencies and scripts
├── README.md        # Project documentation
```

## Setup Instructions

### Backend Setup
- `cd be`
- `npm install` to install all the dependencies.
- Follow `.env.example` to create your own `.env` at the root level of `/be`
- `npm run dev` to start the backend server.
- Backend server runs on `https://localhost:3000`

### Frontend Setup
- Navigate to `cd fe`
- `npm install` to install all the dependencies.
- `npm run dev` to start the frontend server.
- Frontend server runs on `https://localhost:5173` (Displayed on the terminal. If the port is busy check for the new port number).


### Note
- Open a terminal for `/be` and run `npm run dev`
- Open another terminal for `/fe` and `run npm run dev`