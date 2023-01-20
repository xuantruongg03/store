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
            const id_khachhang = 1;
            // const id_sanpham = data.id_product;
            const tennguoinhan = data.name;
            const sdtnguoinhan = data.phone;
            const diachinhan = `${data.address} - ${data.conscious} - ${data.district}`;
            const ghichu = data.notes;
            const hinhthucthanhtoan = data.payment;
            // const soluong = 1;
            const giamgia = 0;

            /**
             * id_khachhang tự cho
             * tennguoinhan
             * diachinhan
             * sdtnguoinhan
             *
             * id_sanpham
             * soluong
             * giamgia
             * hinhthucthanhtoan
             * ghichu
             */

            product.map((element) => {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_khachhang,
                        id_sanpham: element.id_product,
                        tennguoinhan,
                        sdtnguoinhan,
                        diachinhan,
                        ghichu,
                        hinhthucthanhtoan,
                        soluong: element.soluong,
                        giamgia,
                    }),
                };
                fetch('http://localhost:8000/api/v1/buy', requestOptions).then((res) => {
                    console.log(res.status);
                });

            })
            return state;
        default:
            return state;
    }
}

export default payReducer;
