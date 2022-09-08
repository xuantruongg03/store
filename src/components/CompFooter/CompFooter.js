import { Link } from 'react-router-dom';
import slug from 'src/Convert/ConvertStringVNtoTitle';
import './CompFooter.css';

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
        <div className="footer">
            <div>
                <img
                    className="logo-footer"
                    src="https://traffic-edge31.cdn.vncdn.io/nvn/ncdn/store3/96878/logo_1648529159_logo%200338.png"
                />

                <h3 className="hotline">Hotline: 0981793201</h3>
            </div>

            <ul className="inf">
                {inf.map((inf, index) => (
                    <li style={{ padding: '0' }} key={index}>
                        {inf}
                    </li>
                ))}
            </ul>
            <div>
                <p className="footer-title">Hỗ trợ khách hàng</p>
                {support.map((item, index) => (
                    <li key={index} style={{ padding: '0' }}>
                        <Link to={slug(item)}  className="link">
                            {item}
                        </Link>
                    </li>
                ))}
            </div>
            <div className="payment">
                <p className="footer-title">Hình thức thanh toán</p>
                <div className="logo-payment">
                    <img
                        className="icon-payment"
                        src="http://t0338.store.nhanh.vn/tp/T0338/img/payment1.png"
                        alt="payment"
                    />
                    <img
                        className="icon-payment"
                        src="http://t0338.store.nhanh.vn/tp/T0338/img/payment2.png"
                        alt="payment"
                    />
                    <img
                        className="icon-payment"
                        src="http://t0338.store.nhanh.vn/tp/T0338/img/payment4.png"
                        alt="payment"
                    />
                    <img
                        className="icon-payment"
                        src="http://t0338.store.nhanh.vn/tp/T0338/img/payment5.png"
                        alt="payment"
                    />
                    <img
                        className="icon-payment"
                        src="http://t0338.store.nhanh.vn/tp/T0338/img/payment3.png"
                        alt="payment"
                    />
                </div>
            </div>
        </div>
    );
}

export default CompFooter;
