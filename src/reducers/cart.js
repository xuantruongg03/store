const initState = {
    title: 'Hello World',
};
function cartReducer(state = initState, action) {
    switch (action.type) {
        case 'DELETE_CART':
            // xoa sp
            select = [];
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
                        if (select[i] == id) {
                            select.splice(i, 1);
                        }
                    }
                });
            });
            break;
        default:
            return state;
    }
}

export default cartReducer;
