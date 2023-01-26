import axios from 'axios';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Booking.module.scss';

function Booking() {
    const ref = useRef();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        let name = ref.current.name.value;
        let gender = ref.current.gender.value;
        let email = ref.current.email.value;
        let phone = ref.current.phone.value;
        let address = ref.current.address.value;
        let date = ref.current.date.value;
        let problem = ref.current.problem.value;
        let ho = name.split(' ').slice(0, -1).join(' ');
        let ten = name.split(' ').slice(-1).join(' ');
        if (name === '' || email === '' || phone === '' || address === '' || date === '' || problem === '') {
            alert('Vui lòng kiểm tra lại!');
        } else {
            axios({
                method: 'POST',
                url: 'http://localhost:8080/api/v1/booking',
                data: {
                    ho: ho,
                    ten: ten,
                    gioitinh: gender,
                    email: email,
                    dienthoai: phone,
                    diachi: address,
                    ngayhen: date,
                    vande: problem,
                },
            });
            navigate('/booking-complete');
        }
    };

    return (
        <div className={style.boxBooking}>
            <h1 className={style.title}>Đặt lịch sữa chữa tại nhà</h1>
            <form action="link form" className={style.form} type="POST" target="hidden_iframe" ref={ref}>
                <div className={style.group}>
                    <span className={style.label}>
                        Họ tên <span style={{ color: 'red' }}>*</span>
                    </span>
                    <input
                        aria-label="Họ tên"
                        className={style.input}
                        name="name"
                        placeholder="Nhập tên của bạn"
                        type="text"
                        defaultValue=""
                    />
                </div>
                <div className={style.group}>
                    <span className={style.label}>Giới tính</span>
                    <div className={style.radio}>
                        <input
                            id="gender-male"
                            className={style.boxRadio}
                            name="gender"
                            type="radio"
                            defaultValue="Nam"
                            defaultChecked
                        />
                        <label>Nam</label>
                    </div>
                    <div className={style.radio}>
                        <input
                            id="gender-female"
                            className={style.boxRadio}
                            name="gender"
                            type="radio"
                            defaultValue="Nữ"
                        />
                        <label>Nữ</label>
                    </div>
                </div>

                <div className={style.group}>
                    <span className={style.label}>
                        Email <span style={{ color: 'red' }}>*</span>
                    </span>
                    <input
                        aria-label="Email"
                        className={style.input}
                        name="email"
                        placeholder="Nhập địa chỉ email"
                        pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
                        type="email"
                    />
                </div>
                <div className={style.group}>
                    <span className={style.label}>
                        Điện thoại <span style={{ color: 'red' }}>*</span>
                    </span>
                    <input
                        aria-label="Điện thoại"
                        className={style.input}
                        name="phone"
                        placeholder="Nhập số điện thoại"
                        type="text"
                    />
                </div>

                <div className={style.group}>
                    <span className={style.label}>
                        Địa chỉ <span style={{ color: 'red' }}>*</span>
                    </span>
                    <input
                        aria-label="Địa chỉ"
                        className={style.input}
                        name="address"
                        placeholder="Nhập địa chỉ"
                        type="text"
                    />
                </div>

                <div className={style.group}>
                    <span className={style.label}>
                        Ngày hẹn <span style={{ color: 'red' }}>*</span>
                    </span>
                    <input
                        aria-label="Ngày hẹn"
                        className={style.input}
                        name="date"
                        placeholder="Chọn ngày khám"
                        type="date"
                        defaultValue=""
                    />
                </div>
                <div className={style.group}>
                    <span className={style.label}>
                        Vấn đề của bạn <span style={{ color: 'red' }}>*</span>
                    </span>
                    <textarea
                        rows="5"
                        aria-label="Vấn đề của bạn"
                        className={style.inputArea}
                        name="problem"
                        placeholder="Nhập nội dung..."
                        defaultValue=""
                    ></textarea>
                </div>
                {/* <div className={style.group}>
                    <div >
                        <input type="checkbox" name="checkbox" id="checkbox" className={style.checkbox}/>
                        <label >
                            Tôi đã đọc và đồng ý với{' '}
                            <a href="/" rel="noopener" target="_blank">
                                <b>điều khoản</b>
                            </a>
                        </label>
                    </div>
                </div> */}
                <div className={style.boxBtn}>
                    <button aria-label="Gửi" type="submit" className={style.btn} onClick={handleSubmit}>
                        <span>
                            Đặt lịch
                            <i aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
                <div id="status" className={style.status}>
                    (*) Thông tin bắt buộc phải nhập!
                </div>
            </form>
        </div>
    );
}

export default Booking;
