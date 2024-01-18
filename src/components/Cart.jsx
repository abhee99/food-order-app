import { useContext } from "react";
import { currencyFormatter } from "../utils/formatting";

import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    function handleCloseModal() {
        userProgressCtx.hideCart();
    }
    return <Modal open={userProgressCtx.progress === 'cart'} className="cart">
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map(item => <li key={item.id}>{item.name} - {item.quantity}</li>)}
        </ul>
        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
            <Button onClick={handleCloseModal} textOnly>Close</Button>
            <Button>Checkout</Button>
        </p>
    </Modal>;
}