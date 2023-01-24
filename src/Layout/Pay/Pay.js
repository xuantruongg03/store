import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Pay.module.scss';
import PayInput from './PayInput';
import PayOutput from './PayOutput';

function Pay() {
    // const [title, setTitle] = useState(localStorage.getItem('selectTitlePay').split(','));
    // const [price, setPrice] = useState(localStorage.getItem('selectPricePay').split(','));
    // const dispatch = useDispatch();
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

    const dispatch = useDispatch();

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
            e.preventDefault()
        } else {
            dispatch({
                type: 'BUY',
                data: {
                    //thông tin sản phẩm
                    product: product,

                    //thông tin người mua
                    name: name,
                    phone: phone,
                    address: address,
                    conscious: conscious,
                    district: district,
                    city: city,
                    notes: notes,
                    payment: payment,
                },
            });
        }
    };

    useEffect(() => {
        document.title = 'Thanh Toán';
    }, []);

    return (
        <div className={style.container}>
            <PayInput func={func} data={data} />

            <PayOutput setPayment={setPayment} buy={handleBuy} data={state} />
            <br />
        </div>
    );
}

export default Pay;
