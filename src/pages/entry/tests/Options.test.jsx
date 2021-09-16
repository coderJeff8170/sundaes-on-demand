import { render, screen } from "../../../test-utils/testing-library-utils";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  //find images
  // const scoopImages = screen.getAllByRole('img', {name: /scoop$/i});
  //muy importante -> when things appear asynchronously on page, you must use await and 'findBy'
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i }); //wow!
  expect(scoopImages).toHaveLength(3);

  //confirm alt text of images
  const altText = scoopImages.map((el) => el.alt);
  expect(altText).toEqual([
    "Chocolate scoop",
    "Vanilla scoop",
    "Strawberry scoop",
  ]);
});

test("displays an image for each toppings option returned from server", async () => {
  //render the component
  render(<Options optionType="toppings" />);
  //get the mapped items
  const toppingOptions = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingOptions).toHaveLength(3);

  const toppingAltText = toppingOptions.map((el) => el.alt);
  //expect that the mapped alt text will show each item
  expect(toppingAltText).toEqual([
    "Cherries topping",
    "Sprinkles topping",
    "Hot fudge topping",
  ]);
});
