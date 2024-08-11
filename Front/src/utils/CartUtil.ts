import { CartItem, SelectedAttribute } from "../types/CartItem";

interface Product {
    id: string;
    name: string;
    images: { id: string; url: string }[];
    prices: { id: string; amount: number; currency: string }[];
    in_stock: boolean;
    attributes: { id: string; name: string; value: string; displayValue: string }[];
}

export function addToCart(
    product: Product,
    cartItems: CartItem[],
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>,
    selectedAttributes?: SelectedAttribute[]
): void {
    const attributesToUse = selectedAttributes ? getSelectedAttributes(product.attributes, selectedAttributes) : getFirstAttributes(product.attributes);

    const identifierParts = [product.id];
    attributesToUse.forEach(attr => {
        if (attr.selected) {
            identifierParts.push(`${attr.name}:${attr.value}`);
        }
    });
    const identifier = identifierParts.join('|');

    const existingItem = cartItems.find(item => item.id === identifier);

    if (existingItem) {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === identifier) {
                return { ...item, quantity: item.quantity + 1, totalPrice: item.price * (item.quantity + 1) };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    } else {
        let newCartItem: CartItem = {
            id: identifier,
            name: product.name,
            quantity: 1,
            price: product.prices[0]?.amount || 0,
            totalPrice: product.prices[0]?.amount || 0,
            attributes: attributesToUse,
            image: product.images[0]?.url
        };

        setCartItems([...cartItems, newCartItem]);
    }
}

export function getSelectedAttributes(
    attributes: { id: string; name: string; value: string; displayValue: string }[],
    selectedAttributes: { id: string; name: string; value: string; displayValue: string }[]
): SelectedAttribute[] {
    return attributes.map(attr => {
        const selected = selectedAttributes.some(selectedAttr => selectedAttr.name === attr.name && selectedAttr.value === attr.value);
        return { ...attr, selected };
    });
}

export function getFirstAttributes(
    attributes: { id: string; name: string; value: string; displayValue: string }[]
): SelectedAttribute[] {
    const firstAttributes: SelectedAttribute[] = [];
    const attributeTypes = new Set<string>();

    attributes.forEach(attr => {
        if (!attributeTypes.has(attr.name)) {
            firstAttributes.push({ ...attr, selected: true });
            attributeTypes.add(attr.name);
        } else {
            firstAttributes.push({ ...attr, selected: false });
        }
    });
    return firstAttributes;
}

export function updateCartItemQuantity(cartItems: CartItem[], itemId: string, quantityDelta: number): CartItem[] {
    return cartItems.map(item => {
        if (item.id === itemId) {
            const newQuantity = item.quantity + quantityDelta;
            const newTotalPrice = item.price * newQuantity;
            // Automatically remove item if quantity is decremented to zero
            if (newQuantity <= 0) {
                return { ...item, quantity: 0 };
            }
            return { ...item, quantity: newQuantity, totalPrice: newTotalPrice };
        }
        return item;
    }).filter(item => item.quantity > 0); // Remove items with quantity zero
}

export function removeCartItem(cartItems: CartItem[], itemId: string): CartItem[] {
    return cartItems.filter(item => item.id !== itemId);
}