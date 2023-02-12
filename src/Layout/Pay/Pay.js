import { useState } from 'react';
import { useSelector } from 'react-redux';
import { buy, deleteProductCart } from 'src/api/cart';
import style from './Pay.module.scss';
import PayInput from './PayInput';
import PayOutput from './PayOutput';

function Pay() {
    const [name, setName] = useState('example');
    const [phone, setPhone] = useState('0123456');
    const [address, setAddress] = useState('example');
    const [conscious, setConscious] = useState('example');
    const [district, setDistrict] = useState('example');
    const [city, setCity] = useState('example');
    const [notes, setNotes] = useState('');
    const [payment, setPayment] = useState('Thanh toán khi nhận hàng (COD)');
    const [errorAddress, setErrorAddress] = useState(true);

    const state = useSelector((state) => state.cart);
    const product = [];
    state.map((element) => {
        let ob = {
            id_product: element.id_product,
            soluong: 1,
        };
        return product.push(ob);
    });

    const func = {
        setName,
        setPhone,
        setAddress,
        setConscious,
        setDistrict,
        setCity,
        setNotes,
        setErrorAddress,
    };

    const data = {
        name,
        phone,
        conscious,
        address,
        district,
        city,
        errorAddress,
    };

    const handleBuy = (e) => {
        if (
            name === 'example' ||
            phone === '0123456' ||
            address === 'example' ||
            conscious === 'example' ||
            district === 'example' ||
            city === 'example'
        ) {
            alert('Vui lòng kiểm tra lại!');
            e.preventDefault();
        } else {
            product.map((element) => {
                const Buy = async () => {
                    const params = {
                        customer_id: localStorage.getItem('customer_id'),
                        product_id: element.id_product,
                        first_name: name.split(' ').slice(0, -1).join(' '),
                        last_name: name.split(' ').slice(-1).join(' '),
                        number_phone: phone,
                        address: `${address} - ${conscious} - ${district}`,
                        notes: notes,
                        payment: payment,
                        total_amount: element.soluong,
                    };
                    await buy(params);
                };
                const deleteCart = async () => {
                    const params = {
                        product_id: element.id_product,
                        customer_id: localStorage.getItem('customer_id'),
                    };
                    await deleteProductCart(params);
                    document.querySelector('.cart-' + element.id_product).remove();
                };
                Buy();
                deleteCart();
                return state;
            });
        }
    };

    return (
        <div className={style.container}>
            <PayInput func={func} data={data} />

            <PayOutput setPayment={setPayment} buy={handleBuy} data={state} />
            <br />
        </div>
    );
}

export default Pay;
