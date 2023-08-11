export enum CreateCardBrandEnum {
    ELO = 'elo',
    MASTERCARD = 'mastercard',
    VISA = 'visa',
    AMEX = 'amex',
    JCB = 'jcb',
    AURA = 'aura',
    HIPERCARD = 'hipercard',
    DINERS = 'diners',
    UNIONPAY = 'unionpay',
    DISCOVER = 'discover',
}

export interface BillingAddressData {
    line_1: string;
    line_2: string;
    zip_code: string;
    city: string;
    state: string;
    country: string;
}

export interface CardData {
    number: string;
    holder_name?: string;
    holder_document?: string;
    exp_month: number;
    exp_year: number;
    cvv: string;
    brand?: CreateCardBrandEnum;
    label?: string;
    billing_address_id?: string;
    billing_address?: BillingAddressData;
    token?: string;
}

export interface CreateCardInput {
    customer_id: string;
    data: CardData;
}

export interface CreateCardResponse {
    id: string;
    first_six_digits: string;
    last_four_digits: string;
    brand: string;
    holder_name: string;
    holder_document: string;
    exp_month: number;
    exp_year: number;
    status: string;
    label: string;
    created_at: Date;
    updated_at: Date;
    billing_address: {
        zip_code: string;
        city: string;
        state: string;
        country: string;
        line_1: string;
        line_2: string;
    };
    customer: {
        id: string;
        name: string;
        email: string;
        document: string;
        type: string;
        delinquent: boolean;
        created_at: string;
        updated_at: string;
        phones: {
            home_phone: {
                country_code: string;
                number: string;
                area_code: string;
            };
            mobile_phone: {
                country_code: string;
                number: string;
                area_code: string;
            };
        };
        metadata: {
            company: string;
        };
    };
    type: string;
}

export interface EditCardInput {
    customer_id: string;
    card_id: string;
    data: {
        holder_name?: string;
        holder_document?: string;
        exp_month: number;
        exp_year: number;
        billing_address_id?: string;
    };
}

export interface CreateTokenInput {
    appId: string;
    type: 'card';
    card: CardData;
}


