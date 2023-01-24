import 'bootstrap/dist/css/bootstrap.min.css';
import clsx from 'clsx';
import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import select from './db.json';
import style from './Pay.module.scss';

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
        <Form>
            <br />
            <Row className={clsx('mb-3', style.formGroup)}>
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label className={style.label}>
                        Họ tên<span style={{ color: 'red' }}>*</span>{' '}
                    </Form.Label>
                    <Form.Control type="fullName" placeholder="VD: Nguyễn Văn A" onChange={handleInputName} />
                    {props.data.name === '' ? (
                        <label className={style.labelError}>Vui lòng nhập thông tin!</label>
                    ) : null}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhone">
                    <Form.Label className={style.label}>
                        Số điện thoại<span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Control type="phone" placeholder="VD: 0981793201" onChange={handleInputPhone} />
                    {props.data.phone === '' ? (
                        <label className={style.labelError}>Vui lòng nhập thông tin!</label>
                    ) : (
                        ''
                    )}
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label className={style.label}>
                    Địa chỉ nhận hàng<span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control placeholder="VD: 147 An Dương Vương" onChange={handleInputAddress} />
                {props.data.address === '' ? (
                    <label className={style.labelError}>Vui lòng nhập thông tin!</label>
                ) : null}
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className={style.label}>
                        Tỉnh/Thành Phố<span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Select defaultValue="--Chọn Tỉnh/Thành Phố--" onChange={handleSelectCity}>
                        <option disabled>--Chọn Tỉnh/Thành Phố--</option>
                        {select.map((item, index) => {
                            return (
                                <option key={index} value={item.Id}>
                                    {item.Name}
                                </option>
                            );
                        })}
                    </Form.Select>
                    {props.data.errorAddress ? null : (
                        <label className={style.labelError}>Vui lòng nhập thông tin!</label>
                    )}
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className={style.label}>
                        Chọn Quận/Huyện<span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Select defaultValue="--Chọn Quận/Huyện--" onChange={handleSelectDistrict}>
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
                    </Form.Select>
                    {props.data.errorAddress ? null : (
                        <label className={style.labelError}>Vui lòng nhập thông tin!</label>
                    )}
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className={style.label}>
                        Chọn Xã/Phường<span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Select defaultValue="--Chọn Xã/Phường--" onChange={handleSelectConscious}>
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
                    </Form.Select>
                    {props.data.errorAddress ? null : (
                        <label className={style.labelError}>Vui lòng nhập thông tin!</label>
                    )}
                </Form.Group>
            </Row>
            <Row>
                <Form.Group className={clsx('mt-3')}>
                    <Form.Label className={style.label}>Nhập mã giảm giá</Form.Label>
                    <Form.Control placeholder="VD: A123" />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group className={clsx('mt-3')}>
                    <Form.Label className={style.label}>Nhập ghi chú cho đơn hàng</Form.Label>
                    <Form.Control
                        className={style.formNote}
                        as="textarea"
                        placeholder="VD: Hàng dễ vỡ..."
                        rows={5}
                        onChange={handleInputNotes}
                    />
                </Form.Group>
            </Row>
        </Form>
    );
}

export default PayInput;
