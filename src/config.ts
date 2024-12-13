export const config = {
    openAI: {
      apiKey: process.env.OPENAI_API_KEY || "",
      endpoint: process.env.OPENAI_ENDPOINT || "https://api.openai.com/v1/completions",
      defaultModel: process.env.OPENAI_MODEL || "text-davinci-003",
    },
    claude: {
      apiKey: process.env.CLAUDE_API_KEY || "",
      endpoint: process.env.CLAUDE_ENDPOINT || "https://claude.example.com/v1/completions",
      defaultModel: process.env.CLAUDE_MODEL || "claude-2",
    },
    gemini: {
      apiKey: process.env.GEMINI_API_KEY || "",
      endpoint: process.env.GEMINI_ENDPOINT || "https://gemini.example.com/v1/completions",
      defaultModel: process.env.GEMINI_MODEL || "gemini-1",
    },
  };
  