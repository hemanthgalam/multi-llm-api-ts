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
const claude_1 = require("../src/providers/claude");
const axios_1 = __importDefault(require("axios"));
describe("ClaudeProvider", () => {
    it("should generate text successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockConfig = {
            apiKey: "mock-api-key",
            endpoint: "https://claude.example.com/v1/completions",
            model: "claude-2",
        };
        const provider = new claude_1.ClaudeProvider(mockConfig);
        // Mock the axios response
        jest.spyOn(axios_1.default, "post").mockResolvedValue({
            data: {
                id: "123",
                choices: [{ text: "Berlin" }],
            },
        });
        const response = yield provider.generateText("What is the capital of Germany?");
        expect(response.text).toBe("Berlin");
    }));
});
