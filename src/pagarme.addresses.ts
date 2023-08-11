import {PagarmeApiRequest} from "./pagarme.apiRequest";
import {PagarmeApiRequestType} from "./types/pagarmeApiRequest.type";
import {CreateAddressesInput, CreateAddressesReturn, UpdateAddressInput} from "./types/pagarmeAddress.type";
import {PagarMeApiError} from "./helpers/errors.helper";


export class PagarmeAddresses extends PagarmeApiRequest {
    constructor(input: PagarmeApiRequestType.IInput) {
        super(input);
    }

    async createAddress(input: CreateAddressesInput): Promise<CreateAddressesReturn | undefined> {
        const path = `/customers/${input.customer_id}/addresses`;
        try {
            const response = await this.api.post<CreateAddressesReturn>(path, input.data);
            const {data} = response;

            if (!data) {
                throw new PagarMeApiError({
                    path,
                    data: `Something occur in Addresses creation, with input ${JSON.stringify(input)}`
                })
            }
            return data;
        } catch (error) {
            throw new PagarMeApiError({path, data: error})
        }
    }

    async getAddress(customer_id: string, address_id: string): Promise<CreateAddressesReturn | undefined> {
        const path = `/customers/${customer_id}/addresses/${address_id}`;
        try {
            const response = await this.api.get<CreateAddressesReturn>(path)
            const {data} = response;
            if (!data) {
                throw new PagarMeApiError({
                    path,
                    data: `Something occur in get Addresses, with address_id ${JSON.stringify(address_id)}`
                })
            }
            return data;
        } catch (error) {
            throw new PagarMeApiError({path, data: error})
        }
    }

    async updateAddress(input: UpdateAddressInput): Promise<CreateAddressesReturn | undefined> {
        const path = `/customers/${input.customer_id}/addresses/${input.address_id}`;
        try {
            const response = await this.api.put<CreateAddressesReturn>(path, input.line_2)
            const {data} = response;
            if (!data) {
                throw new PagarMeApiError({
                    path,
                    data: `Something occur in update Addresses, with address_id ${JSON.stringify(input.address_id)}`
                })
            }
            return data;
        } catch (error) {
            throw new PagarMeApiError({path, data: error})
        }
    }

    async deleteAddress(customer_id: string, address_id: string): Promise<CreateAddressesReturn | undefined> {
        const path = `/customers/${customer_id}/addresses/${address_id}`;
        try {
            const response = await this.api.delete<CreateAddressesReturn>(path)
            const {data} = response;
            if (!data) {
                throw new PagarMeApiError({
                    path,
                    data: `Something occur in delete Addresses, with address_id ${JSON.stringify(address_id)}`
                })
            }
            return data;
        } catch (error) {
            throw new Error(error as any);
        }
    }
}