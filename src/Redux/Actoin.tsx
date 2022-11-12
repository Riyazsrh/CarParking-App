
export const HANDLE_ID = 'HANDLE_ID';          //action-type
export const HANDLE_Text_ID = 'HANDLE_Text_ID';


export const handleId = (type: any, payload: any) => {          //Main  Action
    return {
        type: type,
        payload: payload,
    }
}

export const handleTextId = (type: any, payload: any) => {          //Main  Action
    return {
        type: type,
        payload: payload,
    }
}