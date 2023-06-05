import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Login from "./Login/Login"

jest.mock("axios", () => ({
    __esModule: true,
    default: {
        get: () => (
            {
                data: {id: 1, name: "John"}
            }
        )
    }
}))

test("username input should be rendered", () => { 
    render(<Login />);
    const userInputElement = screen.getByPlaceholderText(/username/i);
    expect(userInputElement).toBeInTheDocument();
})

test("password input should be rendered", () => {
    render(<Login />);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    expect(passwordInputElement).toBeInTheDocument();
})

test("button should be rendered", () => {
    render(<Login />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
})

test("username input element should be empty", () => {
    render(<Login />);
    const userInputElement = screen.getByPlaceholderText(/username/i);
    expect(userInputElement.value).toBe("");
})

test("password input element should be empty", () => {
    render(<Login />);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    expect(passwordInputElement.value).toBe("");
})

test("login button should be disabled", () => {
    render(<Login />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled() ;   
})

test("error message should not be visible", () => {
    render(<Login />);
    const errorElement = screen.getByTestId("error");
    expect(errorElement).not.toBeVisible();
})

test("username input should change", () => {
    render(<Login />);
    const userInputElement = screen.getByPlaceholderText(/username/i);
    const testValue = "test";
    fireEvent.change(userInputElement, {target: {value: testValue}});
    expect(userInputElement.value).toBe(testValue);
})

test("password input should change", () => {
    render(<Login />);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    const testValue = "test";
    fireEvent.change(passwordInputElement, {target: {value: testValue}});
    expect(passwordInputElement.value).toBe(testValue);
})

test("button should not be disbled if input exists", () => {
    render(<Login />);
    const buttonElement = screen.getByRole("button");
    const userInputElement = screen.getByPlaceholderText(/username/i);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    const testValue = "test";

    fireEvent.change(userInputElement, {target: {value: testValue}});
    fireEvent.change(passwordInputElement, {target: {value: testValue}});
    expect(buttonElement).not.toBeDisabled();
})

test("loading should not be rendered", () => {
    render(<Login />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).not.toHaveTextContent(/please wait/i)
})

test("loading should be rendered after clicking", () => {
    render(<Login />);
    const buttonElement = screen.getByRole("button");
    const userInputElement = screen.getByPlaceholderText(/username/i);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    const testValue = "test";
    fireEvent.change(userInputElement, {target: {value : testValue}})
    fireEvent.change(passwordInputElement, {target: {value: testValue}})
    fireEvent.click(buttonElement)
    expect(buttonElement).toHaveTextContent(/please wait/i)
})

test("loading should not be rendered after fetch", async() => {
    render(<Login />);
    const buttonElement = screen.getByRole('button');
    const userInputElement = screen.getByPlaceholderText(/username/i);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    const testValue = "test";
    fireEvent.change(userInputElement, {target: {value: testValue}});
    fireEvent.change(passwordInputElement, {target: {value: testValue}});
    fireEvent.click(buttonElement)
    await waitFor(() => expect(buttonElement).not.toHaveTextContent(/please wait/i));
})

test("username should be rendered", async() => {
    render(<Login />);
    const buttonElement = screen.getByRole('button');
    const userInputElement = screen.getByPlaceholderText(/username/i);
    const passwordInputElement = screen.getByPlaceholderText(/password/i);
    const testValue = "test";
    fireEvent.change(userInputElement, {target: {value: testValue}});
    fireEvent.change(passwordInputElement, {target: {value: testValue}});
    fireEvent.click(buttonElement)
    const userNameElement = await screen.findByText("John");
    expect(userNameElement).toBeInTheDocument();
})