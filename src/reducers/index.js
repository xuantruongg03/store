import { combineReducers } from "redux";
import payReducer from "./pay";
import cartReducer from "./cart";
import itemReducer from "./item";

const rootReducer = combineReducers({
    cart: cartReducer,
    item: itemReducer,
    pay: payReducer
  })
export default rootReducer;