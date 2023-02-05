import { combineReducers } from 'redux';
import cartReducer from './cart';
import reducerItem from './item';
import Login from './login';

const rootReducer = combineReducers({
    cart: cartReducer,
    item: reducerItem.itemReducer,
    login: Login,
});
export default rootReducer;
