import clsx from 'clsx';
import style from './CompProductInfoPrice.module.scss';
import formatsMoney from '../../../Convert/ConvertMoneyVND';
import { useState } from 'react';

function CompProductInfoPrice(props) {
    const [color, setColor] = useState('');
    const handleSetColor = (color) => {
        setColor(color.target.value);
    };
    localStorage.setItem('color', color);
    return (
        <div className={style.priceBox}>
            <p>
                Giá bán: <span className={style.price}>{formatsMoney(props.price)}</span>
            </p>
            <p className={style.cost}>{formatsMoney(props.cost)}</p>
            <p className={style.rate}>
                Rate: <span className={style.rateNumber}>5.0</span>
            </p>
            <br />
            <p className={style.color}>Màu sắc:</p>
            <button value="red" onClick={handleSetColor} className={clsx(style.btnColor, style.red)}></button>
            <button value="gray" onClick={handleSetColor} className={clsx(style.btnColor, style.gray)}></button>
            <br />
            <button className={style.add}>
                Mua ngay
                <br />
                <span style={{ fontSize: '12px' }}>Giao hàng tận nơi</span>
            </button>
            <button className={style.contact}>Liên hệ đặt hàng</button>
        </div>
    );
}

export default CompProductInfoPrice;
