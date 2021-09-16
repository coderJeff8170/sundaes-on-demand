import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../options";

test("subtotal updates when the checked scoop options change", async () => {
  render(<Options optionType="scoops" />);

  //make sure total starts out at 0.00 - partial match needs the exact option to be false when matching a string
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  //update vanilla scoops to 1 and check the subtotal - will not populate until options come from server so will be async
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  //here, it is best to clear the element and then mock typing into input
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1"); //must be string
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  //update chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00"); //this is 6 because we cleared the INPUT, not the subtotal
});
