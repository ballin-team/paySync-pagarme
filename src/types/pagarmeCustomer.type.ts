export enum CustomerTypeEnum {
    INDIVIDUAL = 'individual',
    COMPANY = 'company',
}

export enum CustomerDocumentTypeEnum {
    CPF = 'CPF',
    CNPJ = 'CNPJ',
    PASSPORT = 'PASSPORT',
}

export interface Address {
    country: string;
    state: string;
    city: string;
    zipCode: string;
    line1: string;
    line2?: string;
}

export interface PhoneData {
    countryCode: string;
    areaCode: string;
    number: string;
}

export interface CreateCustomerParams {
    name: string;
    email: string;
    code: string;
    document: string;
    document_type: CustomerDocumentTypeEnum;
    type: CustomerTypeEnum;
    gender: 'MALE' | 'FEMALE';
    address: Address;
    phones: {
        homePhone: PhoneData;
        mobilePhone: PhoneData;
    };
    birthdate: string;
    metadata?: string;
}

export interface CreateCustomerResponse {
    id: string;
    name: string;
    email: string;
    code: string;
    document: string;
    document_type: string;
    type: string;
    gender: string;
    delinquent: boolean;
    address: {
        id: string;
        line_1: string;
        line_2: string;
        zip_code: string;
        city: string;
        state: string;
        country: string;
        status: string;
        created_at: string;
        updated_at: string;
    };
    created_at: string;
    updated_at: string;
    birthdate: string;
    phones: {
        homePhone: PhoneData;
        mobilePhone: PhoneData;
    };
    metadata: {
        id: string;
        company: string;
    };
}

export interface GetCustomerResponse {
    id: string;
    name: string;
    email: string;
    gender: string;
    delinquent: boolean;
    address: {
        id: string;
        line_1: string;
        line_2: string;
        zip_code: string;
        city: string;
        state: string;
        country: string;
        status: string;
        created_at: string;
        updated_at: string;
    };
    created_at: string;
    updated_at: string;
    phones?: {
        homePhone?: PhoneData;
        mobilePhone?: PhoneData;
    };
    metadata: {
        company: string;
    };
}

export interface PatchCustomerParams {
    customerId: string;
    name?: string;
    email?: string;
    code?: string;
    document?: string;
    document_type?: CustomerDocumentTypeEnum;
    type?: CustomerTypeEnum;
    gender?: 'MALE' | 'FEMALE';
    birthdate?: string;
    metadata?: string;
}

export interface GetListCustomerParams {
    name: string;
    document: string;
    email: string;
    gender: 'male' | 'female';
    page: number;
    size: number;
    code: string;
}

export interface GetListCustomerContentResponse {
    id: string;
    name: string;
    gender: string;
    email: string;
    delinquent: boolean;
    created_at: string;
    updated_at: string;
}

export interface GetListCustomerResponse {
    data: {
        id: string;
        name: string;
        gender: string;
        email: string;
        delinquent: boolean;
        created_at: string;
        updated_at: string;
    }[];
    paging: {
        total: number;
        next: string;
    };
}