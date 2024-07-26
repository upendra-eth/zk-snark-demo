const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const snarkjs = require('snarkjs');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory storage for demonstration purposes
let dataStore = {};
let status = 'No data received';

app.get('/', (req, res) => {
  res.send('hey');
});

// POST API to receive data
app.post('/api/data', (req, res) => {
  const { data } = req.body;
  if (data) {
    dataStore = data;
    status = 'Data received successfully';
    res.status(200).json({ message: 'Data received successfully' });
  } else {
    res.status(400).json({ message: 'No data provided' });
  }
});

// GET API to get the status
app.get('/api/status', (req, res) => {
  res.status(200).json({ status });
});

// Function to generate proof
async function generateProof(secret) {
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    { secret }, 
    "jkp/circuit_js/circuit.wasm", 
    "jkp/circuit_0000.zkey"
  );
  return { proof, publicSignals };
}

// Function to verify proof
// async function verifyProof() {
//   const data = fs.readFileSync('proof.json', 'utf8'); // Read the result from the file
//   const { proof, publicSignals } = JSON.parse(data);
//   const vKey = JSON.parse(fs.readFileSync("jkp/verification_key.json"));
//   const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);
//   return res;
// }

// Function to verify proof
async function verifyProof(proof, publicSignals) {
    const vKey = JSON.parse(fs.readFileSync("jkp/verification_key.json"));
    const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);
    return res;
  }

// POST API to generate proof
app.post('/api/generateProof', async (req, res) => {
  const { secret } = req.body; // Get the secret from the request body
  if (!secret) {
    return res.status(400).json({ message: 'Secret not provided' });
  }

  try {
    const result = await generateProof(secret);
    fs.writeFileSync('proof.json', JSON.stringify(result, null, 2)); // Save the result to a file
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error generating proof', error: error.message });
  }
});

// // POST API to verify proof
// app.post('/api/verifyProof', async (req, res) => {
//   try {
//     const result = await verifyProof();
//     if (result) {
//       res.status(200).json({ message: 'Verification OK' });
//     } else {
//       res.status(400).json({ message: 'Invalid proof' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error verifying proof', error: error.message });
//   }
// });

// POST API to verify proof
app.post('/api/verifyProof', async (req, res) => {
    const { proof, publicSignals } = req.body; // Get proof and publicSignals from the request body
    if (!proof || !publicSignals) {
      return res.status(400).json({ message: 'Proof or publicSignals not provided' });
    }
  
    try {
      const result = await verifyProof(proof, publicSignals);
      if (result) {
        res.status(200).json({ message: 'Verification OK' });
      } else {
        res.status(400).json({ message: 'Invalid proof' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error verifying proof', error: error.message });
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
