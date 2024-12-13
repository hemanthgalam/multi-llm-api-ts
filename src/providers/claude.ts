import axios from "axios";
import { BaseProvider } from "./baseProvider";
import { LLMResponse } from "../types/llm";
import { config } from "../config";
import { logRequestResponseTime } from '../utils/logger';

/**
 * ClaudeProvider handles communication with the Claude API.
 * It supports both generating text and streaming text responses.
 */
export class ClaudeProvider extends BaseProvider {
  private defaultEndpoint = config.claude.endpoint;
  private defaultModel = config.claude.defaultModel;

  /**
   * Generates text using the Claude API.
   * 
   * @param prompt The input prompt for the LLM.
   * @param options Optional configuration options.
   * @return A Promise that resolves to the LLM response.
   */
  async generateText(prompt: string, options: Record<string, unknown> = {}): Promise<LLMResponse> {
    const endpoint = this.config.endpoint || this.defaultEndpoint;
    const model = this.config.model || this.defaultModel;
    const apiKey = this.config.apiKey || config.claude.apiKey;

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
   * Streams text from the Claude API in chunks.
   * 
   * @param prompt The input prompt for the LLM.
   * @param options Optional configuration options.
   * @return An async iterable of LLM responses.
   */
  async *streamText(prompt: string, options: Record<string, unknown> = {}): AsyncIterable<LLMResponse> {
    const endpoint = this.config.endpoint || this.defaultEndpoint;
    const model = this.config.model || this.defaultModel;
    const apiKey = this.config.apiKey || config.claude.apiKey;

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
