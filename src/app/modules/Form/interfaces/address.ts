import { Phone } from "./phone";

export interface Address {
    apartment: number;
    house: number;
    street: string;
    state: string;
    city: string;
    county: string;
    zip: number;
    phone: Phone;
}