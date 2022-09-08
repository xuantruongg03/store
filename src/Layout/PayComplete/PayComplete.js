import clsx from 'clsx';
import { Link } from 'react-router-dom';
import style from './PayComplete.module.scss';
function PayComplete() {
    return (
        <div className={clsx(style.container)}>
            <h1 style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Hoàn tất đặt hàng</h1>
            <p className = {style.para}>Cảm ơn bạn đã mua sản phẩm trên Website của chung tôi.</p>
            <p className = {style.para}>
                Nhân viên của chúng tôi sẽ sớm liên lạc để xác nhận đơn đặt hàng của bạn trong{' '}
                <span className={style.span}>24h</span> tới. Vui lòng chú ý đến điện thoại của bạn.
            </p>
            <p className = {style.para}>
                Quý khách có thể theo dõi đơn hàng của mình bằng cách đăng nhập trước khi đặt hàng.{' '}
                <Link className={style.link} to={"/login"}>Đăng nhập tại đây</Link>{' '}
            </p>
            <Link to={'/'} className={style.link}>
                Về trang chủ
            </Link>
        </div>
    );
}

export default PayComplete;
