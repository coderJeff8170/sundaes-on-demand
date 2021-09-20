import { render, screen } from "../../test-utils/testing-library-utils";
import { rest } from "msw";
import { server } from "../../mocks/server";
import OrderConfirmation from "./OrderConfirmation";

test("error message should show if something wrong with axios call", async () => {
  //force it to throw an error
  //reset and force handlers to return a server error status
  server.resetHandlers(
    //you must either use a return if you have curly braces, or not, only if you don't use curly braces
    rest.post("http://localhost:3030/order", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const errorAlert = await screen.findByRole("alert");
  expect(errorAlert).toHaveTextContent(
    "An unexpected error occured. Please try again later"
  );
});
