import { LLMConfig, LLMResponse, LLMProvider } from "../types/llm";

/**
 * BaseProvider is an abstract class that provides a foundation for implementing LLM (Large Language Model) providers.
 * It defines the common structure and methods required by all LLM providers.
 */
export abstract class BaseProvider implements LLMProvider {
  protected config: LLMConfig;

  /**
   * Constructor for the BaseProvider.
   * 
   * @param config The configuration object containing API key and optional provider-specific settings.
   * @throws Will throw an error if the API key is not provided.
   */
  constructor(config: LLMConfig) {
    if (!config.apiKey) {
      throw new Error("API key is required for LLM providers.");
    }
    this.config = config;
  }

  /**
   * Abstract method to generate text using the LLM provider.
   * 
   * @param prompt The input prompt for the LLM.
   * @param options Optional configuration options for generating text.
   * @return A promise that resolves to the generated LLM response.
   */
  abstract generateText(prompt: string, options?: Record<string, unknown>): Promise<LLMResponse>;

  /**
   * Abstract method to stream text responses from the LLM provider.
   * 
   * @param prompt The input prompt for the LLM.
   * @param options Optional configuration options for streaming responses.
   * @return An asynchronous iterable of LLM responses.
   */
  abstract streamText(prompt: string, options?: Record<string, unknown>): AsyncIterable<LLMResponse>;
}
