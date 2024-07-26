"use client";

import { useState } from "react";
import "../app/globals.css";
import Navbar from "../app/components/Navbar";

export default function ZkSnark() {
  const [privateInput1, setPrivateInput1] = useState("");
  const [response1, setResponse1] = useState(null);

  const [proof1, setProof1] = useState("");
  const [publicSignals, setPublicSignals] = useState("");
  const [verifyResponse1, setVerifyResponse1] = useState(null);

  const apiUrl = "http://localhost:3000"; // Adjust if your backend URL is different

  const handleSubmit1 = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/generateProof`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secret: privateInput1 }),
      });
      const data = await res.json();
      setResponse1(data);
      setProof1(JSON.stringify(data.proof)); // Assuming `proof` is a JSON object or string
      setPublicSignals(JSON.stringify(data.publicSignals)); // Assuming `publicSignals` is a JSON object or string
    } catch (error) {
      console.error("Error:", error);
      setResponse1({ error: "An error occurred" });
    }
  };

  const handleVerify1 = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/verifyProof`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proof: JSON.parse(proof1), // Parse proof if it's a JSON string
          publicSignals: JSON.parse(publicSignals), // Parse publicSignals if it's a JSON string
        }),
      });
      const data = await res.json();
      setVerifyResponse1(data);
    } catch (error) {
      console.error("Error:", error);
      setVerifyResponse1({ error: "An error occurred" });
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-12">
          Generate and Check ZK-SNARK Proofs Here
        </h1>
        <div className="flex w-full max-w-7xl space-x-8">
          {/* ZK-SNARK Form */}
          <div className="w-full space-y-8">
            <div className="p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold text-white">Generate Proof</h1>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="Secret"
                  value={privateInput1}
                  onChange={(e) => setPrivateInput1(e.target.value)}
                  className="p-3 border border-gray-700 rounded bg-gray-700 text-white"
                />
                <button
                  onClick={handleSubmit1}
                  className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Generate Proof
                </button>
                {response1 && (
                  <div className="mt-4 p-3 bg-gray-700 rounded">
                    <pre className="text-sm text-white">
                      {JSON.stringify(response1, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold text-white">Verify Proof</h1>
              <div className="flex flex-col space-y-4">
                <textarea
                  placeholder="Proof (JSON format)"
                  value={proof1}
                  onChange={(e) => setProof1(e.target.value)}
                  className="p-3 border border-gray-700 rounded bg-gray-700 text-white"
                  rows="4"
                />
                <textarea
                  placeholder="Public Signals (JSON format)"
                  value={publicSignals}
                  onChange={(e) => setPublicSignals(e.target.value)}
                  className="p-3 border border-gray-700 rounded bg-gray-700 text-white"
                  rows="4"
                />
                <button
                  onClick={handleVerify1}
                  className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Verify
                </button>
                {verifyResponse1 && (
                  <div className="mt-4 p-3 bg-gray-700 rounded">
                    <pre className="text-sm text-white">
                      {JSON.stringify(verifyResponse1, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
