import { ClaudeProvider } from "../src/providers/claude";
import axios from "axios";

describe("ClaudeProvider", () => {
  it("should generate text successfully", async () => {
    const mockConfig = {
      apiKey: "mock-api-key",
      endpoint: "https://claude.example.com/v1/completions",
      model: "claude-2",
    };

    const provider = new ClaudeProvider(mockConfig);

    // Mock the axios response
    jest.spyOn(axios, "post").mockResolvedValue({
      data: {
        id: "123",
        choices: [{ text: "Berlin" }],
      },
    });

    const response = await provider.generateText("What is the capital of Germany?");
    expect(response.text).toBe("Berlin");
  });
});
