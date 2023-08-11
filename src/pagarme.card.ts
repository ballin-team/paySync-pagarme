import {PagarmeApiRequestType} from "./types/pagarmeApiRequest.type";
import {PagarmeApiRequest} from "./pagarme.apiRequest";
import {CreateCardInput, CreateCardResponse, EditCardInput} from "./types/pagarmeCard.type";
import {PagarMeApiError} from "./helpers/errors.helper";


export class PagarmeCard extends PagarmeApiRequest{
    constructor(input: PagarmeApiRequestType.IInput) {
        super(input);
    }

    async createCard(input: CreateCardInput): Promise<CreateCardResponse | undefined> {
        const path = `/customers/${input.customer_id}/cards`
        try {
            const response = await this.api.post<CreateCardResponse>(path, input.data);
            const {data} = response;
            if (!data) {
                throw new PagarMeApiError({
                    path,
                    data: `Something occur in Card creation, with input ${JSON.stringify(input)}`
                })
            }
            return data;
        } catch (error) {
            throw new PagarMeApiError({path, data: error})
        }
    }

    async getCard(customer_id: string, card_id: string): Promise<CreateCardResponse | undefined> {
        const path = `/customers/${customer_id}/cards/${card_id}`
        try {
            const response = await this.api.get<CreateCardResponse>(path)
            const {data} = response;
            if (!data) {
                throw new PagarMeApiError({
                    path,
                    data: `Something occur in get Addresses, with address_id ${JSON.stringify(card_id)}`
                })
            }
            return data;
        } catch (error) {
            throw new PagarMeApiError({path, data: error})
        }
    }

    async updateCard(input: EditCardInput): Promise<CreateCardResponse | undefined> {
        const path = `/customers/${input.customer_id}/cards/${input.card_id}`
        try {
            const response = await this.api.put<CreateCardResponse>(path, input.data)
            const {data} = response;
            if (!data) {
                throw new PagarMeApiError({
                    path,
                    data: `Something occur in update Card, with address_id ${JSON.stringify(input)}`
                })
            }
            return data;
        } catch (error) {
            throw new PagarMeApiError({path, data: error})
        }
    }

    async deleteCard(customer_id: string, card_id: string): Promise<CreateCardResponse | undefined> {
        const path = `/customers/${customer_id}/cards/${card_id}`;
        try {
            const response = await this.api.delete<CreateCardResponse>(path)
            const {data} = response;
            if (!data) {
                throw new PagarMeApiError({
                    path,
                    data: `Something occur in delete Card, with card_id ${JSON.stringify(card_id)}`
                })
            }
            return data;
        } catch (error) {
            throw new PagarMeApiError({path, data: error})
        }
    }
}