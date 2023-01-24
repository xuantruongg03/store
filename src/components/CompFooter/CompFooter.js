import { Link } from 'react-router-dom';
import slug from 'src/Convert/ConvertStringVNtoTitle';
import style from "./Footer.module.scss";

const inf = [
    'Đơn vị chủ quản: Siêu thị điện tử Nhanh.vn',
    'Mobile: 0981793201',
    'Email: contact@gmail.com',
    'Địa chỉ: Số 1 Sao Hỏa, Hệ Thái Dương',
    'Website: http://www.nhanh.vn/',
];

const support = ['Giới thiệu', 'Chính sách đổi trả', 'Hỗ trợ mua hàng'];

function CompFooter() {
    return (
        <div className={style.footer}>
            <div>
                <img
                    className={style.logoFooter}
                    src="https://traffic-edge31.cdn.vncdn.io/nvn/ncdn/store3/96878/logo_1648529159_logo%200338.png"
                    alt='logo'
                />

                <h3 className={style.hotline}>Hotline: 0981793201</h3>
            </div>

            <ul className={style.inf}>
                {inf.map((inf, index) => (
                    <li style={{ padding: '0' }} key={index}>
                        {inf}
                    </li>
                ))}
            </ul>
            <div>
                <p className={style.footerTitle}>Hỗ trợ khách hàng</p>
                {support.map((item, index) => (
                    <li key={index} style={{ padding: '0' }}>
                        <Link to={slug(item)}  className={style.link}>
                            {item}
                        </Link>
                    </li>
                ))}
            </div>
            <div className={style.payment}>
                <p className={style.footerTitle}>Hình thức thanh toán</p>
                <div className="logo-payment">
                    <img
                        className={style.iconPayment}
                        src="http://t0338.store.nhanh.vn/tp/T0338/img/payment1.png"
                        alt="payment"
                    />
                    <img
                        className={style.iconPayment}
                        src="http://t0338.store.nhanh.vn/tp/T0338/img/payment2.png"
                        alt="payment"
                    />
                    <img
                        className={style.iconPayment}
                        src="http://t0338.store.nhanh.vn/tp/T0338/img/payment4.png"
                        alt="payment"
                    />
                    <img
                        className={style.iconPayment}
                        src="http://t0338.store.nhanh.vn/tp/T0338/img/payment5.png"
                        alt="payment"
                    />
                    <img
                        className={style.iconPayment}
                        src="http://t0338.store.nhanh.vn/tp/T0338/img/payment3.png"
                        alt="payment"
                    />
                </div>
            </div>
        </div>
    );
}

export default CompFooter;
