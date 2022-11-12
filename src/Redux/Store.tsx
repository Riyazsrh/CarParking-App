import { createStore } from "redux"
import handleReducer from "./Reducer"

const Store = createStore(handleReducer);


export default Store;
