import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import ListMobile from "./Components/ListMobile";
import NavMobile from "./Components/NavMobile";
import About from "./Layout/About";
import Account from "./Layout/Account/Account";
import AllProducts from "./Layout/AllProducts";
import Blog from "./Layout/Blog";
import BlogDetail from "./Layout/BlogDetail";
import Cart from "./Layout/Cart/Cart";
import Checkout from "./Layout/Checkout/Checkout";
import ForgotPassword from "./Layout/ForgotPass";
import Home from "./Layout/Home";
import Login from "./Layout/Login";
import News from "./Layout/News";
import NoPage from "./Layout/NoPage";
import PayComplete from "./Layout/PayComplete";
import Detail from "./Layout/ProductDetail/Detail";
import Register from "./Layout/Register";
import Repair from "./Layout/Repair";
import YourBlog from "./Layout/YourBlogs";
import PrivateRoutes from "./PrivateRoutes";
import Zalo from "./Components/Zalo";
import Like from "./Layout/Like";
// import BookingComplete from "./Layout/BookingComplete/BookingComplete";

function App() {

  const layout = ({ ...childern }) => {
    return (
      <div className="relative">
        <Header />
        {childern}
        <Footer />
        <ListMobile />
        <NavMobile />
        <Zalo/>
      </div>
    );
  };

  return (
    <div className="App ">
      {/* <Header /> */}
      <Routes>
        <Route path="/" index element={layout(<Home />)} />
        <Route path="/product">
          <Route path="" element={layout(<AllProducts />)} />
          <Route path=":title" element={layout(<Detail />)} />
          <Route path="type/:type" element={layout(<AllProducts />)} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/blog" >
            <Route path="my-blog" element={layout(<YourBlog />)} />
            <Route path="create" element={layout(<Blog/>)} />
          </Route>
          <Route path="cart" element={layout(<Cart />)} />
          <Route path="pay" element={layout(<Checkout />)} />
          <Route path="pay-complete" element={layout(<PayComplete />)} />
          <Route path="account" element={layout(<Account />)} />
          <Route path="repair" element={layout(<Repair />)} />
          <Route path="like" element={layout(<Like/>)} />
        </Route>
        <Route path="/news">
          <Route path="" element={layout(<News />)} />
          <Route path=":title" element={layout(<BlogDetail />)} />
        </Route>
        <Route path="/about" element={layout(<About />)} />
        <Route path="/login" element={layout(<Login />)} />
        <Route path="/forgot-password" element={layout(<ForgotPassword />)} />
        <Route path="/register" element={layout(<Register />)} />
        <Route path="*" element={layout(<NoPage />)} />
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
