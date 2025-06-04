import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const UploadJsonPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [jsonData, setJsonData] = useState(null); // Store previewed JSON data

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type === "application/json") {
      setFile(selectedFile);
      setMessage("");

      // Read and parse JSON file for display
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsedData = JSON.parse(e.target.result);
          setJsonData(parsedData);
        } catch (error) {
          setMessage("Invalid JSON format.");
          setJsonData(null);
        }
      };
      reader.readAsText(selectedFile);
    } else {
      setMessage("Please select a valid JSON file.");
      setFile(null);
      setJsonData(null);
    }
  };

  // Upload file to server
  const handleUpload = async () => {
    if (!file) {
      setMessage("No file selected!");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("https://5f9a-103-156-19-229.ngrok-free.app/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);
      // fetchStoredJson();
    } catch (error) {
      setMessage("Upload failed: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Upload JSON File</h2>

        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
        />

        <button
          onClick={handleUpload}
          className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
        >
          Upload
        </button>

        {message && <p className="mt-4 text-center font-semibold text-red-500">{message}</p>}

        {/* Display uploaded JSON content */}
        {jsonData && (
          <div className="mt-6 p-4 bg-gray-200 rounded-lg w-full max-h-80 overflow-auto">
            <h3 className="text-lg font-semibold mb-2 text-center">JSON Preview:</h3>
            <pre className="text-xs text-gray-700 break-words whitespace-pre-wrap">
              {JSON.stringify(jsonData, null, 2)}
            </pre>
          </div>
        )}
      </div>

    </div>
  );
};

export default UploadJsonPage;
