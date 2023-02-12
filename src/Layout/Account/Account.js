import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { getUser, updateUserAPI } from 'src/api/user';
import image from '../../access/image/avatar.jpg';
import style from './Account.module.scss';

function Account() {
    const [path, setPath] = useState('profile');
    const [data, setData] = useState({});
    const [avatar, setAvatar] = useState();
    const [name, setName] = useState('');

    const hideEmail = (email) => {
        email = email ? email : 'abc@gmail.com';
        return email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, '$1***@$2');
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
                cloudName: 'dvyutdqkj',
                uploadPreset: 'ol04pjez',
                multiple: false,
                folder: "image_users"
            },
            (error, result) => {
                if (!error && result && result.event === 'success') {
                    setAvatar(result.info.secure_url);
                }
            },
        );
        myWidget.open();
    };

    const handleSave = (e) => {
        let first_name = name.split(' ').slice(0, -1).join(' ');
        let last_name = name.split(' ').slice(-1).join(' ');
        const update = async () => {
            const params = {
                first_name: first_name,
                last_name: last_name,
                avatar: avatar,
            };
            const res = await updateUserAPI(params);
            if (res.message === 'ok') {
                alert('Cập nhật thành công!');
                window.location.reload();
            }
        };
        if (name !== data.first_name + ' ' + data.last_name || avatar !== data.avatar) {
            update();
        }
    };

    const handleChangePath = (e) => {
        setPath(e.target.id);
    };

    useEffect(() => {
        const user = async () => {
            const res = await getUser();
            setData(res.data[0]);
            setName(res.data[0].first_name + ' ' + res.data[0].last_name);
            setAvatar(res.data[0].avatar);
        };
        user();
    }, []);

    return (
        <div className={style.boxAccount}>
            <div className={style.nav}>
                <div className={style.boxAvatarLeft}>
                    <img src={avatar || image} alt="Avatar" className={style.img} id="avatar" />
                    <label>{data.username}</label>
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
                                            <div className={style.value}>{data.username}</div>
                                        </div>
                                        <div className={style.item}>
                                            <label className={style.label}>Họ tên: </label>
                                            <input
                                                // style={{ border: '1px solid rgb(182, 181, 181)' }}
                                                className={style.value}
                                                name="name"
                                                style={{ border: '1px solid rgb(205, 204, 204)' }}
                                                onChange={handleInputName}
                                                defaultValue={name}
                                            />
                                        </div>
                                        <div className={style.item}>
                                            <label className={style.label}>Email: </label>
                                            <div className={style.value}>{hideEmail(data.email)}</div>
                                        </div>
                                        <div className={style.item}>
                                            <label className={style.label}>Mật khẩu: </label>
                                            <div className={style.value}>{hidePassword(data.password)}</div>
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
                        return (
                            <div className={style.boxBanking}>
                                <h1 className={style.title}>Đang cập nhật</h1>
                            </div>
                        );
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
