const initState = {};
function itemReducer(state = initState, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            const id_sanpham = action.data.id_product;
            const soluong = action.data.amount;
            const id_khachhang = localStorage.getItem("id_khachhang");
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    id_sanpham,
                    soluong,
                    id_khachhang,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            fetch('http://localhost:8000/api/v1/add-to-cart', requestOptions).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    alert('Đặt hàng thành công! Hãy kiểm tra giỏ hàng của bạn.');
                } else if (response.status === 500) {
                    alert('Lỗi phía Client! Thử lại sau.');
                }
            });
            return state;

        case 'GET_INFO':
            return (state = action.data);
        default:
            return state;
    }
}

module.exports = { itemReducer };
