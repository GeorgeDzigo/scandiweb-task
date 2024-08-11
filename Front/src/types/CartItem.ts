export interface SelectedAttribute {
    id: string;
    name: string;
    value: string;
    displayValue: string;
    selected: boolean;
}

export interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    attributes: SelectedAttribute[];
    image: string;
    totalPrice: number;
}

export interface Attribute {
    id: string;
    name: string;
    value: string;
    displayValue: string;
}