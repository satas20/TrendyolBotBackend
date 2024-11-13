import { TrendyolAPIService } from "./trendyolAPIService.ts";
import{OpenAIService} from"./openAIService.ts";
class QuestionService{
    trendyolAPI: TrendyolAPIService;
    openAIService: OpenAIService | undefined;
    constructor(){
        this.trendyolAPI=  new TrendyolAPIService();
        this.openAIService = OpenAIService.getInstance();
    }

    getCustomerQuestions(): void {
      const questions =  this.trendyolAPI.mockGetCustomerQuestions;
      //Todo:get questions and init them on database 
    }
    //Todo:answerQuestions
}
export{QuestionService};
