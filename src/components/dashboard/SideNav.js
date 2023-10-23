import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import overvewIcon from "../../assets/image/overview.png";

export default function SideNav() {
  const location = useLocation();

  return (
    <>
      <div className="bg-sidenav_background w-1/6 min-h-screen">
        <div className="text-center p-3">
          <h4 className="text-white">Trang quản trị viên</h4>
        </div>

        <hr className="text-white border-solid border" />

        <div>
          <Nav className="flex flex-col px-4 py-3 h-full ">
            <div
              className={`flex mb-3 p-2 hover:bg-slate-600 ${
                location.pathname === "/admin/overview" ? "bg-slate-600  " : ""
              }`}
            >
              <img className="bg-button_color w-auto" src={overvewIcon} />
              <Link
                className={`decoration-transparent pl-4 text-gray-400 font-semibold  ${
                  location.pathname === "/admin/overview"
                    ? "text-white !font-bold"
                    : ""
                } `}
                to="/admin/overview"
              >
                Tổng quan
              </Link>
            </div>

            <div
              className={`flex mb-3 p-2 hover:bg-slate-600 ${
                location.pathname === "/admin/banner" ? "bg-slate-600  " : ""
              }`}
            >
              <img className="bg-button_color w-auto" src={overvewIcon} />
              <Link
                className={`decoration-transparent pl-4 text-gray-400 font-semibold  ${
                  location.pathname === "/admin/banner"
                    ? "text-white !font-bold"
                    : ""
                } `}
                to="/admin/banner"
              >
                Banner
              </Link>
            </div>

            <div
              className={`flex mb-3 p-2 hover:bg-slate-600 ${
                location.pathname === "/admin/category" ? "bg-slate-600  " : ""
              }`}
            >
              <img className="bg-button_color w-auto" src={overvewIcon} />
              <Link
                className={`decoration-transparent pl-4 text-gray-400 font-semibold  ${
                  location.pathname === "/admin/category"
                    ? "text-white !font-bold"
                    : ""
                } `}
                to="/admin/category"
              >
                Danh mục
              </Link>
            </div>

            <div
              className={`flex mb-3 p-2 hover:bg-slate-600 ${
                location.pathname === "/admin/product" ? "bg-slate-600  " : ""
              }`}
            >
              <img className="bg-button_color w-auto" src={overvewIcon} />
              <Link
                className={`decoration-transparent pl-4 text-gray-400 font-semibold  ${
                  location.pathname === "/admin/product"
                    ? "text-white !font-bold"
                    : ""
                } `}
                to="/admin/product"
              >
                Sản phẩm
              </Link>
            </div>

            <div
              className={`flex mb-3 p-2 hover:bg-slate-600 ${
                location.pathname === "/admin/shop" ? "bg-slate-600  " : ""
              }`}
            >
              <img className="bg-button_color w-auto" src={overvewIcon} />
              <Link
                className={`decoration-transparent pl-4 text-gray-400 font-semibold  ${
                  location.pathname === "/admin/shop"
                    ? "text-white !font-bold"
                    : ""
                } `}
                to="/admin/shop"
              >
                Cửa hàng
              </Link>
            </div>

            <div
              className={`flex mb-3 p-2 hover:bg-slate-600 ${
                location.pathname === "/admin/home" ? "bg-slate-600  " : ""
              }`}
            >
              <img className="bg-button_color w-auto" src={overvewIcon} />
              <Link
                className={`decoration-transparent pl-4 text-gray-400 font-semibold  ${
                  location.pathname === "/admin/users"
                    ? "text-white !font-bold"
                    : ""
                } `}
                to="/admin/users"
              >
                Người dùng
              </Link>
            </div>

            <div
              className={`flex mb-3 p-2 hover:bg-slate-600 ${
                location.pathname === "/admin/payments" ? "bg-slate-600  " : ""
              }`}
            >
              <img className="bg-button_color w-auto" src={overvewIcon} />
              <Link
                className={`decoration-transparent pl-4 text-gray-400 font-semibold  ${
                  location.pathname === "/admin/payments"
                    ? "text-white !font-bold"
                    : ""
                } `}
                to="/admin/payments"
              >
                Thanh toán
              </Link>
            </div>

            <div
              className={`flex mb-3 p-2 hover:bg-slate-600 ${
                location.pathname === "/admin/vouchers" ? "bg-slate-600  " : ""
              }`}
            >
              <img className="bg-button_color w-auto" src={overvewIcon} />
              <Link
                className={`decoration-transparent pl-4 text-gray-400 font-semibold  ${
                  location.pathname === "/admin/vouchers"
                    ? "text-white !font-bold"
                    : ""
                } `}
                to="/admin/vouchers"
              >
                Mã khuyến mãi
              </Link>
            </div>
          </Nav>
        </div>
      </div>
    </>
  );
}
