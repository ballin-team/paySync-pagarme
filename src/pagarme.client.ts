import {PagarmeClientI} from "./types/pagarmeClient.type";
import {PagarmeAddresses} from "./pagarme.addresses";
import {PagarmeCard} from "./pagarme.card";
import {PagarmeCustomer} from "./pagarme.customer";
import {PagarmeOrder} from "./pagarme.order";


export class PagarmeClient {
    private config: PagarmeClientI.IInput;
    public address: PagarmeAddresses;
    public card: PagarmeCard;
    public customer: PagarmeCustomer;
    public order: PagarmeOrder;
    constructor(input: PagarmeClientI.IInput) {
        this.config = input;
        this.address = new PagarmeAddresses({ ...input });
        this.card = new PagarmeCard({ ...input });
        this.customer = new PagarmeCustomer({ ...input });
        this.order = new PagarmeOrder({ ...input });
    }
}