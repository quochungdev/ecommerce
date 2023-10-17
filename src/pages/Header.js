import {
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Image,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { MyUserContext } from "../App";
import cartIcon from "../assets/image/shopping-cart.png";
import heartIcon from "../assets/image/heart.svg";
import "../assets/CSS/Header.css";
import CustomNav from "../components/CustomNav";
import { UserShopContext } from "../layouts/MainLayout";
import NotificationDropdown from "../components/dashboard/NotificationDropdown";
import CartDropdown from "../components/CartDropdown";
const Header = () => {
  const navigate = useNavigate();
  const [shop] = useContext(UserShopContext);
  const [user, dispatch] = useContext(MyUserContext);
  const logout = () => {
    dispatch({
      type: "logout",
    });
    navigate("/home");
  };

  console.log(user);

  const navCustom = [
    {
      id: 1,
      link: "/home",
      navName: "TRANG CHỦ",
      parent: null,
    },
    {
      id: 2,
      link:
        user && user.roleName === "ROLE_ADMIN"
          ? "/admin"
          : shop?.status === 1
          ? "/banhang"
          : "/dang-ky-ban-hang",
      navName:
        user && user.roleName === "ROLE_ADMIN"
          ? "ADMIN"
          : shop?.status === 1
          ? "QUẢN LÝ SHOP"
          : "THƯƠNG GIA",
      parent: null,
    },
    {
      id: 3,
      navName: "SẢN PHẨM",
      parent: [
        {
          navParentName: "Progaming",
          children: null,
        },
        {
          navParentName: "Progaming2",
          children: [
            {
              navChildName: "HTML",
            },
          ],
        },
        {
          navParentName: "Progaming3",
          children: null,
        },
      ],
    },
    {
      id: 4,
      link: user ? "" : "/dang-nhap",
      navName: user ? (
        <div className="w-full flex">
          <img className="w-1/5" src={user.avatar} alt={user.fullName} />
          <span className="w-4/5">{user.fullName}</span>
        </div>
      ) : (
        "ĐĂNG NHẬP"
      ),
      parent: user
        ? [
            {
              link: "/thong-tin-ca-nhan",
              navParentName: "Thông tin cá nhân",
            },
            {
              link: "/banhang",
              navParentName: shop ? "Quản lý shop" : null,
            },
            {
              navParentName: "Đăng xuất",
              action: logout,
            },
          ]
        : null,
    },
    {
      id: 5,
      link: "/dang-ky",
      navName: user ? `ĐĂNG XUẤT` : "ĐĂNG KÝ",
      parent: null,
    },
  ];
  return (
    <>
      <div expand="lg" className="  !justify-center  w-full bg-white">
        <div className=" w-full h-20">
          <div className=" w-10/12 h-full mx-auto flex">
            <div className="w-3/12 h-full  items-center justify-center flex">
              <div className="h-3/4 w-1/2  ">
                <Image
                  className="w-full h-full"
                  src="https://penji.co/wp-content/uploads/2019/08/ecommerce_logo_magento.jpg"
                />
              </div>
            </div>
            <div className="w-7/12 h-full  flex items-center">
              <Nav className=" font-bold text-xl  w-full h-2/5 justify-center ">
                {navCustom
                  .filter((nav) => {
                    // Kiểm tra user và id của nav
                    return user !== null ? nav.id !== 4 && nav.id !== 5 : true;
                  })
                  .map((nav) => (
                    <CustomNav nav={nav} key={nav.id} />
                  ))}
              </Nav>
            </div>
            <div className="w-2/12 h-full  flex items-center">
              <div className="w-full h-2/5  flex">
                {navCustom.map((nav) => (
                  <>{user && nav.id === 4 ? <CustomNav nav={nav} /> : null}</>
                ))}
                <CartDropdown />
                <Image
                  className=" px-4 w-full h-full"
                  to="/home"
                  src={heartIcon}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
