import { deleteProductCart } from '../api/cart';

const initState = [];

function cartReducer(state = initState, action) {
    switch (action.type) {
        case 'DELETE_CART':
            const select = action.data;
            select.map((id) => {
                const deleteProduct = async () => {
                    const params = {
                        id_sanpham: id,
                        id_khachhang: localStorage.getItem('id_khachhang'),
                    };
                    await deleteProductCart(params);
                    document.querySelector('.cart-' + id).remove();
                    for (let i = 0; i < select.length; i++) {
                        if (select[i] === id) {
                            select.splice(i, 1);
                        }
                    }
                };
                deleteProduct();
                return state;
            });
            return state;
        case 'PAY':
            let array = [];
            const { selectTitlePay, selectPricePay, id_product, selectQuatity } = action.data;
            for (let i = 0; i < selectTitlePay.length; i++) {
                let ob = {
                    id_product: id_product[i],
                    title: selectTitlePay[i],
                    price: selectPricePay[i],
                    quatity: selectQuatity[i],
                };
                array.push(ob);
            }
            return array;

        case 'RESET':
            return [];

        default:
            return state;
    }
}

export default cartReducer;
