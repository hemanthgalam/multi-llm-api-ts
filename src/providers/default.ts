import axios from "axios";
import { BaseProvider } from "./baseProvider";
import { LLMResponse } from "../types/llm";
import { config } from "../config";
import { logRequestResponseTime } from '../utils/logger';

/**
 * DefaultLLMProvider handles communication with Hugging Face's open-source LLM API.
 * It supports both generating text and streaming text responses.
 */
export class DefaultLLMProvider extends BaseProvider {
  private generatorUrl = `${config.llm.endpoint}/${config.llm.defaultModel}`;

  /**
   * Generates text using the Hugging Face API.
   * 
   * @param prompt The input prompt for the LLM.
   * @param options Optional configuration options.
   * @return A Promise that resolves to the LLM response.
   */
  async generateText(prompt: string, options: Record<string, unknown> = {}): Promise<LLMResponse> {
    const endpoint = this.generatorUrl;
    const apiKey = config.llm.apiKey || "";

    const startTime = Date.now(); // Record start time for logging

    const response = await axios.post(
      endpoint,
      {
        inputs: prompt,
        params: {
          max_new_tokens: options.maxTokens || 100,
          temperature: options.temperature || 0.7,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const endTime = Date.now(); // Record end time for logging

    // Log request and response times
    logRequestResponseTime(startTime, endTime, "POST", endpoint, {
      prompt,
      max_new_tokens: options.maxTokens || 100,
      temperature: options.temperature || 0.7,
    }, response.data);

    return {
      id: response.data.id || "default-llm-response",
      text: response.data[0]?.generated_text,
      ...response.data,
    };
  }

  /**
   * Streams text from the Hugging Face API in chunks.
   * 
   * @param prompt The input prompt for the LLM.
   * @param options Optional configuration options.
   * @return An async iterable of LLM responses.
   */
  async *streamText(prompt: string, options: Record<string, unknown> = {}): AsyncIterable<LLMResponse> {
    const endpoint = this.generatorUrl;
    const apiKey = config.llm.apiKey || "";

    const startTime = Date.now(); 

    const response = await axios.post(
      endpoint,
      {
        inputs: prompt,
        params: {
          max_new_tokens: options.maxTokens || 100,
          temperature: options.temperature || 0.7,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        responseType: "stream",
      }
    );

    const stream = response.data;

    for await (const chunk of stream) {
      yield {
        id: "huggingface-stream-response",
        text: chunk.generated_text,
        ...chunk,
      };
    }

    const endTime = Date.now();

    // Log request and response times
    logRequestResponseTime(startTime, endTime, "POST", endpoint, {
      prompt,
      max_new_tokens: options.maxTokens || 100,
      temperature: options.temperature || 0.7,
    }, response.data);
  }
}
