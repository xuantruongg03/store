import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CompFooter from './components/CompFooter/CompFooter';
import CompHeader from './components/Header/CompHeader.js';
import slug from './Convert/ConvertStringVNtoTitle';
import Cart from './Layout/Cart/Cart';
import Home from './Layout/Home/Home';
import CompProductInfo from './Layout/Infomation/CompProductInfo';
import Login from './Layout/Login/Login';
import Pay from './Layout/Pay/Pay';
import PayComplete from './Layout/PayComplete/PayComplete';
import Products from './Layout/Products/Products';
import Register from './Layout/Register/Register';
import NoPage from './NoPage';
import PrivateRoutes from './PrivateRoutes';

function App() {
    const title = useSelector((state) => state.item.title) || 'title';

    const layout = ({ ...childern }) => {
        return (
            <div>
                <CompHeader />
                {childern}
                <CompFooter />
            </div>
        );
    };
    return (
        <div className="App">
            <Routes>
                <Route path="/" index element={layout(<Home />)}></Route>

                <Route path="/products">
                    <Route path={slug(title)} element={layout(<CompProductInfo />)} />
                </Route>

                <Route element={<PrivateRoutes />}>
                    <Route path="/sale">
                        <Route
                            path={slug('sản phẩm khuyến mãi')}
                            element={Products}
                            subkey="sale"
                            subTitle="Sản phẩm khuyến mãi"
                        />
                    </Route>

                    <Route path="cart" element={layout(<Cart />)} />

                    <Route path="pay" element={layout(<Pay />)} />

                    <Route path="paycomplete" element={layout(<PayComplete />)} />
                </Route>
                
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route path="*" element={<NoPage />} />
            </Routes>
        </div>
    );
}

export default App;
