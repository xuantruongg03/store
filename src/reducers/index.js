import { combineReducers } from 'redux';
import cartReducer from './cart';
import reducerItem from './item';
import Login from './login';
import payReducer from './pay';

const rootReducer = combineReducers({
    cart: cartReducer,
    item: reducerItem.itemReducer,
    pay: payReducer,
    login: Login,
});
export default rootReducer;
