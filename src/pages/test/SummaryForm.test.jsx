import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../summary/SummaryForm";

const noIceCreamRegex = /No ice cream will actually be delivered/i;

test("initial conditions", () => {
  //render summary form
  render(<SummaryForm />);
  //grab checkbox and button
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  //checkbox is unchecked by default
  expect(checkbox).not.toBeChecked();
});

test("Checkbox enables button on first click and disables on second", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: /confirm order/i });

  //check checkbox-is button enabled?
  userEvent.click(checkbox);
  expect(button).toBeEnabled();
  //uncheck checkbox-ensure button is disabled
  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);
  //popover starts out hidden
  const nullPopover = screen.queryByText(noIceCreamRegex);
  expect(nullPopover).not.toBeInTheDocument();
  //popover appears on mouseover of checkbox label
  const termsAndConditionsLabel = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditionsLabel);
  const popover = screen.getByText(noIceCreamRegex);
  expect(popover).toBeInTheDocument(); //this is essentially the same as the line above
  //popover disappears when we mouse out
  userEvent.unhover(termsAndConditionsLabel);
  //looks like one must grab the element(or lack thereof) after each user action
//   const nullPopoverAgain = screen.queryByText(noIceCreamRegex); handled by next line automagically
  await waitForElementToBeRemoved(screen.queryByText(noIceCreamRegex));
//   expect(nullPopoverAgain).not.toBeInTheDocument(); this line happens after test, so we need to wait for the element to be removed from dom befor the assertion async/await
});
