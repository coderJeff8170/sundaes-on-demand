import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../options";
import OrderEntry from "../OrderEntry";

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

test("toppings subtotal updates when toppings change", async () => {
  //Cherries, Sprinkles, and Hot fudge
  //render the component
  render(<Options optionType="toppings" />);
  //find subtotal for toppings
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  //assert on default toppings subtotal
  //   expect(toppingsSubtotal).toHaveTextContent("0.00");
  //find and check one box
  const sprinklesCheckbox = await screen.findByRole("checkbox", {
    name: "Sprinkles",
  });
  expect(sprinklesCheckbox).toBeInTheDocument();
  userEvent.click(sprinklesCheckbox);
  expect(sprinklesCheckbox).toBeChecked();
  //assert on updated subtotal
  expect(toppingsSubtotal).toHaveTextContent("1.50");
  //find another box and check
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);
  //assert on subtotal
  expect(toppingsSubtotal).toHaveTextContent("3.00");
  //uncheck a box
  userEvent.click(cherriesCheckbox);
  //assert on updated subtotal
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total tests", () => {
  //   test.only("grand total starts at $0.00", async () => {
  //     render(<OrderEntry />);
  //     //get grand total element
  //     const grandTotal = await screen.findByRole("heading", {
  //       name: /grand total: \$/i,
  //     });
  //     // expect(grandTotal).toBeInTheDocument();
  //     expect(grandTotal).toHaveTextContent("$0.00");
  //   }); //aparently, if there is other stuff being rendered by default (options), and it's not awaited, you'll get the dreaded memory leak error
  test("grand total updates properly if scoop is updated first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    //check grand total
    expect(grandTotal).toHaveTextContent("0.00");

    //grab a scoop and update
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    //grab a topping and update
    const cherryTopping = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherryTopping);
    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    //select a topping and click
    const sprinklesCheckbox = await screen.findByRole("checkbox", {
      name: "Sprinkles",
    });
    userEvent.click(sprinklesCheckbox);
    //select a scoop and add a number 2
    const strawberryScoop = await screen.findByRole("spinbutton", {
      name: "Strawberry",
    });
    userEvent.clear(strawberryScoop);
    userEvent.type(strawberryScoop, "2");

    //verify the 5.50
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if an item is removed", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const sprinklesCheckbox = await screen.findByRole("checkbox", {
      name: "Sprinkles",
    });
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.click(sprinklesCheckbox);
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
    userEvent.type(chocolateInput, "0");
    expect(grandTotal).toHaveTextContent("1.50");
  });
});
