import React, { useState } from "react";
import { authApi, endpoints } from "../../../configs/Apis";
import { Button, Modal } from "react-bootstrap";
import deleteIcon from "../../../assets/image/delete.png";
import { toastError, toastSuccess } from "../../Toast";
export default function DeleteProductComp({ productId, loadProducts }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async (productId) => {
    try {
      let res = await authApi().delete(endpoints.delete_product(productId));
      loadProducts();
      toastSuccess("Xóa thành công");
      handleClose();
    } catch (ex) {
      toastError("Xóa thất bại");
      console.error(ex);
    }
  };

  return (
    <>
      <Button className="w-36 ml-5 mr-5 " variant="dark" onClick={handleShow}>
        <div className="flex items-center">
          <img className="w-1/4" src={deleteIcon} />
          <span className="pl-2 w-3/4 font-semibold">Xóa</span>
        </div>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa dòng</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn xóa dòng này ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleDelete(productId);
            }}
          >
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
