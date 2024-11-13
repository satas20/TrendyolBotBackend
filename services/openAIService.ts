import { OpenAI } from "openai";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const env = config();
const apiKey = env.OPENAI_API_KEY;

class OpenAIService {
  private static instance: OpenAIService;
  private openai: OpenAI;

  private constructor() {
    this.openai = new OpenAI({ apiKey });
  }

  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  public async getUserInput(role: string, prompt: string): Promise<any> {
    const response = await this.openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-1106-preview",
      max_tokens: 100,
    });

    if (response.choices && response.choices.length > 0) {
      return response.choices[0].message;
    } else {
      throw new Error("No response from OpenAI");
    }
  }
}

export { OpenAIService };
