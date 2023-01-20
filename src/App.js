import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CompFooter from './components/CompFooter/CompFooter';
import CompHeader from './components/Header/CompHeader.js';
import slug from './Convert/ConvertStringVNtoTitle';
import Cart from './Layout/Cart/Cart';
import Home from './Layout/Home/Home';
import CompProductInfo from './Layout/Infomation/CompProductInfo';
import Pay from './Layout/Pay/Pay';
import PayComplete from './Layout/PayComplete/PayComplete';
import Products from './Layout/Products/Products';
import NoPage from './NoPage';

function App() {
    const title = useSelector((state) => state.item.title) || 'title';
    
    return (
        <div className="App">
            <CompHeader />
            <Routes>
                <Route path="/" index element={<Home />}></Route>

                <Route path="/sale">
                    <Route path={slug('sản phẩm khuyến mãi')} element={Products} subkey="sale" subTitle="Sản phẩm khuyến mãi"/>
                </Route>

                <Route path="/products">
                    <Route path={slug(title)} element={<CompProductInfo />} />
                </Route>

                <Route path="cart" element={<Cart />} />

                <Route path="pay" element={<Pay />} />

                <Route path="paycomplete" element={<PayComplete />} />

                <Route path="*" element={<NoPage />} />
            </Routes>

            <CompFooter />
        </div>
    );
}

export default App;
