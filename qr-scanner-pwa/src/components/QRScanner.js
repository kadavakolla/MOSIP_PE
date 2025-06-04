import { useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner() {
  const [qrResult, setQrResult] = useState(null);
  const scannerRef = useRef(null);

  const startScan = () => {
    if (scannerRef.current) return;
    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scannerRef.current.render(
      (decodedText) => {
        setQrResult(decodedText);
        window.location.href = decodedText; // Redirect to scanned URL
      },
      (error) => {
        console.log("Scan Error:", error);
      }
    );
  };

  return (
    <div 
      style={{ 
        backgroundColor: "#009578", 
        height: "100vh", 
        color: "white", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center" 
      }}
    >
      <h1>QR Code Scanner</h1>
      <button onClick={startScan} style={{ margin: "10px", padding: "10px 20px" }}>
        Scan QR Code
      </button>
      <div id="reader" style={{ width: "250px", height: "250px", border: "" }}></div>
      {qrResult && <p>Scanned: {qrResult}</p>}
    </div>
  );
  
  

  // return (
  //   <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center">
  //     <h1 className="text-2xl mb-4">QR Code Scanner</h1>
  //     <div className="flex flex-col items-center">
  //       <button 
  //         onClick={startScan} 
  //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
  //       >
  //         Scan QR Code
  //       </button>
  //       <div id="reader" className="w-64 h-64 border-2 border-gray-500 flex items-center justify-center"></div>
  //       {qrResult && (
  //         <p className="mt-4 text-green-400">Scanned: {qrResult}</p>
  //       )}
  //     </div>
  //   </div>
  // );
  
}