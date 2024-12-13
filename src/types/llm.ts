export interface LLMConfig {
    apiKey: string;
    endpoint?: string;
    model?: string;
    [key: string]: unknown;
  }
  
  export interface LLMResponse {
    id: string;
    text: string;
    [key: string]: unknown;
  }
  
  export interface LLMProvider {
    generateText(prompt: string, options?: Record<string, unknown>): Promise<LLMResponse>;
    streamText?(prompt: string, options?: Record<string, unknown>): AsyncIterable<LLMResponse>;
  }
  