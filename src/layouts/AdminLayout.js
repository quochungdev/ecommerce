import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ManageCategory from "../components/dashboard/Category/ManageCategory";
import SideNav from "../components/dashboard/SideNav";
import HeaderAdmin from "../components/dashboard/HeaderAdmin";
import Overview from "../components/dashboard/Overview";
import ManageShop from "../components/dashboard/Shop/ManageShop";
import ManageProduct from "../components/dashboard/Product/ManageProduct";

export default function AdminLayout({searchKeyword, handleSearch}) {

  return (
    <div className="flex h-20 w-full h-full">
      <SideNav />
      <div className=" w-4/5 min-h-screen">
        <HeaderAdmin />
        <div className=" w-full container mt-16">
        <Routes>
          <Route path="/overview" element={<Overview />} />
          <Route path="/category" element={<ManageCategory searchKeyword={searchKeyword} handleSearch={handleSearch} />} />
          <Route path="/shop" element={<ManageShop searchKeyword={searchKeyword} handleSearch={handleSearch} />} />
          <Route path="/product" element={<ManageProduct searchKeyword={searchKeyword} handleSearch={handleSearch} />} />
        </Routes>
        </div>
      </div>
    </div>
  );
}
