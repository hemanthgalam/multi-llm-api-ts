import { GeminiProvider } from "../src/providers/gemini";

describe("GeminiProvider", () => {
  it("should generate text successfully", async () => {
    const mockConfig = {
      apiKey: "mock-api-key",
      endpoint: "https://gemini.example.com/v1/completions",
    };

    const provider = new GeminiProvider(mockConfig);

    // Mock the axios response
    jest.spyOn(require("axios"), "post").mockResolvedValue({
      data: {
        id: "123",
        choices: [{ text: "Paris" }],
      },
    });

    const response = await provider.generateText("What is the capital of France?");
    expect(response.text).toBe("Paris");
  });
});
