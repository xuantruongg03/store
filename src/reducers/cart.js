const initState = {
    title: [],
    price: [],
};
function cartReducer(state = initState, action) {
    switch (action.type) {
        case 'DELETE_CART':
            const select = action.payload;
            select.map((id) => {
                    document.querySelector('.cart-' + id).remove();
                    // xóa id đã gửi yêu cầu delete
                    for (let i = 0; i < select.length; i++) {
                        if (select[i] == id) {
                            select.splice(i, 1);
                        }
                    }
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
