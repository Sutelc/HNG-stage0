require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Read environment variables or set defaults
const PORT = process.env.PORT || 5000;
const EMAIL = process.env.EMAIL || 'default@example.com';
const NAME = process.env.NAME || 'John Doe';
const STACK = process.env.STACK || 'Node.js/Express';

app.get('/me', async (req, res) => {
  try {
    // Fetch random cat fact
    const response = await axios.get('https://catfact.ninja/fact', {
      timeout: 5000 // 5 seconds timeout
    });

    const catFact = response.data.fact;

    // Build response
    const payload = {
      status: 'success',
      user: {
        email: EMAIL,
        name: NAME,
        stack: STACK
      },
      timestamp: new Date().toISOString(),
      fact: catFact
    };

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(payload);

  } catch (error) {
    console.error('Cat Facts API error:', error.message);

    // Fallback response if external API fails
    const fallback = {
      status: 'success',
      user: {
        email: EMAIL,
        name: NAME,
        stack: STACK
      },
      timestamp: new Date().toISOString(),
      fact: 'Could not fetch a cat fact at the moment. 🐱'
    };

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(fallback);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
