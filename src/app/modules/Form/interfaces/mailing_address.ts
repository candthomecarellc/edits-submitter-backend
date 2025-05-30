import { Name } from "./name";
import { Address } from "./address";

export interface MailingAddress {
    associateName: Name;
    inCareOf: Name;
    address: Address;
    accessRight: number;
}