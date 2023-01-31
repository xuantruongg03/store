import { buy, deleteProductCart } from 'src/api/cart';

const initState = {
    name: '',
    phone: '',
    address: '',
    conscious: '',
    district: '',
    city: '',
    titleProduct: [],
    price: 0,
    notes: '',
    payments: '',
};
function payReducer(state = initState, action) {
    switch (action.type) {
        case 'BUY':
            const data = action.data;
            const product = action.data.product;
            const id_khachhang = localStorage.getItem('id_khachhang');
            const tennguoinhan = data.name;
            const sdtnguoinhan = data.phone;
            const diachinhan = `${data.address} - ${data.conscious} - ${data.district}`;
            const ghichu = data.notes;
            const hinhthucthanhtoan = data.payment;
            const giamgia = 0;
            product.map((element) => {
                const Buy = async () => {
                    const params = {
                        id_khachhang,
                        id_sanpham: element.id_product,
                        tennguoinhan,
                        sdtnguoinhan,
                        diachinhan,
                        ghichu,
                        hinhthucthanhtoan,
                        soluong: element.soluong,
                        giamgia,
                    };
                    await buy(params);
                };
                const deleteCart = async () => {
                    const params = {
                        id_sanpham: element.id_product,
                        id_khachhang: localStorage.getItem('id_khachhang'),
                    };
                    await deleteProductCart(params);
                    console.log(element.id_product);
                    document.querySelector('.cart-' + element.id_product).remove();
                };
                Buy();
                deleteCart();
                return state;
            });
            return state;
        default:
            return state;
    }
}

export default payReducer;
