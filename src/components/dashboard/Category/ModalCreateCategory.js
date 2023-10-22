import React, { useContext, useReducer, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import CategoryReducer, {
  ACTION_TYPE,
  CategoryContext,
} from "./CategoryContext";
import { CategoryReducers } from "./ManageCategory";
import addIcon from "../../../assets/image/add.png";
import { toastError, toastSuccess } from "../../Toast";
export default function ModalCreateCategory() {
  const [categories, setCategories] = useContext(CategoryContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const createCategory = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (selectedCategory !== null) {
      formData.append("category_id", selectedCategory);
    }
    formData.append("imageUrl", image);
    if (!name || !image) {
      return;
    }
    try {
      let res = await authApi().post(endpoints["create_category"], formData);
      setCategories((prev) => [...prev, res.data]);
      console.log(res.data);
      toastSuccess("Thêm thành công");
      handleClose();
    } catch (error) {
      toastError("Thêm thất bại");
      console.log(error);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory || null);
  };
  const categoryMain = categories.filter((cate) => cate.categoryId == null);
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
          <Modal.Title>Tạo danh mục mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3 flex">
              <Form.Label className="w-1/6 text-center font-semibold">
                Danh mục gốc
              </Form.Label>
              <Form.Control
                value={selectedCategory}
                onChange={handleCategoryChange}
                as="select"
                defaultValue="Chọn Danh mục"
                className="!w-5/6"
              >
                <option value="">Chọn danh mục gốc</option>
                {categoryMain.map((cate) => (
                  <option key={cate.id} value={cate.id}>
                    {cate.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange} // Gọi hàm khi chọn tệp
                placeholder="Chọn file"
              />
              {image && (
                <img className="w-20" src={URL.createObjectURL(image)} />
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={createCategory}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
