# QR Scanner Project

## Overview

This project is a full-stack QR code scanner and file upload system. It consists of a Node.js/Express backend API and a modern frontend (likely using Vite, Tailwind CSS, and TypeScript) for scanning QR codes, uploading files, and interacting with the backend. The project is organized into two main folders:

- `api/`: Contains the backend server and file upload logic.
- `qrscanner/`: Contains the frontend application for scanning QR codes and interacting with the backend.

---

## Features

- **QR Code Scanning**: Scan QR codes using the device camera from the frontend.
- **File Uploads**: Upload files to the backend, which are stored in the `api/uploads/` directory.
- **REST API**: Backend exposes endpoints for file management and possibly QR code data processing.
- **Modern Frontend**: Built with Vite, TypeScript, Tailwind CSS, and PostCSS for a fast and responsive UI.
- **Ngrok Support**: Easily expose your local server to the internet for testing or demos.

---

## Project Structure

```
qr_scanner-main/
│
├── ngrok.yml                # Ngrok configuration for tunneling
├── package.json             # Root package.json (may contain scripts or workspaces)
│
├── api/                     # Backend API
│   ├── package.json         # Backend dependencies
│   ├── server.js            # Express server entry point
│   └── uploads/             # Uploaded files storage
│
└── qrscanner/               # Frontend application
    ├── index.html           # Main HTML file
    ├── package.json         # Frontend dependencies
    ├── postcss.config.js    # PostCSS configuration
    ├── tailwind.config.js   # Tailwind CSS configuration
    ├── tsconfig.json        # TypeScript configuration
    ├── vite.config.js       # Vite build config
    ├── test.json            # (Purpose TBD)
    ├── did-web-deo/         # (Submodule or feature directory)
    ├── public/              # Static assets
    └── src/                 # Source code (components, logic)
```

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Backend Setup (`api/`)
1. Navigate to the backend folder:
   ```sh
   cd api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   node server.js
   ```
   The server will start (default: `http://localhost:3000`).

### Frontend Setup (`qrscanner/`)
1. Navigate to the frontend folder:
   ```sh
   cd qrscanner
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The app will be available at the URL shown in the terminal (default: `http://localhost:5173`).

### Ngrok (Optional)
To expose your local backend to the internet:
1. Install ngrok if not already installed.
2. Run:
   ```sh
   ngrok http 3000
   ```
3. Use the generated public URL for remote access.

---

## API Endpoints

The backend exposes endpoints for file uploads and possibly QR code data. Example endpoints:

- `POST /upload` — Upload a file
- `GET /files` — List uploaded files
- `GET /files/:id` — Download a specific file

Refer to `api/server.js` for the full list and details.

---

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: Vite, TypeScript, Tailwind CSS, PostCSS
- **Other**: Ngrok (for tunneling), QR code libraries (frontend)

---

## Folder Details

### `api/`
- Handles file uploads and serves files from the `uploads/` directory.
- Contains the Express server logic.

### `qrscanner/`
- Contains the frontend code for scanning QR codes and interacting with the backend.
- Uses modern frontend tooling for fast development and build times.

---

## Detailed Explanation: server.js (Backend API)

The `server.js` file in the `api/` directory is the main backend server for this project. Here’s what it does:

- **Environment Setup:** Loads environment variables (like MongoDB URI) using `dotenv`.
- **Express App:** Sets up an Express server, enables CORS for all origins (for development), and parses JSON request bodies.
- **MongoDB Connection:** Connects to MongoDB using Mongoose. If the connection string is missing, the server will not start.
- **Mongoose Schema:** Defines a schema for storing uploaded JSON data, including a timestamp.
- **File Uploads:** Uses Multer to handle file uploads, storing them temporarily in the `uploads/` directory.
- **/api/upload Endpoint:**
  - Accepts a single file upload (expects a JSON file).
  - Reads and parses the uploaded file.
  - Saves its contents to MongoDB.
  - Verifies the data using a verification utility from the frontend’s build output.
  - Deletes the uploaded file after processing.
  - Responds with a message, the saved data, and the verification status.
- **Error Handling:** Returns a 500 error with details if any error occurs during upload, parsing, saving, or verification.
- **Server Startup:** Listens on the specified port and logs a message when running.

---

## Note on `uploadjsonpage`

There is currently no frontend file or component named `uploadjsonpage` in this project. If you add or specify such a page/component for uploading JSON files, you can document its functionality and usage here.

---

## Note on `uploadjson` File

There is currently no file named `uploadjson` in this project. If you add or specify such a file or component (for example, a frontend page or backend handler for uploading JSON files), you can document its functionalities and data flow here. Typically, an `uploadjson` file would:

- Provide a user interface or API endpoint for uploading JSON files.
- Handle file selection and validation (frontend) or file parsing and storage (backend).
- Interact with the backend API to send the file for processing.
- Display upload status, errors, or results to the user.
- Manage the data flow from user input, through upload, to backend storage and response.

If you create this file/component, update this section with its specific details and workflow.

---

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a Pull Request

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For questions or support, please open an issue or contact the maintainer.
