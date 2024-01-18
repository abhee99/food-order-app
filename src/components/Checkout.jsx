import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext)
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    function handleClose() {
        userProgressCtx.hideCheckout();
    }
    const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requestConfig)

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries()); // { email: abc@abc.com }
        sendRequest(JSON.stringify({
            order: {
                item: cartCtx.items,
                customer: customerData
            }
        }));
    }

    let actions = (<>
        <Button textOnly onClick={handleClose} type="button">Close</Button>
        <Button>Submit Order</Button>
    </>)
    if (isSending) {
        actions = <span>Sending the Order Data...</span>
    }
    if (data && !error) {
        return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>We will get back to you in a few minutes via an Email</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>OK</Button>
            </p>
        </Modal>
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
            {error && <Error title='Failed to submit the order' message={error}></Error>}
            <p className="modal-actions">{actions}</p>
        </form>
    </Modal>
}