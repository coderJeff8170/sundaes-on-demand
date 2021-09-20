import { useOrderDetails } from "../../contexts/OrderDetails";
import SummaryForm from "./SummaryForm";
export default function OrderSummary({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  //cannot map over an object, so you must first create an array from it.
  const scoopArray = Array.from(orderDetails.scoops.entries());
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasToppings = orderDetails.toppings.size > 0;
  let toppingDisplay = null;
  if (hasToppings) {
    const toppingArray = Array.from(orderDetails.toppings.keys());
    const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);
    toppingDisplay = (
      <>
        <h2>Toppings: {orderDetails.totals.toppings}</h2>
        <ul>{toppingList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {toppingDisplay}
      <h2>Total: {orderDetails.totals.grandTotal}</h2>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}
