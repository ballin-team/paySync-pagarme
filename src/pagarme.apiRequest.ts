import {PagarmeApiRequestType} from "./types/pagarmeApiRequest.type";
import axios, {AxiosInstance} from "axios";
import {HttpStatus} from "./helpers/httpStatusCode.helper";


export class PagarmeApiRequest {
    protected config: PagarmeApiRequestType.IInput;
    public api: AxiosInstance;
    protected constructor(input: PagarmeApiRequestType.IInput) {
        this.config = input;
        this.api = axios.create({
            baseURL: this.setHost(input.testEnv),
            timeout: input.timeout || 30000,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(input.credentials.username).toString('base64'),
            },
            validateStatus: ((status) => status === HttpStatus.OK)
        })
    }

    private setHost(testEnv: boolean): string {
        if(testEnv) {
            return 'https://api.pagar.me/core/v5';
        }
        return 'https://api.pagar.me/core/v5';
    }

    get env () {
        return this.config.testEnv ? 'SANDBOX' : 'PRODUCTION';
    }
}