import React from "react";
import { Dropdown, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import overvewIcon from "../../../assets/image/overview.png";
import CustomNav from "../../CustomNav";
import CustomSideNav from "./CustomSideNav";

export default function SideNav() {
  const location = useLocation();

  const navCustom = [
    {
      id: 1,
      link: "/banhang/tongquan",
      navName: "Tổng quan",
      parent: null,
    },
    {
      id: 2,
      link: "/banhang/products",
      navName: "Quản lý sản phẩm",
      parent: [
        {
          link: "/banhang/create-product",
          navParentName: "Thêm sản phẩm",
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
      <div className="bg-white border m-3 shadow-md w-1/6 min-h-screen">
        <div className="bg-gray-500  text-center p-3">
          <h3 className="text-white">Kênh người bán</h3>
        </div>

        <hr className="text-white border-solid border" />

        <div className="">
          <Nav className="flex flex-col h-full  ">
            {navCustom.map((nav) => (
              <>
                <div
                  key={nav.id}
                  className={`flex p-2 mb-3 px-3   ${
                    location.pathname === nav.link ? "bg-blue-300" : ""
                  } `}
                >
                  <img className="bg-button_color w-auto" src={overvewIcon} />
                  <CustomSideNav nav={nav} />
                </div>
                {nav.parent ? (
                  <div className="ml-5 -mt-3">
                    <ul>
                    {nav.parent.map((nav) => (
                        <li className="py-1 ">
                          <Link
                            className={`decoration-transparent text-black font-semibold text-xs ${
                              location.pathname === nav.link
                                ? "bg-blue-300"
                                : ""
                            }`}
                            to={nav.link}
                          >
                            <span className="mx-2">•</span>{nav.navParentName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  ""
                )}
              </>
            ))}
          </Nav>
        </div>
      </div>
    </>
  );
}
