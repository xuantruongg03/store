import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import clsx from 'clsx';
import 'bootstrap/dist/css/bootstrap.min.css';

import style from './Pay.module.scss';

function PayInput() {
    return (
        <Form>
            <br />
            <Row className={clsx('mb-3')}>
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label className={style.label}>
                        Họ tên<span style={{ color: 'red' }}>*</span>{' '}
                    </Form.Label>
                    <Form.Control type="fullName" placeholder="VD: Nguyễn Văn A" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhone">
                    <Form.Label className={style.label}>
                        Số điện thoại<span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Control type="phone" placeholder="VD: 0981793201" />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label className={style.label}>
                    Địa chỉ nhận hàng<span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control placeholder="VD: 147 An Dương Vương" />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className={style.label}>
                        Tỉnh/Thành Phố<span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Select defaultValue="Bình Định">
                        <option>--Chọn Tỉnh/Thành Phố--</option>
                        <option>Bình Định</option>
                        <option>Bình Định</option>
                        <option>Bình Định</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className={style.label}>
                        Chọn Quận/Huyện<span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Select defaultValue="Quy Nhơn">
                        <option>--Chọn Quận/Huyện--</option>
                        <option>TP.Quy Nhơn</option>
                        <option>TP.Quy Nhơn</option>
                        <option>TP.Quy Nhơn</option>
                    </Form.Select>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className={style.label}>
                        Chọn Xã/Phường<span style={{ color: 'red' }}>*</span>
                    </Form.Label>
                    <Form.Select defaultValue="Quy Nhơn">
                        <option>--Chọn Xã/Phường--</option>
                        <option>Nguyễn Văn Cừ</option>
                        <option>Nguyễn Văn Cừ</option>
                        <option>Nguyễn Văn Cừ</option>
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
                    <Form.Control className={style.formNote} as="textarea" placeholder="VD: Hàng dễ vỡ..." rows={5} />
                </Form.Group>
            </Row>
        </Form>
    );
}

export default PayInput;
