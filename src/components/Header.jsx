import logoImg from '../assets/logo.jpg'
import CartContext from '../store/CartContext';
import Button from './UI/Button';
import { useContext } from 'react';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item)=> {
        return totalNumberOfItems+item.quantity;
    },0)
    return <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="A restaurant" />
            <h1>React Food</h1>
        </div>
        <nav>
            <Button textOnly>Cart({totalCartItems})</Button>
        </nav>
    </header>;
}