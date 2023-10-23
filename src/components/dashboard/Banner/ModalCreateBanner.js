import React, { useContext, useReducer, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import addIcon from "../../../assets/image/add.png";
import { toastError, toastSuccess } from "../../Toast";
export default function ModalCreateBanner({ loadBanners }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isAdding, setIsAdding] = useState(false);

  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImageUrl(selectedImage);
  };

  const createPayment = async () => {
    const formData = new FormData();
    formData.append("imageUrl", imageUrl);
    if (!imageUrl) {
      return;
    }
    try {
      let res = await authApi().post(endpoints["create_banner"], formData);
      loadBanners();
      toastSuccess("Thêm thành công");
      handleClose();
    } catch (error) {
      toastError("Thêm thất bại");
      console.log(error);
    }
  };

  return (
    <>
      <Button className="w-24 ml-5 mr-5 !bg-button_color" onClick={handleShow}>
        <div className="flex">
          <img className="w-1/3" src={addIcon} />
          <span className="pl-2 w-2/3 font-semibold">Thêm</span>
        </div>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo banner mới</Modal.Title>
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
          <Button variant="primary" onClick={createPayment}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
