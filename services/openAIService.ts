import { OpenAI } from "openai";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const env = config();
const apiKey = env.OPENAI_API_KEY;

class OpenAIBot {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey });
  }

  async getUserInput(role: string, prompt: string): Promise<any> {
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

export { OpenAIBot };
