import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext)
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries()); // { email: abc@abc.com }

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    item: cartCtx.items,
                    customer: customerData
                }
            })
        })
    }

    return <Modal open={userProgressCtx.progress === 'checkout'}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
            <Input label="Full Name" id="name" type="text" />
            <Input label="E-Mail Address" id="email" type="email" />
            <Input label="Street" id="street" type="text" />
            <div className="control-row">
                <Input label="Postal Code" id="postal-code" type="text" />
                <Input label="City" id="city" type="text" />
            </div>
            <p className="modal-actions">
                <Button textOnly onClick={handleClose} type="button">Close</Button>
                <Button>Submit Order</Button>
            </p>
        </form>
    </Modal>
}