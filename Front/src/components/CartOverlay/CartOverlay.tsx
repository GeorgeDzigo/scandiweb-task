import React from 'react';
import './CartOverlay.css'; // Import CSS for CartOverlay styling
import { useCartContext } from '../../context/CartContext';
import { updateCartItemQuantity, removeCartItem } from '../../utils/CartUtil'; // Import the utility functions
import { CartItem } from '../../types/CartItem';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER_MUTATION } from '../../queries/Queries';

interface CartOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ isOpen, onClose }) => {
    const { cartCount, cartItems, setCartItems } = useCartContext();
    const [createOrder] = useMutation(CREATE_ORDER_MUTATION);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        // Prevent closing when clicking inside the cart content
        event.stopPropagation();
    };

    const handleIncrement = (itemId: string) => {
        const updatedCartItems = updateCartItemQuantity(cartItems, itemId, 1);
        setCartItems(updatedCartItems);
    };

    const handleDecrement = (itemId: string) => {
        const updatedCartItems = updateCartItemQuantity(cartItems, itemId, -1);
        setCartItems(updatedCartItems);
    };

    const handleRemove = (itemId: string) => {
        const updatedCartItems = removeCartItem(cartItems, itemId);
        setCartItems(updatedCartItems);
    };

    const handleCheckout = async () => {
        try {
            const successfulOrderIds: string[] = [];

            // Loop through cart items to create orders
            for (const item of cartItems) {
                // Split productId by '|' and take the first part as productId
                const productId = item.id.split('|')[0].trim();
                const { quantity } = item;
                // Filter attributes to send only selected ones
                const selectedAttributes = item.attributes
                    .filter(attr => attr.selected)
                    .map(attr => ({
                        id: attr.id,
                        name: attr.name,
                        value: attr.value,
                        displayValue: attr.displayValue // Ensure displayValue is included
                    }));

                const attributes = JSON.stringify(selectedAttributes); // Convert attributes to string for mutation

                // Send order creation mutation and await response
                const { data } = await createOrder({ variables: { productId, quantity, attributes } });

                // Check if order creation was successful
                if (data?.createOrder?.success) {
                    successfulOrderIds.push(item.id); // Store successful order id
                } else {
                    throw new Error(`Failed to create order for item ${item.id}: ${data?.createOrder?.message}`);
                }
            }

            // Filter out successfully placed orders from cartItems and update state
            const updatedCartItems = cartItems.filter(item => !successfulOrderIds.includes(item.id));
            setCartItems(updatedCartItems);
        } catch (error) {
            console.error('Failed to checkout:', error);
            // Handle error (e.g., display error message to the user)
        }
    };

    const renderAttributes = (item: CartItem) => {
        const attributesMap = new Map<string, string[]>(); // Map to store attributes by name

        // Group attributes by name
        item.attributes.forEach(attr => {
            const attributeName = attr.name.toLowerCase();
            const attributeValue = attr.value;

            if (attributesMap.has(attributeName)) {
                attributesMap.get(attributeName)!.push(attributeValue);
            } else {
                attributesMap.set(attributeName, [attributeValue]);
            }
        });

        return (
            <div className="item-attributes">
                {Array.from(attributesMap.entries()).map(([name], index) => (
                    <div key={`${name}-${index}`} data-testid={`cart-item-attribute-${name.split(" ").join("-")}`}>
                        <span className="attribute-name">{name === 'color' ? 'Color' : name}: </span>
                        {name === 'color' ? (
                            item.attributes
                                .filter(attr => attr.name.toLowerCase() === name)
                                .map((attr, idx) => (
                                    <span
                                        key={`${name}-${idx}`}
                                        style={{ backgroundColor: attr.value }}
                                        className={`color-attribute ${attr.selected ? 'selected' : ''}`}
                                        data-testid={`${attr.selected ? `cart-item-attribute-${name.split(" ").join("-")}-${attr.displayValue}-selected` :
                                            `cart-item-attribute-${name.split(" ").join("-")}-${name.split(" ").join("-")}`}`}

                                    ></span>
                                ))
                        ) : (
                            item.attributes
                                .filter(attr => attr.name.toLowerCase() === name)
                                .map((attr, idx) => (
                                    <span
                                        key={`${name}-${idx}`}
                                        className={`attribute-value-box ${attr.selected ? 'selected-attribute-value-box' : ''}`}
                                        data-testid={`${attr.selected ? `cart-item-attribute-${name.split(" ").join("-")}-${attr.displayValue}-selected` :
                                            `cart-item-attribute-${name.split(" ").join("-")}-${name.split(" ").join("-")}`}`}
                                    >
                                        {attr.value}
                                    </span>
                                ))
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            {isOpen && (
                <div className="overlay-bg" onClick={onClose}>
                    <div className="cart-overlay" data-testid='cart-overlay' onClick={handleClick}>
                        <div className="cart-overlay-content">
                            <span className="close-btn" onClick={onClose}>&times;</span>
                            <p><span className='main-bag-text'>My Bag</span>, <span className='amount-indicator' data-testid='cart-total'>{cartCount} {cartCount === 1 ? 'item' : 'items'}</span></p>
                            <ul className="cart-items">
                                {cartItems.map(item => (
                                    <li key={item.id}>
                                        <div className="item-info">
                                            <div className="item-details">
                                                <h4>{item.name}</h4>
                                                <p>$ {item.totalPrice.toFixed(2)}</p> {/* Display totalPrice */}
                                                {renderAttributes(item)}
                                                <p data-testid='cart-item-amount'>Quantity: {item.quantity}</p>
                                                <div className="quantity-btns">
                                                    <button className="quantity-btn" data-testid='cart-item-amount-increase' onClick={() => handleIncrement(item.id)}>+</button>
                                                    <button className="quantity-btn" data-testid='cart-item-amount-decrease' onClick={() => handleDecrement(item.id)}>-</button>
                                                    <button className="quantity-btn" onClick={() => handleRemove(item.id)}>Remove</button>

                                                </div>
                                            </div>
                                            <div className="item-image">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <p className="total-price">Total: ${cartItems.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2)}</p>
                            <button
                                className={`checkout-btn ${cartCount === 0 ? 'disabled' : ''}`}
                                disabled={cartCount === 0}
                                onClick={handleCheckout} // Trigger handleCheckout function on button click

                            >
                                PLACE ORDER
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartOverlay;