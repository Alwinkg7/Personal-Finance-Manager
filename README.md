# Personal Finance Manager

## Description
Personal Finance Manager is a web application designed to help users manage their finances effectively. It allows users to track their income and expenses, set budgets, participate in savings challenges, and receive personalized financial advice.

## Features
- Track income and expenses
- Set and manage budgets
- Participate in savings challenges
- Receive personalized financial advice
- Visualize spending and earnings with charts

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js and npm installed on your machine. You can download them from [Node.js official website](https://nodejs.org/).
- MongoDB installed and running. You can download it from [MongoDB official website](https://www.mongodb.com/).

## Installation
To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Alwinkg7/Personal-Finance-Manager.git
   cd Personal-Finance-Manager
   ```

2. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   ```

3. Install dependencies for the backend:
   ```bash
   cd ../backend
   npm install
   ```

## Configuration
1. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

## Running the Application
1. Start the frontend and backend servers:
   ```bash
   # In one terminal, start the frontend server
   cd frontend
   npm start

   # In another terminal, start the backend server
   cd backend
   npm start
   ```
   Install all dependencies shown in the package.json package-lock.json
   use "npm install" for the installation

3. Open your web browser and navigate to `http://localhost:3000`.

## Usage
1. Register a new account or log in with your existing credentials.
2. Start managing your finances by adding transactions, setting budgets, and participating in savings challenges.

## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
If you have any questions or suggestions, feel free to contact me at [your-email@example.com].
