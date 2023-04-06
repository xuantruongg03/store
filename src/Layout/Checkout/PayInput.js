import clsx from 'clsx';
import { useState } from 'react';
import style from './Pay.module.scss';
import select from './db.json';

function PayInput(props) {
    const [idCity, setIdCity] = useState();
    const [idDistrict, setIdDistrict] = useState();
    const handleInputName = (e) => {
        props.func.setName(e.target.value);
    };
    const handleInputPhone = (e) => {
        props.func.setPhone(e.target.value);
    };
    const handleInputAddress = (e) => {
        props.func.setAddress(e.target.value);
    };
    const handleSelectConscious = (e) => {
        let resultCity = select.find((element) => element.Id === idCity);
        let resultDistrict = resultCity.Districts.find((element) => element.Id === idDistrict);
        let resultConsciou = resultDistrict.Wards.find((element) => element.Id === e.target.value);
        props.func.setConscious(resultConsciou.Name);
    };
    const handleSelectDistrict = (e) => {
        setIdDistrict(e.target.value);
        let resultCity = select.find((element) => element.Id === idCity);
        let resultDistrict = resultCity.Districts.find((element) => element.Id === e.target.value);
        props.func.setDistrict(resultDistrict.Name);
    };
    const handleSelectCity = (e) => {
        setIdCity(e.target.value);
        let result = select.find((element) => element.Id === e.target.value);
        props.func.setCity(result.Name);
    };
    const handleInputNotes = (e) => {
        props.func.setNotes(e.target.value);
    };

    return (
        <form action='' method='post' className='w-1/2 mt-7'>
            <div className='mb-3 flex justify-between '>
                <div className='flex flex-col'>
                    <label className={style.label}>
                        Họ tên<span style={{ color: 'red' }}>*</span>{' '}
                    </label>
                    <input className='border focus:outline-none border-gray-400 w-64 pl-3 py-1 mt-2 rounded-md' type="text" placeholder="VD: Nguyễn Văn A" onChange={handleInputName} />
                    {props.data.name === '' ? (
                        <label className={style.labelError}>Vui lòng nhập thông tin!</label>
                    ) : null}
                </div>

                <div className='flex flex-col'>
                    <label className={style.label}>
                        Số điện thoại<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input type="text" className='border focus:outline-none border-gray-400 w-64 pl-3 py-1 mt-2 rounded-md' placeholder="VD: 0981793201" onChange={handleInputPhone} />
                    {props.data.phone === '' ? (
                        <label className={style.labelError}>Vui lòng nhập thông tin!</label>
                    ) : (
                        ''
                    )}
                </div>
            </div>

            <div className='mb-3 flex flex-col'>
                <label className={style.label}>
                    Địa chỉ nhận hàng<span style={{ color: 'red' }}>*</span>
                </label>
                <input className='border focus:outline-none border-gray-400 w-full pl-3 py-1 mt-2 rounded-md' placeholder="VD: 147 An Dương Vương" onChange={handleInputAddress} />
                {props.data.address === '' ? (
                    <label className={style.labelError}>Vui lòng nhập thông tin!</label>
                ) : null}
            </div>

            <div className="my-3 flex justify-between w-full">
                <div className='w-1/2 mr-2'>
                    <label className={style.label}>
                        Tỉnh/Thành Phố<span style={{ color: 'red' }}>*</span>
                    </label>
                    <select className='focus:outline-none border border-gray-400 w-full pl-3 py-1 mt-2 rounded-md' defaultValue="--Chọn Tỉnh/Thành Phố--" onChange={handleSelectCity}>
                        <option disabled>--Chọn Tỉnh/Thành Phố--</option>
                        {select.map((item, index) => {
                            return (
                                <option key={index} value={item.Id}>
                                    {item.Name}
                                </option>
                            );
                        })}
                    </select>
                    {props.data.errorAddress ? null : (
                        <label className={style.labelError}>Vui lòng nhập thông tin!</label>
                    )}
                </div>
                <div className='w-1/2 ml-2'>
                    <label className={style.label}>
                        Chọn Quận/Huyện<span style={{ color: 'red' }}>*</span>
                    </label>
                    <select className='border border-gray-400 w-full pl-3 py-1 mt-2 rounded-md focus:outline-none' defaultValue="--Chọn Quận/Huyện--" onChange={handleSelectDistrict}>
                        <option disabled>--Chọn Quận/Huyện--</option>
                        {(() => {
                            const result = select.filter((item) => {
                                return item.Id === idCity;
                            });
                            if (result.length > 0) {
                                return result[0].Districts.map((item, index) => {
                                    return (
                                        <option key={index} value={item.Id}>
                                            {item.Name}
                                        </option>
                                    );
                                });
                            }
                        })()}
                    </select>
                    {props.data.errorAddress ? null : (
                        <label className={style.labelError}>Vui lòng nhập thông tin!</label>
                    )}
                </div>
            </div>

            <div className='my-3'>
                    <label className={style.label}>
                        Chọn Xã/Phường<span style={{ color: 'red' }}>*</span>
                    </label>
                    <select className='border border-gray-400 w-full pl-3 py-1 mt-2 rounded-md focus:outline-none' defaultValue="--Chọn Xã/Phường--" onChange={handleSelectConscious}>
                        <option disabled>--Chọn Xã/Phường--</option>
                        {(() => {
                            const result = select.filter((item) => {
                                return item.Id === idCity;
                            });
                            if (result.length > 0) {
                                const result2 = result[0].Districts.filter((item) => {
                                    return item.Id === idDistrict;
                                });
                                if (result2.length > 0) {
                                    return result2[0].Wards.map((item, index) => {
                                        return (
                                            <option key={index} value={item.Id}>
                                                {item.Name}
                                            </option>
                                        );
                                    });
                                }
                            }
                        })()}
                    </select>
                    {props.data.errorAddress ? null : (
                        <label className={style.labelError}>Vui lòng nhập thông tin!</label>
                    )}
                </div>
            <div className={clsx('my-3 flex flex-col')}>
                    <label className={style.label}>Nhập mã giảm giá</label>
                    <input placeholder="VD: A123" className='focus:outline-none border border-gray-400 w-full pl-3 py-1 mt-2 rounded-md'/>
            </div>
            <div className={clsx('mt-3 flex flex-col')}>
                    <label className={style.label}>Nhập ghi chú cho đơn hàng</label>
                    <input
                        className={clsx(style.formNote, 'focus:outline-none pl-3 border border-gray-400 rounded-md mt-2 w-full')}
                        placeholder="VD: Hàng dễ vỡ..."
                        rows={5}
                        onChange={handleInputNotes}
                    />
                </div>
        </form>
    );
}

export default PayInput;
