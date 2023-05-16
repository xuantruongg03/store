import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Layout/Home";
import Detail from "./Layout/ProductDetail/Detail";
import NoPage from "./Layout/NoPage";
import Login from "./Layout/Login";
import Register from "./Layout/Register";
import ForgotPassword from "./Layout/ForgotPass";
import PrivateRoutes from "./PrivateRoutes";
import Cart from "./Layout/Cart/Cart";
import Checkout from "./Layout/Checkout/Checkout";
import PayComplete from "./Layout/PayComplete";
import Account from "./Layout/Account/Account";
import NavMobile from "./Components/NavMobile";
import ListMobile from "./Components/ListMobile";
import Repair from "./Layout/Repair";
import AllProducts from "./Layout/AllProducts";
import Blog from "./Layout/Blog";
import News from "./Layout/News";
import BlogDetail from "./Layout/BlogDetail";
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
      </div>
    );
  };

  return (
    <div className="App ">
      {/* <Header /> */}
      <Routes>
        <Route path="/" index element={layout(<Home />)} />
        <Route path="/product">
          <Route path=":title" element={layout(<Detail />)} />
          <Route path="type/:type" element={layout(<AllProducts />)} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/blog" element={layout(<Blog />)} />
          <Route path="cart" element={layout(<Cart />)} />
          <Route path="pay" element={layout(<Checkout />)} />
          <Route path="pay-complete" element={layout(<PayComplete />)} />
          <Route path="account" element={layout(<Account />)} />
          <Route path="/repair" element={layout(<Repair />)} />
        </Route>
        <Route path="/news">
            <Route path="" element={layout(<News/>)}/>
            <Route path=":title" element={layout(<BlogDetail/>)} />
        </Route>
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
