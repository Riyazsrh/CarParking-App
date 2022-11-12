import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Enter_Car from "../Components/Enter_Car";
import Store from "../Redux/Store";




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


const data = [
    {
        id: 1,
        EnterCarNo: "1232",
        carParkingTime: new Date(),
        available: true,
    },
];

const value: any = {
    carSlots: data,
    ids: "",

};


// test("should fireEvent checks here", () => {

//     const { getByPlaceholderText } = render(<Provider store={value}><Enter_Car /></Provider>);
//     const inputCheck: any = getByPlaceholderText("Enter Car no");

//     act(() => {
//         fireEvent.change(inputCheck, {
//             target: { value: "" }
//         });
//     })

//     expect(inputCheck.value).toBe('');
// });



test("Enter car TextField Ckeck ", () => {
    const doc = render(<Enter_Car />)
    const CarinputCheck = doc.getByTestId('Car_Input_Check')
    expect(CarinputCheck).toBeInTheDocument();
})

test("Enter car  FireEvent check", () => {

    const doc = render(<Enter_Car />);
    const textEvent: any = doc.getByPlaceholderText("Enter Car no");
    const button = doc.getByTestId("CarNo_Button_Check")
    fireEvent.change(textEvent, {
        target: { value: "" }
    });
    fireEvent.click(button)
    expect(textEvent.value).toBe('')
})


test("Add Slots button Check", () => {
    render(<Enter_Car />)
    const button = screen.getByTestId("CarNo_Button_Check")

    fireEvent.click(button);
    expect(button).toBeInTheDocument();

})

test("render submit button on the screen", async () => {
    render(<Enter_Car />);
    const buttonList = await screen.findAllByRole("button");

    expect(buttonList).toHaveLength(2);
});


test("checking snapshot", () => {
    const test1 = render(<Enter_Car />);
    expect(test1).toMatchSnapshot();
});

