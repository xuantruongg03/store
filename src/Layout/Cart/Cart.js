import 'bootstrap/dist/css/bootstrap.min.css';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getCart } from 'src/api/cart';
import style from './Cart.module.scss';
import CompCart from './CompCart';

function Cart() {
    const dispatch = useDispatch();
    const [cart, setCart] = useState([]);
    const [select, setSelect] = useState([]);
    const [selectTitlePay, setSelectTitlePay] = useState([]);
    const [selectPricePay, setSelectPricePay] = useState([]);
    const [selectQuatity, setSelectQuatity] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const customer_id = query.get('q');

    useEffect(() => {
        document.title = 'Giỏ Hàng';
        const cart = async () => {
            const res = await getCart(customer_id);
            console.log(res.data);
            setCart(res.data);
        };
        cart();
    }, [customer_id]);

    const handleDelete = (e) => {
        if (selectTitlePay.length === 0) {
            alert('Vui lòng chọn sản phẩm!');
            e.preventDefault();
        } else {
            dispatch({
                type: 'DELETE_CART',
                data: select,
            });
        }
    };

    const handleBuy = (e) => {
        if (selectTitlePay.length === 0) {
            alert('Vui lòng chọn sản phẩm!');
            e.preventDefault();
        } else {
            dispatch({
                type: 'PAY',
                data: { selectTitlePay, selectPricePay, id_product: select, selectQuatity },
            });
        }
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
                            <th>Tên Sản phẩm</th>
                            <th>Thông tin sản phẩm</th>
                            <th>Giá tiền</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                            <th>Chọn</th>
                        </tr>
                    </thead>

                    {cart.map((item, index) => (
                        <CompCart data={item} key={index} func={func} value={value} />
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
