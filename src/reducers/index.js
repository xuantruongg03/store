import { combineReducers } from 'redux';
import cartReducer from './cart';
import reducerItem from './item';
import Login from './login';
import blogReducer from './blog';

const rootReducer = combineReducers({
    cart: cartReducer,
    item: reducerItem.itemReducer,
    login: Login,
    blog: blogReducer
});
export default rootReducer;
