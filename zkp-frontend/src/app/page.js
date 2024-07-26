"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";

export default function Home() {
  const [publicInput1, setPublicInput1] = useState("");
  const [privateInput1, setPrivateInput1] = useState("");
  const [response1, setResponse1] = useState(null);

  const [publicInput2, setPublicInput2] = useState("");
  const [privateInput2, setPrivateInput2] = useState("");
  const [response2, setResponse2] = useState(null);

  const [verifyPublicInput1, setVerifyPublicInput1] = useState("");
  const [proof1, setProof1] = useState("");
  const [verifyResponse1, setVerifyResponse1] = useState(null);

  const [verifyPublicInput2, setVerifyPublicInput2] = useState("");
  const [proof2, setProof2] = useState("");
  const [verifyResponse2, setVerifyResponse2] = useState(null);

  const apiUrl = "https://example:1232";

  const handleSubmit1 = async () => {
    try {
      const res = await fetch(`${apiUrl}/your-endpoint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicInput: publicInput1,
          privateInput: privateInput1,
        }),
      });
      const data = await res.json();
      setResponse1(data);
    } catch (error) {
      console.error("Error:", error);
      setResponse1({ error: "An error occurred" });
    }
  };

  const handleSubmit2 = async () => {
    try {
      const res = await fetch(`${apiUrl}/your-endpoint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicInput: publicInput2,
          privateInput: privateInput2,
        }),
      });
      const data = await res.json();
      setResponse2(data);
    } catch (error) {
      console.error("Error:", error);
      setResponse2({ error: "An error occurred" });
    }
  };

  const handleVerify1 = async () => {
    try {
      const res = await fetch(`${apiUrl}/verify-endpoint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicInput: verifyPublicInput1,
          proof: proof1,
        }),
      });
      const data = await res.json();
      setVerifyResponse1(data);
    } catch (error) {
      console.error("Error:", error);
      setVerifyResponse1({ error: "An error occurred" });
    }
  };

  const handleVerify2 = async () => {
    try {
      const res = await fetch(`${apiUrl}/verify-endpoint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicInput: verifyPublicInput2,
          proof: proof2,
        }),
      });
      const data = await res.json();
      setVerifyResponse2(data);
    } catch (error) {
      console.error("Error:", error);
      setVerifyResponse2({ error: "An error occurred" });
    }
  };

  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-12">
          Generate and Check ZK Proofs Here
        </h1>
        <div className="flex w-full max-w-7xl space-x-8">
          {/* ZK-SNARK Form */}
          <div className="w-1/2 space-y-8">
            <div className="p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold text-white">ZK-SNARK</h1>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="Public Input"
                  value={publicInput1}
                  onChange={(e) => setPublicInput1(e.target.value)}
                  className="p-3 border border-gray-700 rounded bg-gray-700 text-white"
                />
                <input
                  type="password"
                  placeholder="Private Input"
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
                <input
                  type="text"
                  placeholder="Public Input"
                  value={verifyPublicInput1}
                  onChange={(e) => setVerifyPublicInput1(e.target.value)}
                  className="p-3 border border-gray-700 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  placeholder="Proof"
                  value={proof1}
                  onChange={(e) => setProof1(e.target.value)}
                  className="p-3 border border-gray-700 rounded bg-gray-700 text-white"
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

          {/* Vertical Line */}
          <div className="h-auto border-l border-gray-500"></div>

          {/* ZK-STARK Form */}
          <div className="w-1/2 space-y-8">
            <div className="p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold text-white">ZK-STARK</h1>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="Public Input"
                  value={publicInput2}
                  onChange={(e) => setPublicInput2(e.target.value)}
                  className="p-3 border border-gray-700 rounded bg-gray-700 text-white"
                />
                <input
                  type="password"
                  placeholder="Private Input"
                  value={privateInput2}
                  onChange={(e) => setPrivateInput2(e.target.value)}
                  className="p-3 border border-gray-700 rounded bg-gray-700 text-white"
                />
                <button
                  onClick={handleSubmit2}
                  className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Generate Proof
                </button>
                {response2 && (
                  <div className="mt-4 p-3 bg-gray-700 rounded">
                    <pre className="text-sm text-white">
                      {JSON.stringify(response2, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold text-white">Verify Proof</h1>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="Public Input"
                  value={verifyPublicInput2}
                  onChange={(e) => setVerifyPublicInput2(e.target.value)}
                  className="p-3 border border-gray-700 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  placeholder="Proof"
                  value={proof2}
                  onChange={(e) => setProof2(e.target.value)}
                  className="p-3 border border-gray-700 rounded bg-gray-700 text-white"
                />
                <button
                  onClick={handleVerify2}
                  className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Verify
                </button>
                {verifyResponse2 && (
                  <div className="mt-4 p-3 bg-gray-700 rounded">
                    <pre className="text-sm text-white">
                      {JSON.stringify(verifyResponse2, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
