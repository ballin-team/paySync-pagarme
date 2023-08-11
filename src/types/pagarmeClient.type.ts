export namespace PagarmeClientI {
    export interface IInput {
        testEnv: boolean;
        timeout: number;
        credentials: {
            username: string;
            password: string;
        }
    }
}
