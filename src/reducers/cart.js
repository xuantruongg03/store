const initState = [];
function cartReducer(state = initState, action) {
    switch (action.type) {
        case 'DELETE_CART':
            // xoa sp
            const select = action.data;
            select.map((id) => {
                fetch(`http://localhost:8000/api/v1/cart/delete-product-cart/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_sanpham: id,
                        id_khachhang: localStorage.getItem('id_khachhang'),
                    }),
                }).then(
                    (res) => {
                        document.querySelector('.cart-' + id).remove();
                        // xóa id đã gửi yêu cầu delete
                        for (let i = 0; i < select.length; i++) {
                            if (select[i] === id) {
                                select.splice(i, 1);
                            }
                        }
                    },
                );
                return state;
            });
            return state;
        case 'PAY':
            let array = []
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
