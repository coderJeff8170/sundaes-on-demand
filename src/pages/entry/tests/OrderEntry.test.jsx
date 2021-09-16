import { render, screen, waitFor } from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("handles errors for scoop and toppings routes", async () => {
  //reset and force handlers to return a server error status
  server.resetHandlers(
    //you must either use a return if you have curly braces, or not, only if you don't use curly braces
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  //render the order entry form
  render(<OrderEntry />);

  //   const alerts = await screen.findAllByRole("alert"); //this will not pass because only one server call is awaited
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test.skip("not a real test", () => {});
//testing git
