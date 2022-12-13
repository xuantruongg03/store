const initState = {
    title: '',
    subkey: '',
}
function itemReducer(state = initState, action) {
    switch (action.type) {
        case 'POST_CART':
            // const src = action.data.src; //image
            const title = action.data.title;
            const infomation = action.data.infomation;
            const price = action.data.price;
            const amount = action.data.amount;
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    // src,
                    title,
                    infomation,
                    price,
                    amount,
                }),
            };
            fetch('http://localhost:3000/cart', requestOptions).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    alert('Đặt hàng thành công! Hãy kiểm tra giỏ hàng của bạn.');
                } else if (response.status === 500) {
                    alert('Lỗi phía Client! Thử lại sau.');
                }
            });
            return state;
        case 'GET_INFO':
            state = action.data
            return state;
        default:
            return state;
    }
}

export default itemReducer;
