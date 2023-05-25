// const express = require('express');
// const axios = require('axios');
// const rateLimit = require('express-rate-limit');
// const dotenv = require('dotenv');

// const router = express.Router();

// dotenv.config();

// // Apply rate limiting middleware
// const limiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 10, // Allow 10 requests per minute
// });

// router.post('/generate-response', limiter, async (req, res) => {
//   const { userInput } = req.body;

//   // setup openAI API request
//   const prompt = `User: ${userInput}\nAI:`;
//   const maxTokens = 250;
//   const apiKey = process.env.OPENAI_API_KEY;

//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/engines/davinci/completions',
//       {
//         prompt,
//         max_tokens: maxTokens,
//         temperature: 0.9,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${apiKey}`,
//         },
//       }
//     );

//     const generatedText = response.data.choices[0].text.trim();
//     res.json({ generatedText });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Something went wrong, please be patient' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();

// Define the pre-defined responses for each feeling
const responses = {
  Happy: "That's great! Keep spreading the positivity!",
  Sad: "I'm sorry to hear that. Remember, tomorrow is a new day.",
  Tired: "It sounds like you need some rest. Take a break and recharge.",
  Stressed: "Take a deep breath. You can handle whatever comes your way.",
  Anxious: "I understand that anxiety can be tough. Remember to take things one step at a time.",
  Angry: "It's okay to feel angry sometimes. Find a healthy outlet for your emotions.",
  Excited: "That's wonderful! Embrace the excitement and make the most of it.",
  Bored: "Feeling bored? Try exploring new hobbies or activities to spice things up."
};

router.post('/generate-response', (req, res) => {
  const { userInput } = req.body;

  // Check if the selected feeling has a pre-defined response
  if (responses.hasOwnProperty(userInput)) {
    const response = responses[userInput];
    res.json({ response });
  } else {
    res.status(400).json({ error: 'Invalid feeling selection' });
  }
});

module.exports = router;
