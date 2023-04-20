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
// import Booking from "./Layout/Booking/Booking";
// import BookingComplete from "./Layout/BookingComplete/BookingComplete";

function App() {
  const layout = ({ ...childern }) => {
    return (
      <div>
        <Header />
        {childern}
        <Footer />
      </div>
    );
  };

  return (
    <div className="App ">
      {/* <Header /> */}
      <Routes>
        <Route path="/" index element={layout(<Home />)} />
        <Route path="/:title" element={layout(<Detail />)} />

        <Route element={<PrivateRoutes />}>
          <Route path="cart" element={layout(<Cart />)} />
          <Route path="pay" element={layout(<Checkout />)} />
          <Route path="pay-complete" element={layout(<PayComplete />)} />
          <Route path="account" element={layout(<Account />)} />
          {/* <Route path="account" element={layout(<Account />)} />
          <Route path="/booking" element={layout(<Booking />)} />
          <Route
            path="/booking-complete"
            element={layout(<BookingComplete />)}
          /> */}
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
