import { OpenAIProvider } from "./providers/openai";
import { ClaudeProvider } from "./providers/claude";
import { GeminiProvider } from "./providers/gemini";
import { DefaultLLMProvider } from "./providers/default";
import { LLMConfig, LLMProvider } from "./types/llm";
import dotenv from "dotenv";

dotenv.config();

export function createLLMProvider(provider: "openai" | "claude" | "gemini" | "default", config: LLMConfig): LLMProvider {
  switch (provider) {
    case "openai":
      return new OpenAIProvider(config);
    case "claude":
      return new ClaudeProvider(config);
    case "gemini":
        return new GeminiProvider(config);
    case "default":
        return new DefaultLLMProvider(config);
    default:
      throw new Error(`Provider "${provider}" is not supported.`);
  }
}
