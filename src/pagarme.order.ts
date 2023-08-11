import {PagarmeApiRequest} from "./pagarme.apiRequest";
import {PagarmeApiRequestType} from "./types/pagarmeApiRequest.type";
import {CreateOrderInput, CreateOrderReturn} from "./types/pagarmeOrder.type";
import {CreateCardResponse} from "./types/pagarmeCard.type";
import {PagarMeApiError} from "./helpers/errors.helper";


export class PagarmeOrder extends PagarmeApiRequest {
    constructor(input: PagarmeApiRequestType.IInput) {
        super(input);
    }

    async createOrder(input: CreateOrderInput): Promise<CreateOrderReturn | undefined> {
        const path = '/orders'
        try {
            const response = await this.api.post<CreateOrderReturn>(path, input);
            const {data} = response;
            if (!data) {
                throw new PagarMeApiError({
                    path,
                    data: `Something occur in Order creation, with input ${JSON.stringify(input)}`
                })
            }
            return data;
        } catch (error) {
            throw new PagarMeApiError({path, data: error})
        }
    }

    async getOrder(orderId: string): Promise<CreateOrderReturn | undefined> {
        const path = `/orders/${orderId}`
        try {
            const response = await this.api.get<CreateOrderReturn>(path)
            const {data} = response;
            if (!data) {
                throw new PagarMeApiError({
                    path,
                    data: `Something occur in get Order, with id ${JSON.stringify(orderId)}`
                })
            }
            return data;
        } catch (error) {
            throw new PagarMeApiError({path, data: error})
        }
    }
}