import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ManageCategory from "../components/dashboard/Category/ManageCategory";
import SideNav from "../components/dashboard/SideNav";
import HeaderAdmin from "../components/dashboard/HeaderAdmin";
import Overview from "../components/dashboard/Overview";
import ManageShop from "../components/dashboard/Shop/ManageShop";
import ManageProduct from "../components/dashboard/Product/ManageProduct";
import ManageUser from "../components/dashboard/User/ManageUser";
import ManagePayment from "../components/dashboard/Payment/ManagePayment";
import ManageVoucher from "../components/dashboard/Voucher/ManageVoucher";
import ManageBanner from "../components/dashboard/Banner/ManageBanner";

export default function AdminLayout({searchKeyword, handleSearch}) {

  return (
    <div className="flex w-full h-full">
      <SideNav />
      <div className=" w-5/6 min-h-screen">
        <HeaderAdmin />
        <div className="w-full container mt-16">
        <Routes>
          <Route path="/overview" element={<Overview />} />
          <Route path="/category" element={<ManageCategory searchKeyword={searchKeyword} handleSearch={handleSearch} />} />
          <Route path="/shop" element={<ManageShop searchKeyword={searchKeyword} handleSearch={handleSearch} />} />
          <Route path="/product" element={<ManageProduct searchKeyword={searchKeyword} handleSearch={handleSearch} />} />
          <Route path="/users" element={<ManageUser searchKeyword={searchKeyword} handleSearch={handleSearch} />} />
          <Route path="/payments" element={<ManagePayment searchKeyword={searchKeyword} handleSearch={handleSearch} />} />
          <Route path="/vouchers" element={<ManageVoucher searchKeyword={searchKeyword} handleSearch={handleSearch} />} />
          <Route path="/banner" element={<ManageBanner searchKeyword={searchKeyword} handleSearch={handleSearch} />} />
        </Routes>
        </div>
      </div>
    </div>
  );
}
