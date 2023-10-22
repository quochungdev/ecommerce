import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import checkIcon from "../assets/image/check_icon.png";
export default function PaymentSuccess() {
  return (
    <div className="w-full h-full mb-56">
      <div className=" justify-center flex container mt-5 p-5 shadow-lg ">
        {
          <div className="flex flex-col items-center w-full">
            <img className="w-1/6" src={checkIcon} />
            <h2 className="text-4xl font-bold">Thanh toán thành công</h2>
            <p className="text-xl">
              Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
            </p>
            <div className="w-full flex items-center justify-center">
              <Button className="mx-4 p-3 w-1/4 0" variant="dark">
                <Link to="/home" className="text-white decoration-transparent font-bold">
                  Trang chủ
                </Link>
              </Button>
              <Button className="w-1/4 p-3" variant="success">
                <Link to="/thong-tin-ca-nhan/donmua" className="text-white decoration-transparent font-bold">
                  Kiểm tra đơn hàng
                </Link>
              </Button>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
