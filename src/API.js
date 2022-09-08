import { useState } from 'react';
function API() {
    const [sale, setSale] = useState([]);
    const [computer, setComputer] = useState([]);
    const [cart, setCart] = useState([]);

    fetch('http://localhost:3000/productSale')
        .then((response) => response.json())
        .then((sale) => {
            setSale(sale);
        })
        .catch((error) => {
            console.error(error);
        });

    fetch('http://localhost:3000/productComputer')
        .then((response) => response.json())
        .then((computer) => {
            setComputer(computer);
        })
        .catch((error) => {
            console.error(error);
        });
    fetch('http://localhost:3000/cart')
        .then((res) => res.json())
        .then((cart) => {
            setCart(cart);
        });
        return {sale, computer, cart};
}

export default API;
