import { combineReducers } from "redux";
import payReducer from "./pay";
import cartReducer from "./cart";
import reducerItem from "./item";

const rootReducer = combineReducers({
    cart: cartReducer,
    item: reducerItem.itemReducer,
    pay: payReducer
  })
export default rootReducer;