
import { HANDLE_ID,HANDLE_Text_ID } from "./Actoin";

const initialState = {
    carSlots: [],
    id:[]
   
   
}

const handleReducer = (state = initialState, action: any) => {

    switch (action.type) {
        case HANDLE_ID:
            return {
                ...state,
                carSlots: action.payload,
            }
            
        case HANDLE_Text_ID:
            return {
                ...state,
                id: action.payload,
            }
        default:
            return state;
    }
}

export default handleReducer