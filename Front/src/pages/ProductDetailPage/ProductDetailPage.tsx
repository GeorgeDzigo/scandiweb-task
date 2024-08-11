import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import './ProductDetailPage.css';
import { BsCart2 } from 'react-icons/bs';
import { PRODUCTS_BY_ID_QUERY } from "../../queries/Queries.ts";
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import ProductAttributes from '../../components/ProductAttributes/ProductAttributes';
import { parseDescription } from '../../utils/parseDescription.ts';
import { convertChildNodesToReactNodes } from '../../utils/convertChildNodesToReactNodes.tsx';
import { addToCart } from '../../utils/CartUtil.ts';
import { useCartContext } from '../../context/CartContext.tsx';
import { SelectedAttribute } from '../../types/CartItem.ts';

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const { loading, error, data } = useQuery(PRODUCTS_BY_ID_QUERY, {
        variables: { id: productId },
    });
    const { cartItems, setCartItems } = useCartContext();
    const [selectedAttributes, setSelectedAttributes] = useState<SelectedAttribute[]>([]);

    useEffect(() => {
        console.log("Updated cart items:", cartItems);
    }, [cartItems]);

    if (loading) return <div className="loading-icon"></div>; // Display spinner
    if (error) return <p>Error: {error.message}</p>;

    const product = data.product;

    // Check if all attributes are selected
    const allAttributesSelected = () => {
        const uniqueAttributeNames = Array.from(new Set(product.attributes.map((attr: { name: any; }) => attr.name)));
        const selectedAttributeNames = Array.from(new Set(selectedAttributes.map(attr => attr.name)));
        return uniqueAttributeNames.length === selectedAttributeNames.length;
    };

    const handleAddToCart = () => {
        addToCart(product, cartItems, setCartItems, selectedAttributes);
    };

    return (
        <div className="product-detail-page">
            <ImageGallery images={product.images} data-testid="product-gallery" />
            <div className="product-details">
                <h1>{product.name}</h1>
                <ProductAttributes attributes={product.attributes} setSelectedAttributes={setSelectedAttributes} />
                <h3>PRICE:</h3>
                <p className="product-price-detail">${product.prices[0].amount.toFixed(2)}</p>
                {product.in_stock && <button
                    className={`add-to-cart-button-detail ${!allAttributesSelected() ? 'disabled' : ''}`}
                    onClick={handleAddToCart}
                    disabled={!allAttributesSelected()}
                    data-testid="add-to-cart"
                >
                    <BsCart2 size={20} />
                    ADD TO CART
                </button>}
                <div className="product-description" data-testid="product-description">
                    {convertChildNodesToReactNodes(parseDescription(product.description))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
