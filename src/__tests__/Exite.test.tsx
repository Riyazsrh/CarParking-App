import { fireEvent, render } from "@testing-library/react";
import ExitCar from "../Components/ExitCar";




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


jest.mock("axios", () => ({
    post: jest.fn((_url, _body) => {
        console.log(_url, _body)
        return new Promise((resolve) => {
            resolve({
                status: 200,
                data: {
                    nbPages: 2,
                    hits: [{
                        id: '1234',
                        title: "Title",
                        url: "https://httpstat.us/200",
                        created_at: "CreatedAt",
                        author: "Author",
                    }]
                }
            });
        });
    }),
}));





test("Exite page Ckeck ", () => {
    const doc = render(<ExitCar />)
    const CarinputCheck = doc.getByText(/Payment Details/i)
    expect(CarinputCheck).toBeInTheDocument();
})

test("back button Ckeck ", () => {
    const doc = render(<ExitCar />)
    const CarinputCheck = doc.getByTestId('back_btn')

    fireEvent.click(CarinputCheck);
    expect(CarinputCheck).toBeInTheDocument();
})
