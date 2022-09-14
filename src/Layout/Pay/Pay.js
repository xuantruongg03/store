import { useEffect, useState } from 'react';
import style from './Pay.module.scss';
import PayInput from './PayInput';
import PayOutput from './PayOutput';

function Pay() {
    const [title, setTitle] = useState(localStorage.getItem('selectTitlePay').split(','));
    const [price, setPrice] = useState(localStorage.getItem('selectPricePay').split(','));
    // const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(0);
    const [address, setAddress] = useState('');
    const [conscious, setConscious] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [notes, setNotes] = useState('');
    const [payment, setPayment] = useState('');

    let totalPrice = 0;
    for (let i = 0; i < price.length; i++) {
        totalPrice += Number(price[i]);
    }
    const data = {
        title,
        totalPrice,
        sale: 0,
        freeship: 0,
        name,
        phone,
        address,
        conscious,
        district,
        city,
        notes,
        payment,
    };
    const func = {
        setName,
        setPhone,
        setAddress,
        setConscious,
        setDistrict,
        setCity,
        setNotes,
    };
    useEffect(() => {
        document.title = 'Thanh Toán';
    }, []);
    return (
        <div className={style.container}>
            <PayInput func={func} />

            <PayOutput setPayment={setPayment} data={data} />
            <br />
        </div>
    );
}

export default Pay;
