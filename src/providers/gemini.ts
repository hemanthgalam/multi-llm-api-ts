import axios from "axios";
import { BaseProvider } from "./baseProvider";
import { LLMResponse } from "../types/llm";
import { config } from "../config";
import { logRequestResponseTime } from '../utils/logger'; // Import logRequestResponseTime function

/**
 * GeminiProvider handles communication with the Gemini API.
 * It supports both generating text and streaming text responses.
 */
export class GeminiProvider extends BaseProvider {
  private defaultEndpoint = config.gemini.endpoint;
  private defaultModel = config.gemini.defaultModel;

  /**
   * Generates text using the Gemini API.
   * 
   * @param prompt The input prompt for the LLM.
   * @param options Optional configuration options.
   * @return A Promise that resolves to the LLM response.
   */
  async generateText(prompt: string, options: Record<string, unknown> = {}): Promise<LLMResponse> {
    const endpoint = this.config.endpoint || this.defaultEndpoint;
    const model = this.config.model || this.defaultModel;
    const apiKey = this.config.apiKey || config.gemini.apiKey;

    const startTime = Date.now(); // Record start time for logging

    const response = await axios.post(
      endpoint,
      {
        model,
        prompt,
        max_tokens: options.maxTokens || 100,
        temperature: options.temperature || 0.7,
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
      model,
      prompt,
      max_tokens: options.maxTokens || 100,
      temperature: options.temperature || 0.7,
    }, response.data);

    return {
      id: response.data.id,
      text: response.data.choices[0].text,
      ...response.data,
    };
  }

  /**
   * Streams text from the Gemini API in chunks.
   * 
   * @param prompt The input prompt for the LLM.
   * @param options Optional configuration options.
   * @return An async iterable of LLM responses.
   */
  async *streamText(prompt: string, options: Record<string, unknown> = {}): AsyncIterable<LLMResponse> {
    const endpoint = this.config.endpoint || this.defaultEndpoint;
    const model = this.config.model || this.defaultModel;
    const apiKey = this.config.apiKey || config.gemini.apiKey;

    const startTime = Date.now(); // Record start time for logging

    const response = await axios.post(
      endpoint,
      {
        model,
        prompt,
        max_tokens: options.maxTokens || 100,
        temperature: options.temperature || 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        responseType: "stream", // Set the response type to stream
      }
    );

    const stream = response.data;

    for await (const chunk of stream) {
      const chunkData = JSON.parse(chunk.toString());
      yield {
        id: chunkData.id,
        text: chunkData.choices[0].text,
        ...chunkData,
      };
    }

    const endTime = Date.now(); // Record end time for logging

    // Log request and response times
    logRequestResponseTime(startTime, endTime, "POST", endpoint, {
      model,
      prompt,
      max_tokens: options.maxTokens || 100,
      temperature: options.temperature || 0.7,
    }, response.data);
  }
}
