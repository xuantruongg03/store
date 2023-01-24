import 'bootstrap/dist/css/bootstrap.min.css';
import clsx from 'clsx';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { Link } from 'react-router-dom';
import formatsMoney from 'src/Convert/ConvertMoneyVND';
import style from './Pay.module.scss';

function PayOutput(props) {
    const sale = 0;
    const freeship = 0;
    let totalPrice = 0;
    props.data.map((element) => {
        return (totalPrice += element.price * element.quatity);
    });
    totalPrice -= sale + freeship;

    const handleSelectpayment = (e) => {
        props.setPayment(e.target.value);
    };
    return (
        <Form className={clsx(style.output)}>
            <Form.Label className={clsx(style.label, 'mt-2', style.title)}>Thông Tin Đơn Hàng</Form.Label>
            <Row>
                <Form.Group className={style.flex}>
                    <Form.Label className={style.label} style={{ textTransform: 'uppercase', fontWeight: '700' }}>
                        Sản Phẩm
                    </Form.Label>
                    <Form.Label className={style.label} style={{ textTransform: 'uppercase', fontWeight: '700' }}>
                        Tạm Tính
                    </Form.Label>
                </Form.Group>
                <div className={style.bri} />
            </Row>
            <Row>
                <Form.Group className={style.flex}>
                    <div>
                        {props.data.map((element, index) => (
                            <li key={index} style={{ padding: '0', display: 'block' }}>
                                <Form.Label className={style.label}>
                                    {element.title} x {element.quatity}
                                </Form.Label>
                            </li>
                        ))}
                    </div>
                    <Form.Label className={clsx(style.label, style.provisional)}>{formatsMoney(totalPrice)}</Form.Label>
                </Form.Group>
                <div className={style.bri} />
            </Row>

            <Row>
                <Form.Group className={style.flex}>
                    <Form.Label className={style.label}>Mã giảm giá</Form.Label>
                    <Form.Label className={clsx(style.label, style.provisional)}>{`-` + formatsMoney(sale)}</Form.Label>
                </Form.Group>
                <div className={style.bri} />
            </Row>
            <Row>
                <Form.Group className={style.flex}>
                    <Form.Label className={style.label}>Phí vận chuyển</Form.Label>
                    <Form.Label className={clsx(style.label, style.provisional)}>{formatsMoney(freeship)}</Form.Label>
                </Form.Group>
                <div className={style.bri} />
            </Row>
            <Row>
                <Form.Group className={style.flex}>
                    <Form.Label className={style.label}>Tổng tiền</Form.Label>
                    <Form.Label className={clsx(style.label, style.provisional)}>{formatsMoney(totalPrice)}</Form.Label>
                </Form.Group>
                <div className={style.bri} />
            </Row>
            <Row>
                <Form.Group>
                    <Form.Label className={style.label} style={{ minWidth: '400px' }}>
                        Chọn hình thức thanh toán
                    </Form.Label>
                </Form.Group>
                <div className={style.bri} />
            </Row>

            <Row key="radio">
                <Form.Group>
                    <Form.Check
                        onClick={handleSelectpayment}
                        value="Thanh toán khi nhận hàng"
                        type="radio"
                        name="flexRadioDefault"
                        defaultChecked
                        id="flexRadioDefault2"
                        label="Thanh toán bằng khi nhận hàng (COD)"
                    />
                    <br />
                    <Form.Check
                        onClick={handleSelectpayment}
                        value="Chuyển khoản"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        label="Thanh toán bằng Internet Banking"
                    />
                </Form.Group>
            </Row>
            <Button variant="primary" className={style.button}>
                <Link to={'/pay-complete'} className={style.link} onClick={props.buy}>
                    Xác Nhận Thanh Toán
                </Link>
            </Button>
        </Form>
    );
}

export default PayOutput;
