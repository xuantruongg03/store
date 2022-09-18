import { Route, Routes } from 'react-router-dom';

import './App.css';
import slug from './Convert/ConvertStringVNtoTitle';

import { useSelector } from 'react-redux';
import CompFooter from './components/CompFooter/CompFooter';
import CompHeader from './components/Header/CompHeader.js';
import Cart from './Layout/Cart/Cart';
import Home from './Layout/Home/Home';
import CompProductInfo from './Layout/Infomation/CompProductInfo';
import Pay from './Layout/Pay/Pay';
import PayComplete from './Layout/PayComplete/PayComplete';
import Products from './Layout/Products/Products';
// import NoPage from './NoPage';
import { useEffect, useState } from 'react';

function App() {
    const state = useSelector((state) => state.item);
    const [title, setTitle] = useState('');
    useEffect(() => {
        if (title === null || title === undefined || title === '') {
            setTitle(state.title);
            // setTitle(localStorage.getItem('store-title'));
        } else {
            setTitle(state.title);
        }
    }, [state.title]);
    return (
        <div className="App">
            <CompHeader />
            <Routes>
                <Route path="/store" index element={<Home />}></Route>
                <Route
                    path={slug('sản phẩm khuyến mãi')}
                    element={
                        <div style={{ marginTop: '10px' }}>
                            <Products subkey="sale" subTitle="Sản phẩm khuyến mãi" />
                        </div>
                    }
                />

                <Route path={slug(title)} element={<CompProductInfo />} />
                <Route path="cart" element={<Cart />} />

                <Route path="pay" element={<Pay />} />

                <Route path="paycomplete" element={<PayComplete />} />

                {/* <Route path="*" element={<NoPage />} /> */}
            </Routes>

            <CompFooter />
        </div>
    );
}

export default App;
