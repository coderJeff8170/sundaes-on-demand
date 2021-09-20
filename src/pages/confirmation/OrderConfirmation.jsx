import axios from "axios";
import { useState, useEffect } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderConfirmation({ setOrderPhase }) {
  const [, , resetOrder] = useOrderDetails(); //extract the resetOrder function from context
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((res) => setOrderNumber(res.data.orderNumber))
      .catch((error) => console.log(error));
  }, []);
  const handleClick = () => {
    resetOrder();
    setOrderPhase("inProgress"); //send back to reg order page
  };
  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank You!</h1>
        <h2>Your order number is {orderNumber}</h2>
        <p>as per our Terms and conditions, nothing will happen now</p>
        <button onClick={handleClick}>Create new order</button>
      </div>
    );
  } else {
    return <div>...Loading</div>;
  }
  //   return <div>{orderNumber ? orderNumber : "...Loading"}</div>;
}
