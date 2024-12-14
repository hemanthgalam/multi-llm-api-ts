"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const gemini_1 = require("../src/providers/gemini");
describe("GeminiProvider", () => {
    it("should generate text successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockConfig = {
            apiKey: "mock-api-key",
            endpoint: "https://gemini.example.com/v1/completions",
        };
        const provider = new gemini_1.GeminiProvider(mockConfig);
        // Mock the axios response
        jest.spyOn(require("axios"), "post").mockResolvedValue({
            data: {
                id: "123",
                choices: [{ text: "Paris" }],
            },
        });
        const response = yield provider.generateText("What is the capital of France?");
        expect(response.text).toBe("Paris");
    }));
});
