import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { getUserAPI } from '../../api/user';
import Address from './ListAddress';
import ChangePass from './ChangePass';
import Orders from './Orders';
import User from './User';
import style from "./Account.module.scss"

function Account() {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState('user');

    useEffect(() => {
      const user = async () => {
          const res = await getUserAPI();
        setUser(res.data[0]);
        setLoading(false);
      };
      user();
  }, []);

    if (loading) {
        return (
          <div className="box-loader">
            <span className="loader"></span>
          </div>
        );
      }

    return ( 
        <div className={clsx("container-custom my-10 flex", style.container)}>
            <nav className="flex flex-col w-80" >
                <h1 className="text-xl font-semibold uppercase">Trang tài khoản</h1>
                <p className="font-semibold mt-2 mb-2" >Xin chào, <span className="text-red-500">Xuân Trường</span> !</p>
                <div className='flex flex-col'>
                    <div className='my-3'><label className={clsx(' cursor-pointer hover:text-yellow-400', show === 'user' ? 'text-yellow-400' : '')}  onClick={() => {setShow('user')}}>Thông tin tài khoản</label></div>
                    <div className='my-3'><label className={clsx(' cursor-pointer hover:text-yellow-400', show === 'orders' ? 'text-yellow-400' : '')}  onClick={() => {setShow('orders')}}>Đơn hàng của bạn</label></div>
                    <div className='my-3'><label className={clsx(' cursor-pointer hover:text-yellow-400', show === 'changePass' ? 'text-yellow-400' : '')}  onClick={() => {setShow('changePass')}}>Đổi mật khẩu</label></div>
                    <div className='my-3'><label className={clsx(' cursor-pointer hover:text-yellow-400', show === 'address' ? 'text-yellow-400' : '')} onClick={() => {setShow('address')}}>Sổ địa chỉ</label></div>
                </div>
            </nav>
            <div className={clsx("flex flex-col w-3/4", style.box)}>
                {(() => {
                    switch (show) {
                        case 'user': return <User data={user} />;
                        case 'orders': return <Orders />;
                        case 'changePass': return <ChangePass />;
                        case 'address': return <Address />;
                        default: return <User data={user}/>;
                    }
                })()}    
            </div>
        </div>
     );
}

export default Account;