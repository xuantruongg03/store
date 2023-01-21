import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Pay.module.scss';
import PayInput from './PayInput';
import PayOutput from './PayOutput';

function Pay() {
    // const [title, setTitle] = useState(localStorage.getItem('selectTitlePay').split(','));
    // const [price, setPrice] = useState(localStorage.getItem('selectPricePay').split(','));
    // const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(0);
    const [address, setAddress] = useState('');
    const [conscious, setConscious] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [notes, setNotes] = useState('');
    const [payment, setPayment] = useState('');

    const state = useSelector((state) => state.cart);
    const product = [];
    state.map((element) => {
        let ob = {
            id_product: element.id_product,
            soluong: 1,
        }
        return product.push(ob)
    })
    
    const func = {
        setName,
        setPhone,
        setAddress,
        setConscious,
        setDistrict,
        setCity,
        setNotes,
    };

    const dispatch = useDispatch();

    const handleBuy = () => {
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
    };

    useEffect(() => {
        document.title = 'Thanh Toán';
    }, []);
    return (
        <div className={style.container}>
            <PayInput func={func} />

            <PayOutput setPayment={setPayment} buy={handleBuy} data={state} />
            <br />
        </div>
    );
}

export default Pay;
