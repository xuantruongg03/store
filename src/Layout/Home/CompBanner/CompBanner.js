import { useEffect, useState } from 'react';
import { banner } from 'src/data';
import style from './CompBanner.module.scss';

function CompBanner() {
    const isActive = 0;

    const [active, setActive] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            if (active > 1) {
                setActive(isActive);
            } else {
                setActive(active + 1);
            }
        }, 5000);
    });

    const styleBanners = {
        backgroundImage: `url(${banner[active].value})`,
    };

    return <div style={styleBanners} className={style.banner}></div>;
}

export default CompBanner;
