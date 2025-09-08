// gemini-2.5-pro-preview-03-25 5RPM 25req/day
// gemini-2.5-pro-exp-03-25
// 'gemini-2.5-flash-preview-04-17' 10RPM 500req/day
// 'gemini-2.0-flash' 15RPM 1500req/day
// 'gemini-2.0-flash-lite' 30RPM 1500req/day
// 'gemini-1.5-pro'2RPM 50req/day
// 'gemini-1.5-flash'15RPM 1500 req/day
// 'gemini-1.5-flash-8b'15RPM 155rwq/day
// 'gemma-3-1b-it' model used to generate response

// To run this code you need to install the following dependencies:
// npm install @google/genai mime

import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

async function main(prompt) {
  const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  });

  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    responseMimeType: "text/plain",
  };

  const model = "gemini-2.0-flash-lite";

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  let fullResponse = "";

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  for await (const chunk of response) {
    fullResponse += chunk.text;
  }
  // console.log('full Response : ',fullResponse)

  return fullResponse;
}

export default main;
