import './Navbar.css';
import { BsCart2 } from "react-icons/bs";
import { useState } from 'react';
import CartOverlay from '../CartOverlay/CartOverlay';
import { useCartContext } from '../../context/CartContext';
import CustomLink from '../CustomLink/CustomLink';


const Navbar = () => {
    const { cartCount } = useCartContext(); // Destructure cartCount from the context
    const [cartOpen, setCartOpen] = useState(false); // State to manage cart overlay

    const toggleCart = () => {
        console.log('Cart is now:', cartOpen ? 'open' : 'closed');
        setCartOpen(!cartOpen);
    };

    return (
        <header>
            <div className="header-items">
                <nav>
                    <ul>
                        <li key="all" data-testid='category-link'>
                            <CustomLink to="/all">All</CustomLink>
                        </li>
                        <li key="clothes" data-testid='category-link'>
                            <CustomLink to="/clothes">Clothes</CustomLink>
                        </li>
                        <li key="tech" data-testid='category-link'>
                            <CustomLink to="/tech">Tech</CustomLink>
                        </li>
                    </ul>
                </nav>
                <div className="cart-icon" data-testid='cart-btn' onClick={toggleCart}>
                    <span><BsCart2 size={30} /></span>
                    {cartCount > 0 && <span className="cart-badge" data-testid="cart-count-bubble">{cartCount}</span>}
                </div>
                <CartOverlay isOpen={cartOpen} onClose={toggleCart} />
            </div>
        </header>
    )
}

export default Navbar;
