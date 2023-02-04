import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../../api/login';
import style from './Login.module.scss';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState(true);

    const handleInputUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleInputPassword = (e) => {
        setPassword(e.target.value);
    };
    
    const handleLogin = () => {
        const login = async () => {
            const params = {
                username: username,
                password: password,
            };
            const responsive = await loginAPI(params);
            setState(responsive.state);
            if (responsive.state) {
                const token = responsive.token;
                localStorage.setItem('token', token);
                dispatch({ type: 'LOGIN', payload: responsive});
                navigate('/');
            } else {
                navigate('/login');
            }
        };
        login();
    };

    return (
        <div className={clsx(style.container, 'container')}>
            <div className={style.login}>
                <div className={style.title}>
                    <h1>Đăng nhập</h1>
                </div>
                <div className={style.formGroup}>
                    <label className={style.lable}>Tên đăng nhập</label>
                    <input type="text" name="username" className={style.input} onChange={handleInputUsername} />
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
