import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { carts } from 'src/data';
import style from './Cart.module.scss';
import CompCart from './CompCart';

function Cart() {
    const dispatch = useDispatch();
    const [cart, setCart] = useState([]);
    const [select, setSelect] = useState([]);
    const [selectTitlePay, setSelectTitlePay] = useState([]);
    const [selectPricePay, setSelectPricePay] = useState([]);
    useEffect(() => {
        document.title = 'Giỏ Hàng';
        setCart(carts);
    }, []);
    const handleDelete = () => {
        dispatch({
            type: 'DELETE_CART',
            payload: select,
        });
    };
    const func = {
        setSelectTitlePay,
        selectTitlePay,
        setSelectPricePay,
        selectPricePay,
        setSelect,
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
                        <CompCart data={item} key={index} func={func} />
                    ))}
                </Table>
            </div>
            <Link to={'/pay'} className={style.btnpay}>
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
