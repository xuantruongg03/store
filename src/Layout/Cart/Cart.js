import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';

import style from './Cart.module.scss';
import CompCart from './CompCart';
import clsx from 'clsx';
const selected = [];
function Cart(props) {
    const [cart, setCart] = useState([]);
    const [select, setSelect] = useState([]);
    const [amount, setAmount] = useState(cart.amount);
    useEffect(() => {
        document.title = "Giỏ Hàng"
        fetch('http://localhost:3000/cart')
            .then((res) => res.json())
            .then((cart) => {
                setCart(cart);
            });
    }, [])
    const handleDelete = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        };
        select.map((id) => {
            fetch('http://localhost:3000/cart/' + id, requestOptions).then((response) => {
            document.querySelector(".cart-" + id).remove();
            // if (select.length <= 0) {
            //     document.querySelector('.cart').classList.add('disabled');
            // }
            for (let i = 0; i < select.length; i++) {
                if (select[i] == id) {
                    select.splice(i, 1);
                }
            }
        });
    })
    };
    return (
        <div style={{ backgroundColor: '#FAFAFA', overflow: 'auto' }}>
            <br />

            <div className={style.container}>
            <h1 
                style={{ textAlign: 'center', fontSize: '100px', color: 'red', marginTop: '10px' }} 
                className = {clsx(cart.length <= 0 ? '' : 'disabled')}
                >
                    GIỎ HÀNG TRỐNG
            </h1>
                <Table style={{ width: '100%' }} className = {clsx(cart.length > 0 ? '' : 'disabled', 'cart')}>
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
                        <CompCart data={item} setAmount={setAmount} key={index} setSelect={setSelect}/>
                    ))}
                </Table>
            </div>
            <Link to={'/pay'} className={style.btnpay}>
                Thanh Toán
            </Link>
            <button className={clsx(style.btndel)} onClick={handleDelete}>Xóa SP</button>
            <br />
        </div>
    );
}

export default Cart;
