import { Link } from 'react-router-dom';

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
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    data,
                }),
            };
            fetch('http://localhost:3000/pay', requestOptions).then((response) => {});

            return state;

        default:
            return state;
    }
}

export default payReducer;
