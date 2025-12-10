const PaymentView = ({ cart, closePayment }) => {
    return (
         <><h2>Payment</h2>
            <p>name</p>
            <p>email</p>
            <p>adress</p>

            <p>Items</p><ul>
            {cart.map((item, i) => (
                <li key={i}>{item.name}  {item.price}€</li>
            ))}
        </ul>
            
            <p>payment methods</p>

        <button onClick={closePayment}>pay</button>
        <button onClick={closePayment}>back</button>
        </>
    );
};
export default PaymentView