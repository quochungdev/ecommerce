import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { authApi, endpoints } from "../../../configs/Apis";
import { CategoryContext } from "./CategoryContext";
import deleteIcon from "../../../assets/image/delete.png";
import { toastError, toastSuccess } from "../../Toast";

export default function ModalDeleteCategory({ categoryId }) {
  const [categories, setCategories] = useContext(CategoryContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async (categoryId) => {
    try {
      let res = await authApi().delete(endpoints.delete_category(categoryId));
      setCategories((prev) =>prev.filter((cate) => cate.id !== categoryId))
      toastSuccess("Xóa thành công")
      handleClose()
    } catch (ex) {
      toastError("Xóa thất bại")
      console.error(ex);
    }
  };
  return (
    <>
      <Button className=" ml-5 mr-5 !bg-button_color" onClick={handleShow}>
        <div className="flex">
          <img className="w-1/3" src={deleteIcon} />
          <span className="pl-2 w-2/3 font-semibold">Xóa</span>
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
              handleDelete(categoryId);
            }}
          >
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
