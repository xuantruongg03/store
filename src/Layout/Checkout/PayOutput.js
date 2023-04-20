import clsx from 'clsx';
import formatsMoney from '../../Convert/ConvertMoneyVND';
import style from './Pay.module.scss';

function PayOutput(props) {
    const sale = 0;
    const freeship = 0;
    let totalPrice = 0;
    props.data.map((element) => {
        return (totalPrice += element.price * element.quatity);
    });
    totalPrice -= sale + freeship;

    const handleSelectpayment = (e) => {
        props.setPayment(e.target.value);
    };
    return (
        <form className={clsx(style.output)}>
            <h1 className={clsx(style.label, 'my-2 text-center text-red-500', style.title)}>Thông Tin Đơn Hàng</h1>
            <div>
                <div className={style.flex}>
                    <label className={style.label} style={{ textTransform: 'uppercase', fontWeight: '700' }}>
                        Sản Phẩm
                    </label>
                    <label className={style.label} style={{ textTransform: 'uppercase', fontWeight: '700' }}>
                        Tạm Tính
                    </label>
                </div>
                <div className={style.bri} />
            </div>
            <div>
                <div className={style.flex}>
                    <div className=' min-h-fit w-64'>
                        {props.data.map((element, index) => (
                            <li key={index} style={{ padding: '0', display: 'block' }}>
                                <label className={style.label}>
                                    {element.title} x {element.quatity}
                                </label>
                            </li>
                        ))}
                    </div>
                    <label className={clsx(style.label, style.provisional)}>{formatsMoney(totalPrice)}</label>
                </div>
                <div className={style.bri} />
            </div>

            <div>
                <div className={style.flex}>
                    <label className={style.label}>Mã giảm giá</label>
                    <label className={clsx(style.label, style.provisional)}>{`-` + formatsMoney(sale)}</label>
                </div>
                <div className={style.bri} />
            </div>
            <div>
                <div className={style.flex}>
                    <label className={style.label}>Phí vận chuyển</label>
                    <label className={clsx(style.label, style.provisional)}>{formatsMoney(freeship)}</label>
                </div>
                <div className={style.bri} />
            </div>
            <div>
                <div className={style.flex}>
                    <label className={style.label}>Tổng tiền</label>
                    <label className={clsx(style.label, style.provisional)}>{formatsMoney(totalPrice)}</label>
                </div>
                <div className={style.bri} />
            </div>
            <div>
                <div>
                    <label className={style.label} style={{ minWidth: '400px' }}>
                        Chọn hình thức thanh toán
                    </label>
                </div>
                <div className={style.bri} />
            </div>

            <div>
                <input type="radio" name='payment' id='cod' className='mt-5 mr-2' defaultChecked defaultValue="cod" onClick={handleSelectpayment}/>
                <label htmlFor="cod">Thanh toán khi nhận hàng (COD)</label>
            </div>
            <div>
                <input type="radio" name='payment' id='banking' className='mt-5 mr-2' defaultValue="banking" onClick={handleSelectpayment}/>
                <label htmlFor="banking">Thanh toán bằng Internet Banking</label>
            </div>
            <button className={clsx(style.button, 'px-3 rounded-md text-white font-semibold')} onClick={props.buy} >
                    Xác Nhận Thanh Toán
            </button>
        </form>
    );
}

export default PayOutput;
