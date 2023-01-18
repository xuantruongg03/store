import { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CompProductItem from '../../components/CompProducts/CompProductItem';
import './slickBtn.css';
const styles = {
    borderTop: '1px solid gray',
    margin: '0 142px 0 130px',
    position: 'relative',
};

const property = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
};
function ProductsHome(props) {
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    return (
        <div style={styles} id="product">
            <Slider {...property}>
                {props.listProducts.map((product, index) => (
                    <CompProductItem
                        subkey={props.subkey}
                        key={index}
                        title={product.tensanpham}
                        item={product.hinhanh}
                        price={product.giaban}
                        cost={product.giaban}
                        des={product.mota}
                        inf={product.mota}
                        id_product={product.id_sanpham}
                    />
                ))}
            </Slider>
        </div>
    );
}

export default ProductsHome;
