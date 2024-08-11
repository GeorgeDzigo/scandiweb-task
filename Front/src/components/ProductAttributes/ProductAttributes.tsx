import React, { useEffect, useState } from 'react';
import './ProductAttributes.css';
import { Attribute, SelectedAttribute } from '../../types/CartItem';

interface ProductAttributesProps {
    attributes: Attribute[];
    setSelectedAttributes: React.Dispatch<React.SetStateAction<SelectedAttribute[]>>;
}

const ProductAttributes: React.FC<ProductAttributesProps> = ({ attributes, setSelectedAttributes }) => {
    const [selectedAttributes, setSelectedAttributesState] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const selected = attributes.map(attr => ({
            id: attr.id,
            name: attr.name,
            value: selectedAttributes[attr.name] || '',
            displayValue: attr.displayValue,
            selected: selectedAttributes[attr.name] === attr.value
        })).filter(attr => attr.value !== '');
        setSelectedAttributes(selected);
    }, [selectedAttributes, attributes, setSelectedAttributes]);

    const handleAttributeSelect = (name: string, value: string) => {
        setSelectedAttributesState({ ...selectedAttributes, [name]: value });
    };

    const uniqueAttributeNames = Array.from(new Set(attributes.map(attr => attr.name)));

    return (
        <div className="product-attributes">
            {uniqueAttributeNames.map((name, index) => {
                const attributeValues = attributes.filter(attr => attr.name === name);
                const kebabCaseName = name.toLowerCase().split(' ').join('-');

                return (
                    <div key={index} className="attribute-selector" data-testid={`product-attribute-${kebabCaseName}`}>
                        <span>{name.toUpperCase()}:</span>
                        {name.toLowerCase() === 'color' ? (
                            <div className="color-swatches">
                                {attributeValues.map((attr, idx) => (
                                    <button
                                        key={idx}
                                        style={{ backgroundColor: attr.value }}
                                        className={selectedAttributes[name] === attr.value ? 'color-button selected' : 'color-button'}
                                        onClick={() => handleAttributeSelect(name, attr.value)}
                                        data-testid={`product-attribute-${kebabCaseName}-${attr.displayValue}`}
                                    />
                                ))}
                            </div>
                        ) : (
                            attributeValues.map((attr, idx) => (
                                <button
                                    key={idx}
                                    className={selectedAttributes[name] === attr.value ? 'attribute-button selected' : 'attribute-button'}
                                    onClick={() => handleAttributeSelect(name, attr.value)}
                                    data-testid={`product-attribute-${kebabCaseName}-${attr.displayValue}`}
                                >
                                    {attr.displayValue}
                                </button>
                            ))
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ProductAttributes;