import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import ModalCreateAddress from "./ModalCreateAddress";
import { authApi, endpoints } from "../../configs/Apis";
import ModalUpdateAddress from "./ModalUpdateAddress";
import { MyUserContext } from "../../App";
import { toastError, toastSuccess } from "../Toast";
import cookie from "react-cookies";

export default function UpdateUserInfo() {
  const [user] = useContext(MyUserContext);

  const [phone, setPhone] = useState(user.phone);
  const [fullName, setFullname] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    console.log(selectedImage);
    setImage(selectedImage);
  };
  const updateProfile = async () => {
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("phone", phone);
    formData.append("full_Name", fullName);
    formData.append("email", email);
    formData.append("avatar", image);
    if (image) {
      formData.append("avatar", image);
    } else {
      // Nếu không thay đổi thì sử dụng giá trị từ article.avatar
      const blob = await fetch(user.avatar).then((res) => res.blob());
      const file = new File([blob], "avatar.jpg"); // Đặt tên và loại tệp theo ý muốn
      formData.append("avatar", file);
    }
    if (!phone || !fullName || !email) {
      toastError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      let res = await authApi().post(endpoints["user_edit_profile"], formData);
      console.log(user);
      toastSuccess("Cập nhật thành công");
    } catch (error) {
      toastError("Cập nhật thất bại");
      console.log(error);
    }
  };
  return (
    <div className=" bg-white shadow-md h-auto m-10 ">
      <ToastContainer />
      <div className="border p-3">
        <div className=" text-2xl font-semibold px-4 py-1">Hồ sơ của tôi</div>
        <div className=" text-xl px-4">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <div className="border flex">
        <div className=" w-3/5 flex items-center justify-center">
          <Form className="container my-5 ">
            <Form.Group className="mb-3 flex">
              <Form.Label className="w-1/4 mr-7 text-right text-xl ">
                Tên đăng nhập
              </Form.Label>
              <Form.Label className="w-3/4 text-xl font-semibold">
                {user.username}
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3 flex">
              <Form.Label className="w-1/4 text-right px-3 text-xl">
                Tên
              </Form.Label>
              <Form.Control
                className="!w-3/5"
                placeholder="Nhập vào"
                type="text"
                value={fullName}
                onChange={(e) => setFullname(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3 flex">
              <Form.Label className="w-1/4 text-right px-3 text-xl ">
                Email
              </Form.Label>
              <Form.Control
                className="!w-3/5"
                placeholder="Nhập vào"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3 flex">
              <Form.Label className="w-1/4 text-right px-3 text-xl ">
                Số điện thoại
              </Form.Label>
              <Form.Control
                className="!w-3/5"
                placeholder="Nhập vào"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <div className="w-full mt-3 flex justify-center">
              <Button
                variant="dark"
                onClick={updateProfile}
                className="w-2/3 p-2 text-center text-white !font-semibold "
              >
                Lưu
              </Button>
            </div>
            <div></div>
          </Form>
        </div>
        <div className="border-l w-2/5 flex">
          <div className=" flex flex-col items-center justify-center">
            {
              <Image
                className="w-1/4 flex justify-center"
                src={image ? URL.createObjectURL(image) : user.avatar}
                alt="Chưa có hình ảnh"
                roundedCircle
              />
            }
            <div>
              <Form.Group className="p-3 m-2 !font-semibold">
                <Form.Control
                  className="w-3/4"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  placeholder="Chọn file"
                />
              </Form.Group>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
