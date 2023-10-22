import React, { useContext, useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import CheckIcon from "../../../assets/image/check_icon.png";
import { MyUserContext } from "../../../App";
import { UserShopContext } from "../../../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
export default function Step2({ currentStep, labelArray, updateStep }) {
  const navigate = useNavigate();
  const [shop] = useContext(UserShopContext);
  //Kiểm tra xem shop có null không
  const isShopAvailable = shop !== null;
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <Image className="w-2/12" src={CheckIcon} />
        <h2>Đăng ký thành công</h2>
        <p className="text-xl">Cảm ơn bạn đã đăng ký trở thành người bán</p>
        <p className="text-xl">
          Vui lòng đợi ít nhất 24h để quản trị viên duyệt, bạn sẽ nhận được
          thông báo khi được duyệt
        </p>
      </div>
      <div>
        <Button
          className="!bg-orange-500 !border-none !font-semibold"
          onClick={() => navigate("/home")}
        >
          Quay về trang chủ
        </Button>
      </div>
    </>
  );
}
