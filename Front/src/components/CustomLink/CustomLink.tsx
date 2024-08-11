import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface CustomLinkProps {
    to: string;
    children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Check if the current location matches the 'to' prop
    const isActive = location.pathname === to;

    // Handle click event
    const handleClick = () => {
        navigate(to); // Navigate to the specified 'to' location
    };

    // Conditionally render className and data-testid
    const linkProps: {
        className?: string;
        onClick?: () => void;
        'data-testid'?: string;
    } = {};

    if (isActive) {
        linkProps.className = "active-link";
        linkProps['data-testid'] = `active-category-link`;
    }

    return (
        <a
            {...linkProps}
            onClick={handleClick}
            href={to}
        >
            {children}
        </a>
    );
};

export default CustomLink;
