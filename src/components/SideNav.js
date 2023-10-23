import React from "react";
import { Dropdown, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import overvewIcon from "../assets/image/overview.png";
import CustomSideNav from "../../src/components/Salesman/ShopPage/CustomSideNav";

export default function SideNav() {
  const location = useLocation();
  const navCustom = [
    {
      id: 1,
      link: "/thong-tin-ca-nhan",
      navName: "Thông tin cá nhân",
      parent: [
        {
          link: "/thong-tin-ca-nhan/change-password",
          navParentName: "Đổi mật khẩu",
        },
        {
          link: "/banhang/products",
          navParentName: "Xem sản phẩm",
        },
      ],
    },
    {
      id: 2,
      link: "/thong-tin-ca-nhan/diachi",
      navName: "Cập nhật địa chỉ",
      parent: null,
    },
    {
      id: 3,
      link: "/thong-tin-ca-nhan/donmua",
      navName: "Đơn hàng",
      parent: null,
    },
  ];
  return (
    <>
      <div className="bg-white border m-3 shadow-md w-1/6 min-h-screen">
        <div className="bg-gray-500 text-center p-3">
          <h3 className="text-white">Hồ sơ của tôi</h3>
        </div>

        <hr className="text-white border-solid border" />

        <div className="">
          <Nav className="flex flex-col h-full  ">
            {navCustom.map((nav) => (
              <div
                key={nav.id}
                className={`flex p-2 mb-3 px-3  ${
                  location.pathname === nav.link ? "bg-blue-300" : ""
                }`}
              >
                <img className="bg-button_color w-auto" src={overvewIcon} />
                <CustomSideNav nav={nav} />
              </div>
            ))}
          </Nav>
        </div>
      </div>
    </>
  );
}
