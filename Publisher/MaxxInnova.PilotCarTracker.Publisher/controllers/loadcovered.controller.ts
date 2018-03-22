import { IRequestContext } from "../common/request-context";
import { v4 as uuid } from "uuid"
import { message } from "../models/loadcovered-message"

export class LoadCoveredController {
    constructor(private context: IRequestContext) {
        
    }

    async post(request: ISmsRequest) {
        const data = {
            mid: uuid(),
            sid: request.SmsSid,
            from: request.From,
            body: decodeURI(request.Body),
            raw: JSON.stringify(request)
        };

        await message.create(data);

        this.context
            .response
            .status(200)
            .contentType("text/xml")
            .send("<Response></Response>");
    }

    async get(id?: number) {
        const data = [];

        this.context
            .response
            .status(200)
            .json(data);
    }
}

// tslint:disable:field-name
export interface ISmsRequest {
    ApiVersion: string;
    SmsSid: string;
    SmsStatus: string;
    SmsMessageSid: string;
    NumSegments: number;
    From: string;
    ToState: string;
    MessageSid: string;
    AccountSid: string;
    ToZip: string;
    FromCountry: string;
    ToCity: string;
    FromCity: string;
    To: string;
    FromZip: string;
    Body: string;
    ToCountry: string;
    FromState: string;
    NumMedia: number;
}
// tslint:enable:field-name
