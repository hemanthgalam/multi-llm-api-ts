import { OpenAIProvider } from "../src/providers/openai";
import axios from "axios";

describe("OpenAIProvider", () => {
  it("should generate text successfully", async () => {
    const mockConfig = {
      apiKey: "mock-api-key",
      endpoint: "https://api.openai.com/v1/completions",
      model: "text-davinci-003",
    };

    const provider = new OpenAIProvider(mockConfig);

    // Mock the axios response
    jest.spyOn(axios, "post").mockResolvedValue({
      data: {
        id: "123",
        choices: [{ text: "New York" }],
      },
    });

    const response = await provider.generateText("What is the capital of the United States?");
    expect(response.text).toBe("New York");
  });
});
