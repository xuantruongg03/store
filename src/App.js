import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CompFooter from './components/CompFooter/CompFooter';
import CompHeader from './components/Header/CompHeader.js';
import slug from './Convert/ConvertStringVNtoTitle';
import Account from './Layout/Account/Account';
import Booking from './Layout/Booking/Booking';
import BookingComplete from './Layout/Booking/BookingComplete';
import Cart from './Layout/Cart/Cart';
import Home from './Layout/Home/Home';
import CompProductInfo from './Layout/Infomation/CompProductInfo';
import Login from './Layout/Login/Login';
import Pay from './Layout/Pay/Pay';
import PayComplete from './Layout/PayComplete/PayComplete';
import Products from './Layout/Products/Products';
import ProductsSale from './Layout/Products/ProductsSale';
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

                <Route path="/new" element={layout(<Products subTitle="Sản phẩm mới" subkey="new" />)} />

                <Route path="/laptop" element={layout(<Products subTitle="Máy tính xách tay" subkey="laptop" />)} />

                <Route path="/pc" element={layout(<Products subTitle="Máy tính để bàn" subkey="pc" />)} />

                <Route
                    path="/accessories"
                    element={layout(<Products subTitle="Phụ kiện máy tính" subkey="accessory" />)}
                />

                <Route path="/monitor" element={layout(<Products subTitle="Màn hình máy tính" subkey="monitor" />)} />
                <Route path="/chair" element={layout(<Products subTitle="Ghế Gaming" subkey="chair" />)} />
                <Route path="/sale" element={layout(<ProductsSale subTitle="Sản phẩm khuyến mãi" />)} />
                {/* <Route path="/news" element={layout(<Products subTitle="Tin tức" subkey="pc" />)} /> */}
                {/* <Route path="/about" element={layout(<Products subTitle="Giới thiệu" subkey="about" />)} /> */}
                {/* <Route path="/order" element={layout(<Products subTitle="Tra cứu đơn hàng" subkey="order" />)} /> */}
                {/* <Route path="/recruitment" element={layout(<Products subTitle="Tuyển dụng" subkey="recruitment" />)} /> */}
                {/* <Route path="/complaint" element={layout(<Products subTitle="Phản ánh, Khiếu nại" subkey="complaint" />)} /> */}

                <Route element={<PrivateRoutes />}>
                    <Route path="cart" element={layout(<Cart />)} />
                    <Route path="pay" element={layout(<Pay />)} />
                    <Route path="pay-complete" element={layout(<PayComplete />)} />
                    <Route path="account" element={layout(<Account />)} />
                    <Route path="/booking" element={layout(<Booking />)} />
                    <Route path="/booking-complete" element={layout(<BookingComplete />)} />
                </Route>

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="*" element={<NoPage />} />
            </Routes>
        </div>
    );
}

export default App;
