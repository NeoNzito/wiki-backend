import { Injectable } from "@nestjs/common";
import axios from "axios";


@Injectable()
export class ModerationService {
   async moderateText(content: string) {
      const response = await axios.post(
         'https://api.perspectiveapi.com/v1/compute',
         {
            comment: { text: content },
            languages: ["pt", "en"],
            requestedAttributes: { TOXICITY: {} },
         },
         {
            headers: { "x-api-key": process.env.PERSPECTIVE_API_KEY }
         }
      );

      return await response;
   }
}