## Step-By-Step process for setting up and running a zero-knowledge proof circuit using CIRCOM and snarkjs:

### First Step: Setting up the Environment and Circuit
1. **Install Node.js** (if not already installed)

2. **Initialize a Node.js project:**
   ```bash
   npm init -y
   ```

3. **Install circomlib (v2.0.5):**
   ```bash
   npm install circomlib
   ```

4. **Create a file named `circuit.circom` and add the following code:**
   ```circom
   pragma circom 2.0.0;

   include "node_modules/circomlib/circuits/pedersen.circom";

   template Hasher(){
       signal input secret;
       signal output out;

       component pedersen = Pedersen(1);
       pedersen.in[0] <== secret;
       out <== pedersen.out[0];
   }

   component main = Hasher();
   ```

5. **Compile the circuit to get the low-level representation:**
   ```bash
   circom circuit.circom --r1cs --wasm
   ```

6. **Download the ptau file for testing purposes:**
   ```bash
   wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_12.ptau
   ```

7. **Install snarkjs:**
   ```bash
   npm install snarkjs
   ```

8. **Generate the proving and verification keys:**
   ```bash
   npx snarkjs groth16 setup circuit.r1cs powersOfTau28_hez_final_12.ptau circuit_0000.zkey
   ```

### Second Step: Generating Proof
1. **Create a file named `index.js` and add the following code:**
   ```javascript
   const snarkjs = require('snarkjs')

   async function generateProof(){
       const { proof, publicSignals } = await snarkjs.groth16.fullProve(
           { secret: 12345 }, 
           "circuit_js/circuit.wasm", 
           "circuit_0000.zkey"
       );
       console.log(publicSignals);
       console.log(proof);
   }

   generateProof().then(() => {
       process.exit(0);
   });
   ```

2. **Run the proof generation script:**
   ```bash
   node index.js
   ```

3. **Export the verification key:**
   ```bash
   npx snarkjs zkey export verificationkey circuit_0000.zkey verification_key.json
   ```

### Third Step: Verifying the Proof
1. **Create a file named `verify.js` and add the following code:**
   ```javascript
   const snarkjs = require('snarkjs')
   const fs = require("fs");

   async function verify(){
       const { proof, publicSignals } = await snarkjs.groth16.fullProve(
           { secret: 12345 }, 
           "circuit_js/circuit.wasm", 
           "circuit_0000.zkey"
       );

       const vKey = JSON.parse(fs.readFileSync("verification_key.json"));
       const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);
       if (res === true) {
           console.log("Verification OK");
       } else {
           console.log("Invalid proof");
       }
   }

   verify().then(() => {
       process.exit(0);
   });
   ```

2. **Run the verification script:**
   ```bash
   node verify.js
   ```

### Summary of Commands:
```bash
npm init -y
npm install circomlib
circom circuit.circom --r1cs --wasm
wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_12.ptau
npm install snarkjs
npx snarkjs groth16 setup circuit.r1cs powersOfTau28_hez_final_12.ptau circuit_0000.zkey
node index.js
npx snarkjs zkey export verificationkey circuit_0000.zkey verification_key.json
node verify.js
```

This completes the three steps for setting up, generating proof, and verifying proof in a zero-knowledge proof system using CIRCOM and snarkjs.