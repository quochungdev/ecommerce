import React from "react";
import { Dropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import overvewIcon from "../../../assets/image/overview.png";
import CustomNav from "../../CustomNav";
import CustomSideNav from "./CustomSideNav";

export default function SideNav() {
  const navCustom = [
    {
      id: 1,
      link: "/banhang/tongquan",
      navName: "Tổng quan",
      parent: null,
    },
    {
      id: 2,
      link: "/banhang",
      navName: "Quản lý sản phẩm",
      parent: [
        {
          link: "/banhang/create-product",
          navParentName: "Thêm sản phẩm",
        },
        {
          link: "/banhang/products",
          navParentName: "Xem sản phẩm",
        },
      ],
    },
    {
      id: 3,
      link: "/banhang/donhang",
      navName: "Quản lý đơn hàng",
      parent: null,
    },
  ];
  return (
    <>
      <div className="bg-white shadow-md w-1/6 min-h-screen">
        <div className="text-center p-3">
          <h3 className="">Kênh người bán</h3>
        </div>

        <hr className="text-white border-solid border" />

        <div className="">
          <Nav className="flex flex-col h-full  ">
            {navCustom.map((nav) => (
              <div key={nav.id} className="flex p-2 mb-5 px-3">
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
