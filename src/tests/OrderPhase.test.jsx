import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test.only("order phases for happy path", async () => {
  //render app
  render(<App />);
  //add scoops and toppings
  const strawberryInput = await screen.findByRole("spinbutton", {
    name: "Strawberry",
  });
  const sprinklesCheckbox = await screen.findByRole("checkbox", {
    name: "Sprinkles",
  });
  const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/i });
  userEvent.clear(strawberryInput);
  userEvent.type(strawberryInput, "2");
  userEvent.click(sprinklesCheckbox);
  expect(grandTotal).toHaveTextContent("5.50");
  //find and click order button
  const orderButton = screen.getByRole("button", { name: "Order Sundae!" });
  //   expect(orderButton).toBeInTheDocument();
  userEvent.click(orderButton);
  //check summary information base on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();
  const orderSummaryTotal = await screen.findByText("Total: $", {
    exact: false,
  });
  expect(orderSummaryTotal).toHaveTextContent("$5.50");
  //accept terms and conditions and click order button
  const termsAndConditionsCheckbox = await screen.findByRole("checkbox", {
    name: /I agree to/i,
  });
  const confirmationButton = await screen.findByRole("button", {
    name: /Confirm order/i,
  });
  userEvent.click(termsAndConditionsCheckbox);
  userEvent.click(confirmationButton);
  //confirm order number on confirmation page
  const orderNumber = await screen.findByText("Your order number is", {
    exact: false,
  });
  expect(orderNumber).toHaveTextContent("7648175377");
  //click 'new order button on confirmation page
  const newOrderButton = await screen.findByRole("button", {
    name: /Create new order/i,
  });
  userEvent.click(newOrderButton);
  //check that scoops and toppings subtotals have been reset
  const scoopsTotal = await screen.findByText("Scoops total: $", {
    exact: false,
  });
  const toppingsTotal = await screen.findByText("Toppings total: $", {
    exact: false,
  });

  expect(scoopsTotal).toHaveTextContent("0.00");
  expect(toppingsTotal).toHaveTextContent("0.00");
  //do we need to await anything to avoid test errors? Yes!
  await screen.findByRole('spinbutton', {name: 'Vanilla'});
  await screen.findByRole('checkbox', {name: 'Cherries'});
  //^^ do this so that async items don't render after test is over!!!
});
