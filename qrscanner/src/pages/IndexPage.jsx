import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function IndexPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Scan to Upload JSON</h1>
            <div className="p-4 bg-white rounded-lg shadow-lg">
                <QRCodeCanvas value={window.location.origin + "/upload"} size={200} className="rounded-lg" />
            </div>
        </div>
    );
}