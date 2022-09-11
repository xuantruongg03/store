import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import clsx from 'clsx';
import 'bootstrap/dist/css/bootstrap.min.css';

import style from './Pay.module.scss';
import formatsMoney from 'src/Convert/ConvertMoneyVND';
import { Link } from 'react-router-dom';

function PayOutput(props) {
    const totalPrice = props.data.price - props.data.sale - props.data.freeship;

    return (
        <Form className={clsx(style.output)}>
            <Form.Label className={clsx(style.label, 'mt-2', style.title)}>Thông Tin Đơn Hàng</Form.Label>
            <Row>
                <Form.Group className={style.flex}>
                    <Form.Label className={style.label} style = {{textTransform: "uppercase", fontWeight: "700"}}>Sản Phẩm</Form.Label>
                    <Form.Label className={style.label} style = {{textTransform: "uppercase", fontWeight: "700"}}>Tạm Tính</Form.Label>
                </Form.Group>
                <bri />
            </Row>

            <Row>
                <Form.Group className={style.flex}>
                    <Form.Label className={style.label}>{props.data.title}</Form.Label>
                    <Form.Label className={clsx(style.label, style.provisional)}>
                        {formatsMoney(props.data.price)}
                    </Form.Label>
                </Form.Group>
                <bri />
            </Row>

            <Row>
                <Form.Group className={style.flex}>
                    <Form.Label className={style.label}>Mã giảm giá</Form.Label>
                    <Form.Label className={clsx(style.label, style.provisional)}>
                        {`-` + formatsMoney(props.data.sale)}
                    </Form.Label>
                </Form.Group>
                <bri />
            </Row>
            <Row>
                <Form.Group className={style.flex}>
                    <Form.Label className={style.label}>Phí vận chuyển</Form.Label>
                    <Form.Label className={clsx(style.label, style.provisional)}>
                        {formatsMoney(props.data.freeship)}
                    </Form.Label>
                </Form.Group>
                <bri />
            </Row>
            <Row>
                <Form.Group className={style.flex}>
                    <Form.Label className={style.label}>Tổng tiền</Form.Label>
                    <Form.Label className={clsx(style.label, style.provisional)}>{formatsMoney(totalPrice)}</Form.Label>
                </Form.Group>
                <bri />
            </Row>
            <Row>
                <Form.Group>
                    <Form.Label className={style.label} style={{ minWidth: '400px' }}>
                        Chọn hình thức thanh toán
                    </Form.Label>
                </Form.Group>
                <bri />
            </Row>

            <Row key="radio">
                <Form.Group>
                    <Form.Check
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        label="Thanh toán bằng khi nhận hàng (COD)"
                    />
                    <br />
                    <Form.Check
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        label="Thanh toán bằng Internet Banking"
                    />
                </Form.Group>
            </Row>
            <Button variant="primary" type="submit" className={style.button}>
                <Link to = {"/paycomplete"} className = {style.link}>Xác Nhận Thanh Toán</Link>
            </Button>
        </Form>
    );
}

export default PayOutput;
