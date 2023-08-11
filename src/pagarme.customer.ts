import {PagarmeApiRequest} from "./pagarme.apiRequest";
import {PagarmeApiRequestType} from "./types/pagarmeApiRequest.type";
import {
    CreateCustomerParams,
    CreateCustomerResponse,
    GetCustomerResponse, GetListCustomerContentResponse, GetListCustomerParams, GetListCustomerResponse,
    PatchCustomerParams
} from "./types/pagarmeCustomer.type";
import {PagarMeApiError} from "./helpers/errors.helper";
import {CreateCardResponse} from "./types/pagarmeCard.type";


export class PagarmeCustomer extends PagarmeApiRequest {
    constructor(input: PagarmeApiRequestType.IInput) {
        super(input);
    }

    async createCustomer(input: CreateCustomerParams): Promise<CreateCustomerResponse | undefined> {
        const path = '/customers'
        try {
            const response = await this.api.post<CreateCustomerResponse>(path, input);
            const {data} = response;
            if (!data) {
                throw new PagarMeApiError({
                    path,
                    data: `Something occur in Customer creation, with input ${JSON.stringify(input)}`
                })
            }
            return data;
        } catch (error) {
            throw new PagarMeApiError({path, data: error})
        }
    }

    async getCustomer(idCustomer: string): Promise<GetCustomerResponse | undefined> {
        const path = `/customers/${idCustomer}`;
        try {
            const response = await this.api.get<GetCustomerResponse>(path)
            const {data} = response;
            if (!data) {
                throw new PagarMeApiError({
                    path,
                    data: `Something occur in get Customer, with id ${JSON.stringify(idCustomer)}`
                })
            }
            return data;
        } catch (error) {
            throw new PagarMeApiError({path, data: error})
        }
    }

    async updateCustomer(input: PatchCustomerParams): Promise<GetCustomerResponse | undefined> {
        const path = `/customers/${input.customerId}`;
        try {
            const response = await this.api.put<GetCustomerResponse>(path, input)
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

    async getListCustomer(
        input: GetListCustomerParams,
        nextUrl?: string,
        currentData?: GetListCustomerContentResponse[],
    ): Promise<GetListCustomerContentResponse[] | undefined> {
        const path = nextUrl ? nextUrl : `/customers?${this.getUrlForListCustomer(input)}`
        try {

            const response = await this.api.get<GetListCustomerResponse>(path)
            if (!response) {
                throw new PagarMeApiError({
                    path,
                    data: `Something occur in get list Customer ${JSON.stringify(input)}`
                })
            }

            if (response && response.data.paging && response.data.data) {
                const removedItems = response.data.data.length ? response.data.data.splice(0, response.data.data.length) : [];
                removedItems.length ? currentData?.push(...removedItems) : currentData;
                return await this.getListCustomer(input, response.data.paging.next, currentData);
            }

            return currentData;
        } catch (error) {
            throw Error(error as any);
        }
    }

    private getUrlForListCustomer(input: any): string {
        const keys: any = Object.keys(input);
        const url = '';

        for (let i = 0; i < keys.length; i++) {
            if (i == 0) {
                url.concat(`${keys[0]}=${input[keys[0]]}`);
            }
            url.concat(`&${keys[0]}=${input[keys[0]]}\``);
        }

        return url;
    }
}