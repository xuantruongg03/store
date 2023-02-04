import { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
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
                        title={product.product_name}
                        item={product.product_images[0].file_path}
                        price={product.product_price - product.product_sale_price * product.product_price/100}
                        cost={product.product_price}
                        sale={product.product_sale_price}
                        des={product.product_description}
                        product_id={product.product_id}
                    />
                ))}
            </Slider>
        </div>
    );
}

export default ProductsHome;
