import Banner from "../Components/Banner";
import List from "../Components/List";
import ListProducts from "../Components/ListProducts";

function Home() {
    return ( 
        <div className="container-custom">
            <Banner/>
            <List/>
            <ListProducts/>
        </div>
     );
}

export default Home;