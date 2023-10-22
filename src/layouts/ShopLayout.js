import React, { createContext, useContext } from "react";
import { MyUserContext } from "../App";
import Header from "../pages/Header";
import Home from "../components/Home";
import { Route, Routes } from "react-router-dom";
import { UserShopContext } from "./MainLayout";
import ShopHome from "../components/Salesman/ShopPage/ShopHome";
import CreateProductComp from "../components/Salesman/ShopPage/CreateProductComp";
import SideNav from "../components/Salesman/ShopPage/SideNav";
import ProductByShop from "../components/Salesman/ShopPage/ProductByShop";
import ManageOrder from "../components/Salesman/ShopPage/ManageOrder";
import Overview from "../components/Salesman/ShopPage/Overview";

export default function ShopLayout({searchKeyword, handleSearch}) {
  const [user] = useContext(MyUserContext);
  const [shop] = useContext(UserShopContext);

  return (
    <>
      <div className="container-background flex w-full h-full">
        <SideNav />
        <div className=" w-5/6 min-h-screen">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/tongquan" element={<Overview />} />
            <Route path="/create-product" element={<CreateProductComp  />} />
            <Route path="/products" element={<ProductByShop searchKeyword={searchKeyword} handleSearch={handleSearch}/>} />
            <Route path="/donhang" element={<ManageOrder searchKeyword={searchKeyword} handleSearch={handleSearch}  />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
