const initState = [];

function cartReducer(state = initState, action) {
    switch (action.type) {
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
