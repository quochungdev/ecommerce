import React, { createContext, useContext, useEffect, useState } from "react";
import Header from "../pages/Header";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Products from "../components/Products";
import Onboarding from "../components/Salesman/Onboarding";
import Regisnation from "../components/Salesman/Regisnation";
import Apis, { authApi, endpoints } from "../configs/Apis";
import { MyUserContext } from "../App";
import ShopLayout from "./ShopLayout";
import ProductDetails from "../components/ProductDetails";
import { CartProvider } from "../reducers/CartContext";
import CartPage from "../components/CartPage";
import PersonalInfo from "../components/UserInFo/PersonalInfo";
import PaymentSuccess from "../components/PaymentSuccess";
import Footer from "../pages/Footer";
import SearchPage from "../components/SearchPage";
import Shop from "../components/Shop";

export const UserShopContext = createContext();

export default function MainLayout({ searchKeyword, handleSearch }) {
  const [user] = useContext(MyUserContext);
  const [shop, setShop] = useState(null);
  const checkRoleShop = async () => {
    try {
      let res = await authApi().get(endpoints["role_shop"]);
      setShop(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkRoleShop();
  }, [user]);

  return (
    <>
      <CartProvider>
        <UserShopContext.Provider value={[shop]}>
          <Header searchKeyword={searchKeyword} handleSearch={handleSearch} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dang-nhap" element={<Login />} />
            <Route path="/dang-ky" element={<Register />} />
            <Route path="/san-pham/:id" element={<Products />} />
            <Route path="/chi-tiet-san-pham/:id" element={<ProductDetails />} />
            <Route path="/shop/:shopId" element={<Shop />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/cart/success" element={<PaymentSuccess />} />
            <Route path="/dang-ky-ban-hang" element={<Onboarding />} />
            <Route path="/dang-ky-ban-hang/form" element={<Regisnation />} />
            <Route path="/thong-tin-ca-nhan/*" element={<PersonalInfo />} />
            <Route
              path="/banhang/*"
              element={
                <ShopLayout
                  searchKeyword={searchKeyword}
                  handleSearch={handleSearch}
                />
              }
            />
          </Routes>
          <Footer />
        </UserShopContext.Provider>
      </CartProvider>
    </>
  );
}
