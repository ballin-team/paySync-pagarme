export namespace PagarmeApiRequestType {
    export interface IInput {
        testEnv: boolean;
        timeout: number;
        credentials: {
            username: string;
            password: string;
        }
    }

    export interface IErrorResponse { status: number; message: string; details?: any };
}