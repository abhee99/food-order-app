import { useContext } from "react";
import { currencyFormatter } from "../utils/formatting";

import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }
    function handleCheckout() {
        userProgressCtx.showCheckout();
    }
    return <Modal open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null} className="cart">
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map(item => <CartItem key={item.id} onIncrease={() => cartCtx.addItem(item)} onDecrease={() => cartCtx.removeItem(item.id)} name={item.name} price={item.price} quantity={item.quantity} />)}
            {/* optionally we could use {...item}  above instead of setting name, price, quantity*/}

        </ul>
        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
            <Button onClick={handleCloseCart} textOnly>Close</Button>
            {cartCtx.items.length > 0 && <Button onClick={handleCheckout}>Checkout</Button>}
        </p>
    </Modal>;
}