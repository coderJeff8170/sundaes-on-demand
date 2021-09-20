import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderEntry({setOrderPhase}) {
  const [orderDetails] = useOrderDetails();
  const handleClick = () => {
    setOrderPhase('review');
  }
  return (
    <div>
      <Options optionType="scoops"></Options>
      <Options optionType="toppings"></Options>
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <button onClick={handleClick} disabled={orderDetails.totals.scoops ==='$0.00'}>Order Sundae!</button>
    </div>
  );
}
