import { AddressData } from './pagarmeAddress.type'
import {CreateCustomerParams} from "./pagarmeCustomer.type";

export enum PaymentMethodsEnum {
    CREDIT_CARD = 'credit_card',
}

export enum CreditCardOperationTypeEnum {
    AUTH_AND_CAPTURE = 'auth_and_capture',
    AUTH_ONLY = 'auth_only',
    PRE_AUTH = 'pre_auth',
}

export enum CreditCardBrandEnum {
    ELO = 'Elo',
    MASTERCARD = 'Mastercard',
    VISA = 'Visa',
    AMEX = 'Amex',
    HIPERCARD = 'Hipercard',
}

export enum CreditCardRecurrenceEnum {
    FIRST = 'first',
    SUBSEQUENT = 'subsequent',
}

export enum PaymentSplitTypeEnum {
    FLAT = 'flat',
    PERCENTAGE = 'percentage',
}

export interface CreditCardData {
    operation_type: CreditCardOperationTypeEnum;
    installments: number;
    statement_descriptor: string;
    card: {
        number: string;
        holder_name: string;
        holder_document: string;
        exp_month: number;
        exp_year: number;
        cvv: string;
        brand?: CreditCardBrandEnum;
        label: string;
        billing_address_id: string;
    };
    network_token: {
        number: string;
        holder_name: string;
        exp_month: number;
        exp_year: number;
        cryptograms: string;
    };
    card_id: string;
    card_token: string;
    recurrence_cycle: CreditCardRecurrenceEnum;
}

export interface CreateOrderInput {
    code: string;
    customer?: CreateCustomerParams[];
    customer_id?: string;
    items: {
        amount: number;
        description: string;
        quantity: number;
        code: string;
    }[];
    shipping: {
        amount: number;
        description: string;
        recipient_name: string;
        recipient_phone: string;
        address: AddressData;
    };
    payment: {
        payment_method: PaymentMethodsEnum;
        credit_card: CreditCardData;
        amount: number;
        split: {
            amount: number;
            recipient_id: string;
            type: PaymentSplitTypeEnum;
            options: {
                charge_processing_fee: boolean;
                charge_remainder_fee: boolean;
                liable: boolean;
            };
        };
    };
}

export interface CreateOrderReturn {
    id: string;
    code: string;
    amount: number;
    currency: string;
    closed: boolean;
    items: {
        id: string;
        description: string;
        amount: number;
        quantity: number;
        status: string;
        code: string;
    }[];
    customer: {
        name: string;
        email: string;
        document: string;
        type: string;
        address: {
            line_1: string;
            line_2: string;
            zip_code: string;
            city: string;
            state: string;
            country: string;
        };
        phones: {
            home_phone: {
                country_code: string;
                area_code: string;
                number: string;
            };
            mobile_phone: {
                country_code: string;
                area_code: string;
                number: string;
            };
        };
    };
    shipping: {
        amount: number;
        description: string;
        recipient_name: string;
        recipient_phone: string;
        address: {
            line_1: string;
            zip_code: string;
            city: string;
            state: string;
            country: string;
        };
    };
    status: string;
    created_at: Date;
    updated_at: Date;
    closed_at: Date;
    charges: [
        {
            id: string;
            code: string;
            gateway_id: string;
            amount: number;
            status: string;
            currency: string;
            payment_method: string;
            paid_at: string;
            created_at: string;
            updated_at: string;
            customer: {
                id: string;
                name: string;
                email: string;
                delinquent: boolean;
                created_at: Date;
                updated_at: Date;
            };
            last_transaction: {
                id: string;
                transaction_type: string;
                funding_source: string;
                gateway_id: string;
                amount: number;
                status: string;
                success: boolean;
                installments: number;
                statement_descriptor: string;
                acquirer_name: string;
                acquirer_affiliation_code: string;
                acquirer_tid: string;
                acquirer_nsu: string;
                acquirer_auth_code: string;
                acquirer_message: string;
                acquirer_return_code: string;
                operation_type: string;
                card: {
                    id: string;
                    first_six_digits: string;
                    last_four_digits: string;
                    brand: string;
                    holder_name: string;
                    exp_month: number;
                    exp_year: number;
                    status: string;
                    created_at: Date;
                    updated_at: Date;
                    billing_address: {
                        line_1: string;
                        zip_code: string;
                        city: string;
                        state: string;
                        country: string;
                    };
                    type: string;
                };
                created_at: Date;
                updated_at: Date;
                gateway_response: {
                    code: string;
                };
                antifraud_response: {
                    provider_name: string;
                    status: string;
                    return_code: string;
                    return_message: string;
                    score: string;
                };
            };
        },
    ];
}