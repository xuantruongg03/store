import axios from 'axios';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Register.module.scss';

function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState('example');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('example');
    const [sex, setSex] = useState('');
    const [state, setState] = useState(true);

    const handleInputUser = (e) => {
        let user = e.target.value;
        user = user.trim();
        setUser(user);
    };

    const handleInputPassword = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleInputEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleInputName = (e) => {
        setName(e.target.value);
    };

    const handleInputSex = (e) => {
        console.log(e.target.value);
        setSex(e.target.value);
    };

    const handleRegister = (e) => {
        let ho = name.split(" ").slice(0, -1).join(" ");
        let ten = name.split(" ").slice(-1).join(" ");
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/v1/register',
            data: {
                tendangnhap: user,
                matkhau: password,
                email: email,
                ho: ho,
                ten: ten,
                gioitinh: sex,
            },
        });
        navigate("/login");
    };

    const validateEmail = (email) => {
        let example = 'example@gmail.com';
        var re = /\S+@\S+\.\S+/;
        return re.test(email || example);
    };

    const checkPassword = (password) => {
        var strength = 0;
        if (password.match(/[a-z]+/)) {
            strength += 1;
        }
        if (password.match(/[A-Z]+/)) {
            strength += 1;
        }
        if (password.match(/[0-9]+/)) {
            strength += 1;
        }
        if (password.match(/[$@#&!]+/)) {
            strength += 1;
        }

        switch (strength) {
            case 0:
                return 0;

            case 1:
                return 25;

            case 2:
                return 50;

            case 3:
                return 75;

            case 4:
                return 100;

            default:
                return;
        }
    };

    const checkConfirmPassword = () => {
        if (password !== confirmPassword) {
            return false;
        }
        return true;
    };

    useMemo(async () => {
        await axios({
            method: 'post',
            url: 'http://localhost:8000/api/v1/check-user',
            data: {
                user: user,
            },
        }).then((res) => {
            setState(res.data.state);
        });
    }, [user]);

    return (
        <div className={clsx(style.container, 'container')}>
            <div className={style.login}>
                <div className={style.title}>
                    <h1>Đăng ký tài khoản</h1>
                </div>
                <div className={style.form}>
                    <div className={style.formGroup}>
                        <label className={style.lable}>Họ tên:</label>
                        <input type="text" name="user" className={style.input} onChange={handleInputName} />
                        {(() => {
                            if (name.length < 1) {
                                return <p className={style.labelError}>Họ tên phải lớn hơn 6 kí tự!</p>;
                            } else if (name.length > 50) {
                                return <p className={style.labelError}>Họ tên không được quá 50 kí tự</p>;
                            }
                        })()}
                    </div>
                    <div className={style.formGroup}>
                        <label className={style.lable}>Giới tính:</label>
                        <select className={style.input} onChange={handleInputSex} defaultValue="Nam">
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>
                </div>
                <div className={style.form}>
                    <div className={style.formGroup}>
                        <label className={style.lable}>Tên đăng nhập:</label>
                        <input type="text" name="user" className={style.input} onChange={handleInputUser} />
                        {(() => {
                            if (state) {
                                return <p className={style.labelError}>Tên đăng nhập đã tồn tại!</p>;
                            } else if (user.length < 6) {
                                return <p className={style.labelError}>Tên đăng nhập quá ngắn!</p>;
                            }
                        })()}
                    </div>
                    <div className={style.formGroup}>
                        <label className={style.lable}>Email:</label>
                        <input type="Email" name="email" className={style.input} onChange={handleInputEmail} />
                        {validateEmail(email) ? null : <p className={style.labelError}>Đây không phải địa chỉ email</p>}
                    </div>
                </div>
                <div className={style.form}>
                    <div className={style.formGroup}>
                        <label className={style.lable}>Mật khẩu:</label>
                        <input
                            type="password"
                            name="firstPassword"
                            className={style.input}
                            onChange={handleInputPassword}
                        />
                        <p className={style.labelError}>Độ mạnh mật khẩu: {checkPassword(password)}%</p>
                    </div>
                    <div className={style.formGroup}>
                        <label className={style.lable}>Nhập lại mật khẩu:</label>
                        <input
                            type="password"
                            name="lastPassword"
                            className={style.input}
                            onChange={handleConfirmPassword}
                        />
                        {checkConfirmPassword() ? null : <p className={style.labelError}>Mật khẩu không khớp!</p>}
                    </div>
                </div>
                <div className={style.labelForgetPassword}>
                    <Link to="/login" className={style.labelForgetPassword}>
                        Đã có tài khoản?
                    </Link>
                </div>
                <div>
                    {
                        (validateEmail(email) === false || checkPassword(password) < 50 || name.length < 6 || state ) ? (
                            <button className={style.button} disabled >
                                Đăng ký
                            </button>
                        ) : (
                            <button className={style.button} onClick={handleRegister}>
                                Đăng ký
                            </button>
                        )
                    }
                    {/* <button className={style.button} onClick={handleRegister}>
                        Đăng ký
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default Register;
