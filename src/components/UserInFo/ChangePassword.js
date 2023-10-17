import React, { useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import securityIcon from "../../assets/image/verified.png";
import keyIcon from "../../assets/image/padlock.png";
import arrowIcon from "../../assets/image/arrow.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { authApi, endpoints } from "../../configs/Apis";
import { toastError, toastSuccess } from "../Toast";
export default function ChangePassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState(null);
  const [rePassword, setRePassword] = useState(null);
  const changePassword = async () => {
    const formData = new FormData();
    if (password !== rePassword) {
      toastError("Mật khẩu không khớp nhau");
      return;
    }
    formData.append("password", password);
    try {
      let res = await authApi().post(endpoints["change_password"], formData);
      toastSuccess("Cập nhật mật khẩu thành công");
      navigate("/home");
    } catch (error) {
      toastError("Cập nhật mật khẩu thất bại");
      console.log(error);
    }
  };
  return (
    <div className="bg-white shadow-md h-auto max-w-2xl mx-auto mt-48">
      <ToastContainer />
      <div className="border">
        <div className=" h-1/3 m-4">
          <div className="flex items-center">
            <div className="w-2/4">
              <Link to="/thong-tin-ca-nhan/verify">
                <Button variant="none" className="">
                  <Image className="" src={arrowIcon} />
                </Button>
              </Link>
            </div>
            <div className="w-3/4 text-2xl font-semibold text-orange-500">
              Nhập mật khẩu mới
            </div>
          </div>
        </div>
        <div className="h-2/3 text-2xl flex flex-col px-32 pb-10">
          <Form>
            <Form.Group className="mb-3 w-full">
              <Form.Control
                type="password"
                autoFocus
                className="p-3"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới"
              />
            </Form.Group>
            <Form.Group className="mb-3 w-full">
              <Form.Control
                type="password"
                autoFocus
                className="p-3"
                onChange={(e) => setRePassword(e.target.value)}
                placeholder="Nhập lại mật khẩu mới"
              />
            </Form.Group>
          </Form>
          <Button
            onClick={changePassword}
            className="!bg-orange-500 border mt-5 text-white"
            variant="none"
            disabled={!password}
          >
            <div className="flex items-center font-bold justify-center p-2">
              <div className="px-4">XÁC NHẬN</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
