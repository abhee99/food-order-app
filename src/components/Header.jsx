import logoImg from '../assets/logo.jpg'
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import Button from './UI/Button';
import { useContext } from 'react';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0)
    function handleShowCart() {
        userProgressCtx.showCart();
    }
    return <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="A restaurant" />
            <h1>React Food</h1>
        </div>
        <nav>
            <Button onClick={handleShowCart} textOnly>Cart({totalCartItems})</Button>
        </nav>
    </header>;
}