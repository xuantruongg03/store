import clsx from 'clsx';
import { Link } from 'react-router-dom';
import style from './BookingComplete.module.scss';
function BookingComplete() {
    return (
        <div className={clsx(style.container)}>
            <h1 style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Hoàn tất đặt lịch</h1>
            <p className = {style.para}>Cảm ơn bạn đã tin tưởng giao vấn đề của bạn cho chúng tôi.</p>
            <p className = {style.para}>
                Nhân viên của chúng tôi sẽ sớm liên lạc với bạn để trao đổi cụ thể thời gian và một số vấn đề khác trong
                <span className={style.span}> 24h </span> tới. Vui lòng chú ý đến điện thoại của bạn.
            </p>
            <Link to={'/'} className={style.link}>
                Về trang chủ
            </Link>
        </div>
    );
}

export default BookingComplete;
