import axios from 'axios';
import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import style from './Login.module.scss';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleInputUser = (e) => {
        setUser(e.target.value);
    };

    const handleInputPassword = (e) => {
        setPassword(e.target.value);
    };
    const [state, setState] = useState(true)
    const handleLogin = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/v1/login',
            data: {
                user: user,
                password: password,
            },
        }).then((res) => {
            setState(res.data.state)
            localStorage.setItem('id_khachhang', res.data.data[0].id_khachhang);
            dispatch({ type: 'LOGIN', data: res.data });
            res.data.state ? navigate('/') : navigate('/login');
        });
    };

    return (
        <div className={clsx(style.container, 'container')}>
            <div className={style.login}>
                <div className={style.title}>
                    <h1>Đăng nhập</h1>
                </div>
                <div className={style.formGroup}>
                    <label className={style.lable}>Tên đăng nhập</label>
                    <input type="text" name="user" className={style.input} onChange={handleInputUser} />
                    {state === true ? null : <label className={style.lableAlert}>Sai thông tin đăng nhập!</label>}
                </div>
                <div className={style.formGroup}>
                    <label className={style.lable}>Mật khẩu</label>
                    <input type="password" name="password" className={style.input} onChange={handleInputPassword} />
                    {state === true ? null : <label className={style.lableAlert}>Sai thông tin đăng nhập!</label>}
                    <div className={style.boxLable}>
                        <Link to="/forget-password" className={style.labelForgetPassword}>
                            Quên mật khẩu?
                        </Link>
                        <Link to="/register" className={style.labelForgetPassword}>
                            Chưa có tài khoản?
                        </Link>
                    </div>
                </div>
                <div>
                    <button className={style.button} onClick={handleLogin}>
                        Đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
