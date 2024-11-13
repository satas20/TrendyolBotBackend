import config from "../config/config.json" with { type: "json" };

class TrendyolAPIService {
  constructor() {
    // some logic
  }
  async getProducts() {
    // some logic
  }

  async getCustomerQuestions() {
    const url = `${config.baseUrl}${
      config.endpoints.getCustomerQuestions.replace(
        "{{supplierId}}",
        config.variables.supplierId,
      )
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Basic ${
          btoa(`${config.variables.supplierId}:your_password`)
        }`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  }

  async answerCustomerQuestion(questionId: string, answer: string) {
    const url = `${config.baseUrl}${
      config.endpoints.answerCustomerQuestions.replace(
        "{{supplierId}}",
        config.variables.supplierId,
      ).replace("{{id}}", questionId)
    }`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${
          btoa(`${config.variables.supplierId}:your_password`)
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: answer }),
    });

    const data = await response.json();
    return data;
  }
async mockGetCustomerQuestions() {
    const mockQuestions = await import("../utils/mockQuestions.json", {
        with: { type: "json" },
    });

    return mockQuestions.default.questions.map((question: { id: number; question: string; date: string; }) => ({
        id: question.id,
        question: question.question,
        date: question.date,
    }));
}
}
export { TrendyolAPIService };
