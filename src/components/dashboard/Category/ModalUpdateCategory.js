import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { authApi, endpoints } from "../../../configs/Apis";
import { CategoryContext } from "./CategoryContext";
import updateIcon from "../../../assets/image/refresh.png";
import { toastError, toastSuccess } from "../../Toast";

export default function ModalUpdateCategory({ categoryId, category }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [categories, setCategories] = useContext(CategoryContext);

  const [name, setName] = useState(category.name);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory || null);
  };

  const categoryMain = categories.filter((cate) => cate.categoryId == null);
  const subCategory = categories.filter(
    (cate) => cate.categoryId !== null && cate.categoryId.id == selectedCategory
  );

  const updateCategory = async (categoryId) => {
    const formData = new FormData();
    formData.append("name", name);
    if(selectedCategory !== null){
      formData.append("category_id", selectedCategory);
    }
    if (image) {
      formData.append("imageUrl", image);
    } else {
      const blob = await fetch(category.imageUrl).then((res) => res.blob());
      const file = new File([blob], "imageUrl.jpg"); // Đặt tên và loại tệp theo ý muốn
      formData.append("imageUrl", file);
    }

    try {
      let res = await authApi().post(
        endpoints.update_category(categoryId),
        formData
      );
      setCategories((prev) =>
        prev.map((cate) => (cate.id == categoryId ? (cate = res.data) : cate))
      );
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
          <Modal.Title>Cập nhật danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                placeholder="Chọn file"
              />
              {image && (
                <img
                  className="w-20"
                  src={URL.createObjectURL(image)}
                  alt="Avatar Preview"
                />
              )}
            </Form.Group>
            <Form.Group className="mb-3 flex">
              <Form.Label className="w-1/6 text-center text-xl font-semibold">
                Danh mục gốc
              </Form.Label>
              <Form.Control
                value={selectedCategory}
                onChange={handleCategoryChange}
                as="select"
                defaultValue="Chọn danh mục"
                className="!w-5/6"
              >
                <option value="">Chọn danh mục gốc</option>
                {categoryMain.map((cate) => (
                  <option key={cate.id} value={cate.id}>
                    { cate.name }
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => updateCategory(categoryId)}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
