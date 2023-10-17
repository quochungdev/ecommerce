import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserShopContext } from "../../layouts/MainLayout";
import { MyUserContext } from "../../App";

export default function Onboarding() {
  const [user] = useContext(MyUserContext)
  const [shop] = useContext(UserShopContext);
  return (
    <div className="w-full h-full ">
      <div className=" justify-center flex container mt-5 p-5 shadow-lg ">
        {
          <div className="flex flex-col items-center">
            <img
              className="w-2/6"
              src="https://deo.shopeesz.com/shopee/pap-admin-live-sg/upload/upload_9dab85081088531ee6d1aa958a90f55e.png"
            />
            <h4>Chào mừng bạn đến E-commerce dành cho người bán</h4>
            <p>
              Để đăng ký bán hàng trên Shopee, bạn cần cung cấp một số thông tin
              cơ bản.
            </p>
            <Button>
              <Link
                to={user ? "/dang-ky-ban-hang/form" : "/dang-nhap"}
                className="text-white decoration-transparent"
              >
                Đăng ký
              </Link>
            </Button>
          </div>
        }
      </div>
    </div>
  );
}
