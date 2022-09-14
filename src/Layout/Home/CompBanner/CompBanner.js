

import { useEffect, useState } from "react";

function CompBanner() {

  const isActive = 0;

  const banners = [
    {
      id: 1,
      value: "https://traffic-edge50.cdn.vncdn.io/nvn/ncdn/store3/96878/bn/01_Marc2ffc1317dfa116ebc613e1b464f85d8.png",
    },
    {
      id: 2,
      value: "https://traffic-edge06.cdn.vncdn.io/nvn/ncdn/store3/96878/bn/01_Marc6ef5979b85c2db3ba8c211780c60c9f.jpg",
    },
    {
      id: 3,
      value: "https://traffic-edge29.cdn.vncdn.io/nvn/ncdn/store3/96878/bn/07_Mar960229b53f63d4d2d2ec1043c278cd1f.png",
    },
  ];

  const [active, setActive] = useState(0);

  useEffect (() => {
    setTimeout(() => {
        if (active > 1) {
            setActive(isActive);
        }
        else{
            setActive(active + 1);
        }
    }, 5000);
  })

  const styleBanners = {
    borderRadius: "10px",
    borderTop: "none",
    marginLeft: "50px",
    width: "75%",
    backgroundImage: `url(${banners[active].value})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    marginTop: "10px",
  };

  return (
    <div style={styleBanners}></div>
  )
}

export default CompBanner;
