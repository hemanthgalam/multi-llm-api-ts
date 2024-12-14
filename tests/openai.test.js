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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("../src/providers/openai");
const axios_1 = __importDefault(require("axios"));
describe("OpenAIProvider", () => {
    it("should generate text successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockConfig = {
            apiKey: "mock-api-key",
            endpoint: "https://api.openai.com/v1/completions",
            model: "text-davinci-003",
        };
        const provider = new openai_1.OpenAIProvider(mockConfig);
        // Mock the axios response
        jest.spyOn(axios_1.default, "post").mockResolvedValue({
            data: {
                id: "123",
                choices: [{ text: "New York" }],
            },
        });
        const response = yield provider.generateText("What is the capital of the United States?");
        expect(response.text).toBe("New York");
    }));
});
