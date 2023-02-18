import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI } from '../../api/register';
import { checkUserAPI } from '../../api/user';
import style from './Register.module.scss';

function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState('example');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('example');
    const [sex, setSex] = useState('');
    const [checkbox, setCheckbox] = useState(false);
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
        setSex(e.target.value);
    };

    const handleCheckbox = (e) => {
        setCheckbox(!checkbox);
    };

    const handleRegister = (e) => {
        let firt_name = name.split(' ').slice(0, -1).join(' ');
        let last_name = name.split(' ').slice(-1).join(' ');
        const register = async () => {
            const params = {
                username: user,
                password: password,
                email: email,
                first_name: firt_name,
                last_name: last_name,
                gender: sex,
            };
            await registerAPI(params);
        };
        register();
        navigate('/login');
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

    const handleCheck = () => {
        alert('Vui lòng kiểm tra lại!');
    };

    useMemo(async () => {
        const check = async () => {
            const res = await checkUserAPI({ username: user });
            setState(res.state);
        };
        check();
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
                        <input
                            type="text"
                            name="user"
                            className={clsx(style.input, name.length < 1 || name.length > 50 ? style.error : '')}
                            onChange={handleInputName}
                        />
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
                        <input
                            type="text"
                            name="user"
                            className={clsx(style.input, state || user.length > 50 ? style.error : '')}
                            onChange={handleInputUser}
                        />
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
                        <input
                            type="Email"
                            name="email"
                            className={clsx(style.input, !validateEmail(email) ? style.error : '')}
                            onChange={handleInputEmail}
                        />
                        {validateEmail(email) ? null : <p className={style.labelError}>Đây không phải địa chỉ email</p>}
                    </div>
                </div>
                <div className={style.form}>
                    <div className={style.formGroup}>
                        <label className={style.lable}>Mật khẩu:</label>
                        <input
                            type="password"
                            name="firstPassword"
                            className={clsx(style.input, !checkPassword(password) < 50 ? style.error : '')}
                            onChange={handleInputPassword}
                        />
                        <p className={style.labelError}>Độ mạnh mật khẩu: {checkPassword(password)}% (Tổi thiểu 50%)</p>
                    </div>
                    <div className={style.formGroup}>
                        <label className={style.lable}>Nhập lại mật khẩu:</label>
                        <input
                            type="password"
                            name="lastPassword"
                            className={clsx(style.input, !checkConfirmPassword() ? style.error : '')}
                            onChange={handleConfirmPassword}
                        />
                        {checkConfirmPassword() ? null : <p className={style.labelError}>Mật khẩu không khớp!</p>}
                    </div>
                </div>
                <div className={style.boxCheck}>
                    <input type="checkbox" id="checkbox" className={style.checkbox} onClick={handleCheckbox} />
                    <label>
                        Tôi đã đọc và đồng ý với{' '}
                        <a href="/" rel="noopener" target="_blank" className={style.rules}>
                            <b>điều khoản</b>
                        </a>
                    </label>
                </div>
                <div className={style.labelForgetPassword}>
                    <Link to="/login" className={style.labelForgetPassword}>
                        Đã có tài khoản?
                    </Link>
                </div>
                <div>
                    {validateEmail(email) === false ||
                    checkPassword(password) < 50 ||
                    name.length < 6 ||
                    state ||
                    checkbox === false ? (
                        <button type="button" className={style.button} onClick={handleCheck}>
                            Đăng ký
                        </button>
                    ) : (
                        <button className={style.button} onClick={handleRegister}>
                            Đăng ký
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Register;
