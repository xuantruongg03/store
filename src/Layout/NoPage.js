import { useEffect } from 'react';
import image from '../access/image/404.jpg';
const NoPage = () => {
    useEffect(() => {
        document.title = 'Không tìm thấy yêu cầu';
    }, []);

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
