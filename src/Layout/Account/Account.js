import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import image from '../../access/image/avatar.jpg';
import style from './Account.module.scss';

function Account() {
    const [path, setPath] = useState('profile');
    const [data, setData] = useState({});
    const [avatar, setAvatar] = useState();
    const [name, setName] = useState('');
    const id = localStorage.getItem('id_khachhang');

    const hideEmail = (email) => {
        email = email ? email : 'abc@gmail.com';
        return email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, '$1***@$2');
    };

    const hidePhoneNumber = (phone) => {
        phone = phone ? phone : '';
        return phone.replace(/(\w{3})\w+/, '$1***');
    };

    const hidePassword = (password) => {
        password = password ? password : '';
        return password.replace(/./g, '*');
    };

    const handleInputName = (e) => {
        setName(e.target.value);
    };

    const handleInputAvatar = (e) => {
        var myWidget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'dcweof28t',
                uploadPreset: 'uwkwlwgp',
            },
            (error, result) => {
                if (!error && result && result.event === 'success') {
                    // console.log('Done! Here is the image info: ', result.info);
                    setAvatar(result.info.secure_url);
                }
            },
        );
        myWidget.open();
    };

    const handleSave = (e) => {
        if (name !== data.ho + ' ' + data.ten || avatar !== undefined) {
            let ho = name.split(' ').slice(0, -1).join(' ');
            let ten = name.split(' ').slice(-1).join(' ');
            const data = {
                id_khachhang: id,
                ho: ho,
                ten: ten,
                avatar: avatar,
            };
            axios
                .post('http://localhost:8080/api/v1/update-user', data, {
                    onUploadProgress: (event) => console.log(event),
                })
                .then((res) => {
                    if (res.status === 200) {
                        alert('Cập nhật thành công! Vui lòng đăng nhập lại.');
                        // window.location.reload();
                    }
                });
        }
    };

    const handleChangePath = (e) => {
        setPath(e.target.id);
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/get-user/${id}`).then((res) => {
            setData(res.data.data[0]);
            setName(res.data.data[0].ho + ' ' + res.data.data[0].ten);
            setAvatar(res.data.data[0].avatar);
        });
    }, [id]);

    return (
        <div className={style.boxAccount}>
            <div className={style.nav}>
                <div className={style.boxAvatarLeft}>
                    <img src={avatar || image} alt="Avatar" className={style.img} id="avatar" />
                    <label>{data.tendangnhap}</label>
                </div>
                <div className={style.boxTitle}>
                    <FontAwesomeIcon icon={faUser} className={style.icon} />
                    <label className={style.title}>Thông tin tài khoản</label>
                </div>
                <label className={style.labelItem} onClick={handleChangePath} id="profile">
                    Hồ sơ
                </label>
                <label className={style.labelItem} onClick={handleChangePath} id="bank">
                    Liên kết ngân hàng
                </label>
                <label className={style.labelItem} onClick={handleChangePath} id="password">
                    Đổi mật khẩu
                </label>
                <label className={style.labelItem} onClick={handleChangePath} id="email">
                    Đổi Email
                </label>
                <label className={style.labelItem} onClick={handleChangePath} id="phone">
                    Đổi Số điện thoại
                </label>
            </div>
            {(() => {
                switch (path) {
                    case 'profile':
                        return (
                            <div className={style.inf}>
                                <div className={style.boxInf}>
                                    <h1 className={style.title}>Hồ sơ của tôi</h1>
                                    <div>
                                        <div className={style.item}>
                                            <label className={style.label}>Tên đăng nhập: </label>
                                            <div className={style.value}>{data.tendangnhap}</div>
                                        </div>
                                        <div className={style.item}>
                                            <label className={style.label}>Họ tên: </label>
                                            <input
                                                // style={{ border: '1px solid rgb(182, 181, 181)' }}
                                                className={style.value}
                                                name="name"
                                                style={{border: '1px solid rgb(205, 204, 204)'}}
                                                onChange={handleInputName}
                                                defaultValue={name}
                                            />
                                        </div>
                                        <div className={style.item}>
                                            <label className={style.label}>Email: </label>
                                            <div className={style.value}>{hideEmail(data.email)}</div>
                                        </div>
                                        <div className={style.item}>
                                            <label className={style.label}>Số điện thoại: </label>
                                            <div className={style.value}>{hidePhoneNumber(data.dienthoai)}</div>
                                        </div>
                                        <div className={style.item}>
                                            <label className={style.label}>Mật khẩu: </label>
                                            <div className={style.value}>{hidePassword(data.matkhau)}</div>
                                        </div>
                                        <button className={style.btnSave} onClick={handleSave}>
                                            Lưu
                                        </button>
                                    </div>
                                </div>
                                <div className={style.boxAvatar}>
                                    <img src={avatar || image} alt="Avatar" className={style.avatar} id="avatar" />
                                    <button className={style.btnSelect} onClick={handleInputAvatar}>
                                        Chọn Ảnh
                                    </button>
                                </div>
                            </div>
                        );
                    case 'bank':
                        return <div className={style.boxBanking}>
                            <h1 className={style.title}>Đang cập nhật</h1>
                        </div>;
                    case 'password':
                        return (
                            <div className={style.boxChangePassword}>
                                <h1 className={style.title}>Đổi mật khẩu</h1>
                                <div>
                                    <div className={style.group}>
                                        <label className={style.labelChangePass}>Nhập mật khẩu cũ:</label>
                                        <input className={style.inputChangePass} />
                                        <label className={style.forgetPass}>Quên mật khẩu?</label>
                                    </div>
                                    <div className={style.group}>
                                        <label className={style.labelChangePass}>Nhập mật khẩu mới:</label>
                                        <input className={style.inputChangePass} />
                                    </div>
                                    <div className={style.group}>
                                        <label className={style.labelChangePass}>Nhập lại mật khẩu:</label>
                                        <input className={style.inputChangePass} />
                                    </div>
                                </div>
                                <button className={style.btnSave}>Lưu</button>
                            </div>
                        );
                    case 'email':
                        return (
                            <div className={style.boxChangeEmail}>
                                <h1 className={style.title}>Đổi điạ chỉ Email</h1>
                                <div>
                                    <div className={style.group}>
                                        <label className={style.labelChangePass}>Nhập Email cũ:</label>
                                        <input className={style.inputChangePass} />
                                    </div>
                                    <div className={style.group}>
                                        <label className={style.labelChangePass}>Nhập Email mới:</label>
                                        <input className={style.inputChangePass} />
                                    </div>
                                    <div className={style.group}>
                                        <label className={style.labelChangePass}>Nhập mã xác minh:</label>
                                        <input className={style.inputCapcha} />
                                    </div>
                                </div>
                                <button className={style.btnSave}>Lưu</button>
                            </div>
                        );
                    case 'phone':
                        return (
                            <div className={style.boxChangePhone}>
                                <h1 className={style.title}>Đổi số điện thoại</h1>
                                <div>
                                    <div className={style.group}>
                                        <label className={style.labelChangePass}>Nhập số điện thoại cũ:</label>
                                        <input className={style.inputChangePass} />
                                    </div>
                                    <div className={style.group}>
                                        <label className={style.labelChangePass}>Nhập số điện thoại mới:</label>
                                        <input className={style.inputChangePass} />
                                    </div>
                                    <div className={style.group}>
                                        <label className={style.labelChangePass}>Nhập mã xác minh:</label>
                                        <input className={style.inputCapcha} />
                                    </div>
                                </div>
                                <button className={style.btnSave}>Lưu</button>
                            </div>
                        );
                    default:
                        return <div>No Page</div>;
                }
            })()}
        </div>
    );
}

export default Account;
