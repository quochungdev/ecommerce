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
import React, { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../App";
import searchIcon from "../assets/image/search.png";
import "../assets/CSS/Header.css";
import CustomNav from "../components/CustomNav";
import { UserShopContext } from "../layouts/MainLayout";
import CartDropdown from "../components/CartDropdown";
import Apis, { endpoints } from "../configs/Apis";
import CustomNavUser from "../components/CustomNavUser";
import { toastError } from "../components/Toast";
const Header = ({ searchKeyword, handleSearch }) => {
  const navigate = useNavigate();
  const [shop] = useContext(UserShopContext);
  const [user, dispatch] = useContext(MyUserContext);
  const logout = () => {
    dispatch({
      type: "logout",
    });
    navigate("/home");
  };
  const [keyword, setKeyword] = useState("");
  const search = async (e) => {
    e.preventDefault(); //
    try {
      if (keyword.trim() === "") {
        return;
      } else {
        let res = await Apis.get(endpoints.search(keyword));
        console.log(res.data);
        navigate(`/search?keyword=${keyword}`, {
          state: { searchData: res.data },
        });
      }
    } catch (error) {
      console.log(error);
      toastError("Không tìm thấy sản phẩm nào");
    }
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const loadCategories = async () => {
      let res = await Apis.get(endpoints["categories"]);
      console.log(res.data);
      setCategories(res.data);
    };
    loadCategories();
  }, []);
  const categoriesMain = categories.filter((cate) => (cate.categoryId === null))
  console.log(categoriesMain);
  const navCustom = [
    {
      id: 1,
      link: "/home",
      isWidth: false,
      navName: "Trang chủ",
      parent: null,
    },
    {
      id: 2,
      isWidth: false,
      link:
        user && user.roleName === "ROLE_ADMIN"
          ? "/admin"
          : shop?.status === 1
          ? "/banhang"
          : "/dang-ky-ban-hang",
      navName:
        user && user.roleName === "ROLE_ADMIN"
          ? "Admin"
          : shop?.status === 1
          ? "Quản lý shop"
          : "Thương gia",
      parent: null,
    },
    {
      id: 3,
      navName: "Danh mục",
      isWidth: true,
      parent: categoriesMain.map((cate) => ({
        link: `/san-pham/${cate.id}`,
        navParentName: cate.name,
        children: null,
      })),
    },
    {
      id: 4,
      link: user ? "" : "/dang-nhap",
      isWidth: false,
      navName: user ? (
        <div className="w-full flex items-center">
          <Image roundedCircle className="w-7" src={user.avatar} alt={user.fullName} />
          <span className="w-4/6">{user.fullName}</span>
        </div>
      ) : (
        "Đăng nhập"
      ),
      parent: user
        ? [
            {
              link: "/thong-tin-ca-nhan",
              navParentName: "Thông tin cá nhân",
            },
            ...(shop
              ? [
                  {
                    link: "/banhang",
                    navParentName: "Quản lý shop",
                  },
                ]
              : []),
            {
              link: "/thong-tin-ca-nhan/donmua",
              navParentName: "Đơn mua",
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
      isWidth: false,
      navName: user ? `Đăng xuất` : "Đăng ký",
      parent: null,
    },
  ];
  return (
    <>
      <div expand="lg" className="  !justify-center  w-full bg-white">
        <div className=" w-full h-20">
          <div className=" w-11/12 h-full mx-auto flex">
            <div className="w-3/12 h-full  items-center justify-center flex">
              <div className="h-3/4 w-full ">
                <Image
                  className="w-full h-full"
                  src="https://penji.co/wp-content/uploads/2019/08/ecommerce_logo_magento.jpg"
                />
              </div>
              <div className="w-full relative">
                <Form>
                  <Form.Control
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Tìm kiếm..."
                    className=" mr-sm-2 "
                  />
                  <button onClick={search} className="absolute right-0 top-1">
                    <img className="w-2/3 mt-1" src={searchIcon} />
                  </button>
                </Form>
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
                    <CustomNav 
                      nav={nav}
                      key={nav.id}
                    />
                  ))}
              </Nav>
            </div>
            <div className="w-2/12 h-full  flex items-center">
              <div className="w-full h-2/5  flex">
                {navCustom.map((nav) => (
                  <>
                    {user && nav.id === 4 ? <CustomNavUser nav={nav} /> : null}
                  </>
                ))}
                <CartDropdown />
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
