import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { useSelector } from 'react-redux';
import style from './Cart.module.scss';
import CompCart from './CompCart';

function Cart() {
    const state = useSelector((state) => {
        console.log(state.cart.title);
    })

    const [cart, setCart] = useState([]);
    const [select, setSelect] = useState([]);
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
            // xóa id đã gửi yêu cầu delete
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
                        <CompCart data={item} key={index} setSelect={setSelect}/>
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
