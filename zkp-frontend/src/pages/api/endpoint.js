export default function handler(req, res) {
    if (req.method === 'POST') {
      const { publicInput, privateInput } = req.body;
      // Process the inputs and return a response
      res.status(200).json({ publicInput, privateInput, message: 'API call successful' });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
  