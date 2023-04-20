import bcrypt from 'bcryptjs';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fb from '../access/image/fb-login-btn.svg';
import gg from '../access/image/gg-login-btn.svg';
import { registerAPI } from '../api/register';

function Register() {
    const navigate = useNavigate();
    const [state, setState] = useState(true);
    const ref = useRef();

    const handleRegister = (e) => {
        e.preventDefault();
        const username = ref.current.username.value;
        const password = ref.current.password.value;
        const email = ref.current.email.value;
        const first_name = ref.current.first_name.value;
        const last_name = ref.current.last_name.value;
        const gender = ref.current.gender.value;
        if(username !== '' && password !== '' && email !== '' && first_name !== '' && last_name !== '' && gender !== '') {
            bcrypt.genSalt(10, function(err, salt) {
                if (err) {
                  console.error(err);
                  return;
                }
                bcrypt.hash(password, salt, function(err, hash) {
                  if (err) {
                    console.error(err);
                    return;
                  }
                  const register = async () => {
                    const params = {
                        username,
                        password: hash,
                        email,
                        first_name,
                        last_name,
                        gender
                    };
                   const res = await registerAPI(params);
                   console.log(res);
                   if(res.message === 'Username already exists') {
                       setState(false);
                       alert('Tên đăng nhập đã tồn tại!');
                   } else if (res.message === 'Error') {
                          alert('Đăng ký thất bại!');
                   }    
                    else if (res.message === 'Success') {
                        alert('Đăng ký thành công!');
                        navigate('/login');
                   }
                };
                register();
                });
              });
            
        } else {
            alert('Vui lòng nhập đầy đủ thông tin');
        }
    }
    const handleLoginWithFacebook = () => {}
    const handleLoginWithGoogle = () => {}

    return ( 
        <div className='container-custom'>
            <div className="flex justify-center items-center my-10">
                <div className="flex border border-red-500 mx-40" >
                    <div className='p-5 w-3/4'>
                        <h1 className='font-semibold text-lg mb-3'>Đăng nhập tài khoản</h1>
                        {state === false ? <p className='text-red-500 my-2'>Tên đăng nhập đã tồn tại!</p> : ''}
                        <form action="" ref={ref}>
                            {/* name */}
                            <label htmlFor="first_name" className='font-semibold mb-4'>Họ <span className="text-red-500">*</span></label>
                            <input type="text" name="first_name" id="first_name" className="mt-2 mb-4 border border-gray-300 py-2 pl-3 w-full rounded-md focus:outline-none" placeholder="Họ" />
                            <label htmlFor="last-name" className='font-semibold mt-3'>Tên <span className="text-red-500">*</span></label>
                            <input type="text" name="last_name" id="last-name" className="mt-2 mb-4 border border-gray-300 py-2 pl-3 w-full rounded-md focus:outline-none" placeholder="Tên" />
                            {/* gender */}
                            <div className='mb-4 mt-2'>
                                <label htmlFor="" className='font-semibold mt-3'>Giới tính <span className='text-red-500'>*</span> </label>
                                <label htmlFor="male" className='ml-4'>Nữ</label>
                                <input type="radio" defaultChecked name='gender' id='male' className='ml-2' value='Nữ'/>
                                <label htmlFor="female" className='ml-4'>Nam</label>
                                <input type="radio" name='gender' id='female' className='ml-2' value="Nam" />
                            </div>
                            {/* username */}
                            <label htmlFor="username" className='font-semibold mt-3'>Tên đăng nhập <span className="text-red-500">*</span></label>
                            <input type="text" name="username" id="username" className="mt-2 mb-4 border border-gray-300 py-2 pl-3 w-full rounded-md focus:outline-none" placeholder="Tên đăng nhập" />
                            {/* password */}
                            <label htmlFor="password" className='font-semibold mt-3'>Mật khẩu <span className="text-red-500">*</span></label>
                            <input type="password" name="password" id="password" className="mt-2 mb-4 border border-gray-300 py-2 pl-3 w-full rounded-md focus:outline-none" placeholder="Mật khẩu" />
                            {/* email */}
                            <label htmlFor="email" className='font-semibold mt-3'>Email <span className="text-red-500">*</span></label>
                            <input type="email" name="email" id="email" className="mt-2 mb-4 border border-gray-300 py-2 pl-3 w-full rounded-md focus:outline-none" placeholder="Email" />
                            <button type='submit' className="bg-red-600 hover:bg-yellow-400 uppercase font-semibold tracking-widest text-white p-2 rounded-md w-full mt-4" onClick={handleRegister}>Đăng ký</button>
                        </form>                
                        <div className='text-center relative my-4'>
                            <label htmlFor="" className='text-gray-300 absolute -top-1 left-16'>_________________</label>
                            <label>Hoặc đăng nhập bằng</label>
                            <label htmlFor="" className='text-gray-300 absolute -top-1 right-16'>_________________</label>
                        </div>
                        <div className='flex justify-center items-center'>
                            <img src={fb} alt="Login with Facebook" className='h-16 w-32 mr-1 cursor-pointer' onClick={handleLoginWithFacebook}/>
                            <img src={gg} alt="Login with Google" className='h-16 w-32 ml-1 cursor-pointer' onClick={handleLoginWithGoogle}/>
                        </div>
                    </div>
                    <div className='w-1/2 bg-red-500 text-white flex items-center'>
                        <div className='w-full'>
                            <h1 className='text-xl font-semibold text-center uppercase'>Quyền lợi thành viên</h1>
                            <ul className='list-disc list-inside ml-5 my-5'>
                                <li className='my-2'>Vận chuyển siêu tốc</li>
                                <li className='my-2'>Thanh toán an toàn</li>
                                <li className='my-2'>Đổi trả dễ dàng</li>
                                <li className='my-2'>Ưu đãi đặc biệt</li>
                                <li className='my-2'>Tích điểm đổi quà</li>
                            </ul>
                            <div className='flex justify-center mt-3'>
                                <Link to={'/register'} className='py-2 px-4 border border-white rounded hover:bg-yellow-400 font-semibold'>Đăng nhập</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Register;