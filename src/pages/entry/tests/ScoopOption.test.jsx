import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption"


test('Scoop field should show red when invalid input is entered', () => {
    //render with all props, but passed function needs mocked
    render(<ScoopOption name="" imagePath="" updateItemCount={jest.fn()}/>);
    //find a spin button input
    const inputField = screen.getByRole('spinbutton');//there is only one of these
    //enter an invalid number
    userEvent.clear(inputField);
    userEvent.type(inputField, "-1");
    //ensure that it has the class denoting it invalid
    expect(inputField).toHaveClass('is-invalid');

    userEvent.clear(inputField);
    userEvent.type(inputField, "11");
    expect(inputField).toHaveClass('is-invalid');

    userEvent.clear(inputField);
    userEvent.type(inputField, "3.5");
    expect(inputField).toHaveClass('is-invalid');

    userEvent.clear(inputField);
    userEvent.type(inputField, "1");
    expect(inputField).not.toHaveClass('is-invalid');

})