import Banner from "../Components/Banner";
import List from "../Components/List";
import ListProducts from "../Components/ListProducts";

function Home() {
    return ( 
        <div className="container-custom lg:mx-20 md:mx-10 sm:mx-7" >
            <Banner/>
            <List/>
            <ListProducts/>
        </div>
     );
}

export default Home;