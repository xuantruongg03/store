import style from './Register.module.scss';
import clsx from 'clsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [sex, setSex] = useState('');

    const handleInputUser = (e) => {
        setUser(e.target.value);
    };

    const handleInputPassword = (e) => {
        setPassword(e.target.value);
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

    const handleRegister = (e) => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/v1/register',
            data: {
                user: user,
                password: password,
                email: email,
                name: name,
                sex:sex
            },
        })
    };

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
                    </div>
                    <div className={style.formGroup}>
                        <label className={style.lable}>Giới tính:</label>
                        <select className={style.input} onChange={handleInputSex}>
                            <option selected>Nam</option>
                            <option>Nữ</option>
                        </select>
                    </div>
                </div>
                <div className={style.form}>
                    <div className={style.formGroup}>
                        <label className={style.lable}>Tên đăng nhập:</label>
                        <input type="text" name="user" className={style.input} onChange={handleInputUser} />
                    </div>
                    <div className={style.formGroup}>
                        <label className={style.lable}>Email:</label>
                        <input type="Email" name="email" className={style.input} onChange={handleInputEmail} />
                    </div>
                </div>
                <div className={style.form}>
                    <div className={style.formGroup}>
                        <label className={style.lable}>Mật khẩu:</label>
                        <input type="password" name="password" className={style.input} />
                    </div>
                    <div className={style.formGroup}>
                        <label className={style.lable}>Nhập lại mật khẩu:</label>
                        <input type="password" name="password" className={style.input} />
                    </div>
                </div>
                <div className={style.labelForgetPassword}>
                    <Link to = "/login" className={style.labelForgetPassword}>
                        Đã có tài khoản?
                    </Link>
                </div>
                <div>
                    <button className={style.button} onClick={handleRegister}>
                        Đăng ký
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;
