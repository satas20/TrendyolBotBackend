import { OpenAIService } from "./services/openAIService.ts";
import { TrendyolAPIService } from "./services/trendyolAPIService.ts";
const chatBot =  OpenAIService.getInstance();

chatBot.getUserInput("user", "Hello, how are you?").then((response: any) => {
  console.log(response);
}).catch((error: any) => {
  console.log(error);
});

const trendyolAPI = new TrendyolAPIService();

const mockedQuestions=trendyolAPI.mockGetCustomerQuestions().then((response: any) => {
 // console.log(response);
}).catch((error: any) => {
  console.log(error);
});

chatBot.getUserInput("user", "Bu soruları cevapla türkçe ve json formatında düzgün bir şekilde cevapla "+mockedQuestions).then((response: any) => {
    console.log(response);
    }).catch((error: any) => {
    console.log(error);
    }
    );