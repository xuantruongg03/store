const initState = {
    title: [],
    price: [],
};
function cartReducer(state = initState, action) {
    switch (action.type) {
        case 'DELETE_CART':
            // xoa sp
            const select = action.payload;
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            };
            select.map((id) => {
                fetch('http://localhost:3000/cart/' + id, requestOptions).then((response) => {
                    document.querySelector('.cart-' + id).remove();
                    // xóa id đã gửi yêu cầu delete
                    for (let i = 0; i < select.length; i++) {
                        if (select[i] === id) {
                            select.splice(i, 1);
                        }
                    }
                });
                return state;
            });
            return state;
        case 'PAY':
            localStorage.setItem('selectTitlePay', action.data.selectTitlePay);
            localStorage.setItem('selectPricePay', action.data.selectPricePay);
            return [action.data];

        case 'RESET':
            return [];

        default:
            return state;
    }
}

export default cartReducer;
