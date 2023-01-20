import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import style from './Cart.module.scss';
import CompCart from './CompCart';
import axios from 'axios';

function Cart() {
    const dispatch = useDispatch();
    const [cart, setCart] = useState([]);
    const [select, setSelect] = useState([]);
    const [selectTitlePay, setSelectTitlePay] = useState([]);
    const [selectPricePay, setSelectPricePay] = useState([]);
    const [selectQuatity, setSelectQuatity] = useState([]);
    const idCart = 1;

    useEffect(() => {
        document.title = 'Giỏ Hàng';
        axios.get(`http://localhost:8000/api/v1/cart/get-cart/${idCart}`).then((res) => {
            setCart(res.data.data.cart);
        });
    }, []);
    const handleDelete = () => {
        dispatch({
            type: 'DELETE_CART',
            data: select,
        });
    };
    const handleBuy = () => {
        dispatch({
            type: 'PAY',
            data: { selectTitlePay, selectPricePay, id_product: select, selectQuatity },
        });
    };
    const func = {
        setSelect,
        setSelectTitlePay,
        setSelectPricePay,
        setSelectQuatity,
    };
    const value = {
        selectTitlePay,
        selectPricePay,
        selectQuatity,
    };
    return (
        <div style={{ backgroundColor: '#FAFAFA', overflow: 'auto' }}>
            <br />

            <div className={style.container}>
                <h1
                    style={{ textAlign: 'center', fontSize: '100px', color: 'red', marginTop: '10px' }}
                    className={clsx(cart.length <= 0 ? '' : 'disabled')}
                >
                    GIỎ HÀNG TRỐNG
                </h1>
                <Table style={{ width: '100%' }} className={clsx(cart.length > 0 ? '' : 'disabled', 'cart')}>
                    <thead style={{ color: 'red' }}>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Tên Sản phẩm</th>
                            <th>Thông tin sản phẩm</th>
                            <th>Giá tiền</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                            <th>Chọn</th>
                        </tr>
                    </thead>

                    {cart.map((item, index) => (
                        <CompCart data={item} key={index} func={func} value={value}/>
                    ))}
                </Table>
            </div>
            <Link to={'/pay'} className={style.btnpay} onClick={handleBuy}>
                Thanh Toán
            </Link>
            <button className={clsx(style.btndel)} onClick={handleDelete}>
                Xóa SP
            </button>
            <br />
        </div>
    );
}

export default Cart;
