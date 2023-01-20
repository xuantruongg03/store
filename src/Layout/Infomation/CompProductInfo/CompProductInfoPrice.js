import clsx from 'clsx';
import style from './CompProductInfoPrice.module.scss';
import formatsMoney from '../../../Convert/ConvertMoneyVND';
import { useState } from 'react';

function CompProductInfoPrice(props) {
    const [config, setConfig] = useState('');
    const handleSetConfig = (config) => {
        setConfig(config.target.value);
    };
    const hanldeBuyNow = () => {
        console.log('Buy Now');
    };
    const handleContact = () => {
        console.log('Contact');
    };
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
            <p className={style.configuration}>Cấu hình:</p>
            <button onClick={handleSetConfig} value="256" className={clsx(style.btnConfig)}>
                256GB
            </button>
            <button
                onClick={handleSetConfig}
                value="512"
                className={clsx(style.btnConfig)}
                style={{ marginLeft: '10px' }}
            >
                512GB
            </button>
            <br />
            <div>
                <p className={style.inf}>
                    Tình trạng: <span className={style.des}>{props.quatity > 1 ? 'Còn hàng' : 'Hết hàng'}</span>{' '}
                </p>
            </div>
            <button className={style.add} onClick={hanldeBuyNow}>
                Mua ngay
                <br />
                <span style={{ fontSize: '12px' }}>Giao hàng tận nơi</span>
            </button>
            <button onClick={handleContact} className={style.contact}>
                Liên hệ đặt hàng
            </button>
        </div>
    );
}

export default CompProductInfoPrice;
