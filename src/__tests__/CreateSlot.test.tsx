import { fireEvent, render, screen } from "@testing-library/react"
import Create_Slots from "../Components/Create_Slots"
import renderer from "react-test-renderer";



const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}));


const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));


test("rendering the whole first page ", () => {
  const doc = render(<Create_Slots />)
  const docc = doc.getByText(/Create Slots/i)
  expect(docc).toBeInTheDocument();
})



test("Create slots TextField Ckeck ", () => {
  const doc = render(<Create_Slots />)
  const inputCheck = doc.getByTestId('Slot_Input_Check')
  expect(inputCheck).toBeInTheDocument();

})


test("should fireEvent check", () => {
  const { getByPlaceholderText } = render(<Create_Slots />);
  const inputCheck: any = getByPlaceholderText("Create Slots");
  const button = screen.getByTestId("Slot_Button_Check")

  fireEvent.change(inputCheck, {
    target: { value: "4" }
  });
  fireEvent.click(button)
  expect(inputCheck.value).toBe('4');
  
});


test("Add CarNo button Check", () => {
  render(<Create_Slots />)
  const button = screen.getByTestId("Slot_Button_Check")

  fireEvent.click(button);
  expect(button).toBeInTheDocument();
})


