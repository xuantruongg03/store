
import banner1 from "./Banner/banner1.png";
import banner2 from "./Banner/banner2.png";
import banner3 from "./Banner/banner3.png";
import { useEffect, useState } from "react";

function CompBanner() {

  const isActive = 0;

  const banners = [
    {
      id: 1,
      value: banner1,
    },
    {
      id: 2,
      value: banner2,
    },
    {
      id: 3,
      value: banner3,
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
