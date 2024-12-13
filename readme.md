# Multi LLM TS Package

## Overview

This package provides interfaces and implementations to interact with Large Language Models (LLMs) such as OpenAI, Claude, and Gemini. It includes tools for generating and streaming text from LLM providers.

### Features:
- **Easy integration with OpenAI, Claude, and Gemini providers.**
- **Text generation and streaming support.**
- **Environment variable management for API keys and configuration.**

---

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-repo/llm-package.git
    cd llm-package
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Install dotenv for environment variables**:

    ```bash
    npm install dotenv
    ```

---

## Usage

1. **Set up environment variables**:
   - Create a `.env` file at the root of your project.
   - Add your API keys and configuration:

   ```env
   OPENAI_API_KEY=your-openai-api-key
   OPENAI_ENDPOINT=https://api.openai.com/v1/completions
   OPENAI_MODEL=text-davinci-003

   CLAUDE_API_KEY=your-claude-api-key
   CLAUDE_ENDPOINT=https://claude.example.com/v1/completions
   CLAUDE_MODEL=claude-2

   GEMINI_API_KEY=your-gemini-api-key
   GEMINI_ENDPOINT=https://gemini.example.com/v1/completions
   GEMINI_MODEL=gemini-1

```typescript
2. **Import the providers in your code**:


import { OpenAIProvider } from './src/providers/openai';
import { ClaudeProvider } from './src/providers/claude';
import { GeminiProvider } from './src/providers/gemini';


2. **Configure and use the providers**:

## OpenAIProvider Example:

const openAIConfig = {
  apiKey: process.env.OPENAI_API_KEY,
  endpoint: process.env.OPENAI_ENDPOINT,
  model: process.env.OPENAI_MODEL,
};

const openAIProvider = new OpenAIProvider(openAIConfig);

async function getOpenAIResponse() {
  const response = await openAIProvider.generateText("What is the capital of France?");
  console.log(response.text); // Output: "Paris"
}

async function streamOpenAIResponse() {
  const responseStream = openAIProvider.streamText("Generate large content...");
  for await (const chunk of responseStream) {
    console.log(chunk.text); // Stream large content in chunks
  }
}

## ClaudeProvider Example:

const claudeConfig = {
  apiKey: process.env.CLAUDE_API_KEY,
  endpoint: process.env.CLAUDE_ENDPOINT,
  model: process.env.CLAUDE_MODEL,
};

const claudeProvider = new ClaudeProvider(claudeConfig);

async function getClaudeResponse() {
  const response = await claudeProvider.generateText("What is the capital of Germany?");
  console.log(response.text); // Output: "Berlin"
}

async function streamClaudeResponse() {
  const responseStream = claudeProvider.streamText("Generate content in chunks...");
  for await (const chunk of responseStream) {
    console.log(chunk.text); // Stream large content in chunks
  }
}

## GeminiProvider Example:

const geminiConfig = {
  apiKey: process.env.GEMINI_API_KEY,
  endpoint: process.env.GEMINI_ENDPOINT,
  model: process.env.GEMINI_MODEL,
};

const geminiProvider = new GeminiProvider(geminiConfig);

async function getGeminiResponse() {
  const response = await geminiProvider.generateText("What is the capital of the United States?");
  console.log(response.text); // Output: "New York"
}

async function streamGeminiResponse() {
  const responseStream = geminiProvider.streamText("Generate long-form content...");
  for await (const chunk of responseStream) {
    console.log(chunk.text); // Stream large content in chunks
  }
}

2. **Log Request and Response Time (Optional)**:

import { logRequestResponseTime } from './logger';

const startTime = Date.now();
// Perform API request
const endTime = Date.now();

logRequestResponseTime(startTime, endTime, "POST", endpoint, requestPayload, responseData);
```
## Contribution

Contributions are welcome! Feel free to fork the repository, make your changes, and submit a pull request.