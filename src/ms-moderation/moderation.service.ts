import { Injectable } from "@nestjs/common";

const { google } = require("googleapis");


@Injectable()
export class ModerationService {
   async moderateText(content: string) {
      
      google.discoverAPI()
      .then(client => {
         const analyzeRequest = {
            comment: content,
            requestedAttributes: {
               TOXICITY: {},
            },
         };

         client.comments.analyze(
            {
               key: process.env.PERSPECTIVE_API_KEY,
               resource: analyzeRequest,
            },
            (err, response) => {
               if (err) {
                  throw err;
               }
               return response;
            }
         )
      })
      .catch(err => {
         throw err;
      });
   }
}