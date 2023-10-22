import React from "react";
import SideNav from "../SideNav";
import ManageAddress from "./ManageAddress";
import { Route, Routes } from "react-router-dom";
import MyPurchase from "./MyPurchase";
import UpdateUserInfo from "./UpdateUserInfo";
import VerifyPassword from "./VerifyPassword";
import PasswordComp from "./PasswordComp";
import ChangePassword from "./ChangePassword";

export default function PersonalInfo() {
  return (
    <>
      <div className="container-background flex w-full h-full">
        <SideNav />
        <div className=" w-5/6 min-h-screen">
          <Routes>
            <Route path="/" element={<UpdateUserInfo />} />
            <Route path="/diachi" element={<ManageAddress />} />
            <Route path="/donmua/" element={<MyPurchase />} />
            <Route path="/change-password" element={<PasswordComp />} />
            <Route path="/verify" element={<VerifyPassword />} />
            <Route path="/change" element={<ChangePassword />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
