import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { authApi, endpoints } from "../../../configs/Apis";
import updateIcon from "../../../assets/image/refresh.png";
import { toastError, toastSuccess } from "../../Toast";

export default function ModalUpdateBanner({ bannerId, banner, loadBanners }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [imageUrl, setImageUrl] = useState(null);
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImageUrl(selectedImage);
  };
  const updateBanner = async (bannerId) => {
    const formData = new FormData();

    if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    } else {
      const blob = await fetch(banner.imageUrl).then((res) => res.blob());
      const file = new File([blob], "imageUrl.jpg"); // Đặt tên và loại tệp theo ý muốn
      formData.append("imageUrl", file);
    }

    if (!imageUrl) {
      toastError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    try {
      let res = await authApi().post(
        endpoints.update_banner(bannerId),
        formData
      );
      loadBanners();
      toastSuccess("Cập nhật thành công");
      handleClose();
    } catch (error) {
      toastError("Cập nhật thất bại");
      console.log(error);
    }
  };

  return (
    <>
      <Button className="w-24 ml-5 mr-5 !bg-button_color" onClick={handleShow}>
        <div className="flex">
          <img className="w-1/3" src={updateIcon} />
          <span className="pl-2 w-2/3 font-semibold">Sửa</span>
        </div>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                placeholder="Chọn file"
              />
              {imageUrl && (
                <img
                  className="w-20"
                  src={URL.createObjectURL(imageUrl)}
                  alt="Avatar Preview"
                />
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => updateBanner(bannerId)}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
