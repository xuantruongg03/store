import image from '../access/image/404.jpg';
const NoPage = () => {

    const style = {
        width: '100%',
        height: '700px',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return <div style={style}/>;
};

export default NoPage;
