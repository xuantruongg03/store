import { Route, Routes, useParams } from 'react-router-dom';

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
import NoPage from './NoPage';

function App() {
    const title = useSelector((state) => state.item.title);
    const { string } = useParams();
    return (
        <div className="App">
            <CompHeader />
            <Routes>
                <Route path="/" index element={<Home />} />

                <Route
                    path={slug('sản phẩm khuyến mãi')}
                    element={
                        <div style={{ marginTop: '10px' }}>
                            <Products subkey="sale" subTitle="Sản phẩm khuyến mãi" />
                        </div>
                    }
                />
                <Route
                    path={':string/' + slug(title)}
                    element={<CompProductInfo to={`${slug('sản phẩm khuyến mãi')}/${slug(title)}`} />}
                />
                <Route path="cart" element={<Cart />} />

                <Route path="pay" element={<Pay />} />

                <Route path="paycomplete" element={<PayComplete />} />

                <Route path="*" element={<NoPage />} />
            </Routes>

            <CompFooter className="disabled" />
        </div>
    );
}

export default App;
