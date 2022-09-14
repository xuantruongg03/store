import 'bootstrap/dist/css/bootstrap.min.css';
import clsx from 'clsx';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import style from './Pay.module.scss';

function PayInput(props) {
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
        props.func.setConscious(e.target.value);
    };
    const handleSelectDistrict = (e) => {
        props.func.setDistrict(e.target.value);
    };
    const handleSelectCity = (e) => {
        props.func.setCity(e.target.value);
    };
    const handleInputNotes = (e) => {
        props.func.setNotes(e.target.value);
    };
    return (
        <Form>
            <br />
            <Row className={clsx('mb-3')}>
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label className={style.label}>
                        Họ tên<span style={{ color: 'red' }}>*</span>{' '}
                    </Form.Label>
                    <Form.Control type="fullName" placeholder="VD: Nguyễn Văn A" onChange={handleInputName} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhone">
                    <Form.Label className={style.label}>
                        Số điện thoại<span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Control type="phone" placeholder="VD: 0981793201" onChange={handleInputPhone} />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label className={style.label}>
                    Địa chỉ nhận hàng<span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control placeholder="VD: 147 An Dương Vương" onChange={handleInputAddress} />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className={style.label}>
                        Tỉnh/Thành Phố<span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Select defaultValue="--Chọn Tỉnh/Thành Phố--" onChange={handleSelectCity}>
                        <option disabled>--Chọn Tỉnh/Thành Phố--</option>
                        <option value={'Bình Định'}>Bình Định</option>
                        <option value={'HCM'}>HCM</option>
                        <option value={'Bình Dương'}>Bình Dương</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className={style.label}>
                        Chọn Quận/Huyện<span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Select defaultValue="--Chọn Quận/Huyện--" onChange={handleSelectDistrict}>
                        <option disabled>--Chọn Quận/Huyện--</option>
                        <option value={'TP.Quy Nhơn'}>TP.Quy Nhơn</option>
                        <option value={'TP.Quy Nhơn'}>TP.Quy Nhơn</option>
                        <option value={'TP.Quy Nhơn'}>TP.Quy Nhơn</option>
                    </Form.Select>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className={style.label}>
                        Chọn Xã/Phường<span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Select defaultValue="--Chọn Xã/Phường--" onChange={handleSelectConscious}>
                        <option disabled>--Chọn Xã/Phường--</option>
                        <option value={'Nguyễn Văn Cừ'}>Nguyễn Văn Cừ</option>
                        <option value={'Nguyễn Văn Cừ 2'}>Nguyễn Văn Cừ 2</option>
                        <option value={'Nguyễn Văn Cừ 3'}>Nguyễn Văn Cừ 3</option>
                    </Form.Select>
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
