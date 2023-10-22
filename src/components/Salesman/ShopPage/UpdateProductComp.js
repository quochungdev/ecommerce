import { useContext, useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";
import { Button, Form, Modal } from "react-bootstrap";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import { toastError, toastSuccess } from "../../Toast";
import updateIcon from "../../../assets/image/refresh.png";
export default function UpdateProductComp({ productId, prod, loadProducts }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [setProducts] = useContext(ProductContext);
  const loadCategories = async () => {
    try {
      let res = await Apis.get(endpoints["categories"]);
      setCategories(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    loadCategories();
  }, []);
  const [name, setName] = useState(prod.name);
  const [desc, setDesc] = useState(prod.description);
  const [price, setPrice] = useState(prod.price);
  const [qty, setQty] = useState(prod.qty);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    prod.category.id
  );

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
  };
  const handleSubCategoryChange = (e) => {
    const selectedSubCategory = e.target.value;
    setSelectedSubCategory(selectedSubCategory);
  };
  const categoryMain = categories.filter((cate) => cate.categoryId == null);
  const subCategory = categories.filter(
    (cate) => cate.categoryId !== null && cate.categoryId.id == selectedCategory
  );

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const updateProduct = async (productId) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("qty", qty);
    formData.append("file", image);
    formData.append("category_id", parseInt(selectedSubCategory));
    if (image) {
      formData.append("thumbnail", image);
    } else {
      const blob = await fetch(prod.thumbnail).then((res) => res.blob());
      const file = new File([blob], "thumbnail.jpg"); // Đặt tên và loại tệp theo ý muốn
      formData.append("thumbnail", file);
    }

    try {
      let res = await authApi().post(
        endpoints.update_product(productId),
        formData
      );
      toastSuccess("Cập nhật thành công");
      loadProducts();
      handleClose();
    } catch (error) {
      toastError("Cập nhật thất bại");
      console.log(error);
    }
  };

  return (
    <>
      <Button className="w-36 ml-5 mr-5 " variant="dark" onClick={handleShow}>
        <div className="flex items-center">
          <img className="w-1/4" src={updateIcon} />
          <span className="pl-2 w-3/4 font-semibold">Cập nhật</span>
        </div>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="">
            <Form.Group className="mb-3 flex">
              <Form.Label className="w-1/4">Tên sản phẩm</Form.Label>
              <Form.Control
                className="w-3/4"
                placeholder="Nhập vào"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3 flex">
              <Form.Label className="w-1/4">Mô tả</Form.Label>
              <Form.Control
                className="w-3/4"
                placeholder="Nhập vào"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                as="textarea"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3 flex">
              <Form.Label className="w-1/4">Số lượng</Form.Label>
              <Form.Control
                className="w-3/4"
                placeholder="Nhập vào"
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3 flex">
              <Form.Label className="w-1/4">Giá cả</Form.Label>
              <Form.Control
                className="w-3/4"
                placeholder="Nhập vào"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3 flex">
              <Form.Label className="w-1/4">Hình ảnh</Form.Label>
              <Form.Control
                className="w-3/4"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                placeholder="Chọn file"
              />
              {image && (
                <img className="w-20" src={URL.createObjectURL(image)} />
              )}
            </Form.Group>
            <Form.Group className="mb-3 flex">
              <Form.Label className="w-1/4">Ngành hàng chính</Form.Label>
              <Form.Control
                value={selectedCategory}
                onChange={handleCategoryChange}
                as="select"
                defaultValue="Chọn ngành hàng"
                className="w-3/4"
              >
                <option value="">Chọn ngành hàng chính</option>
                {categoryMain.map((cate) => (
                  <option key={cate.id} value={cate.id}>
                    {cate.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3 flex">
              <Form.Label className="w-1/4">Ngành hàng phụ</Form.Label>
              <Form.Control
                value={selectedSubCategory}
                onChange={handleSubCategoryChange}
                as="select"
                className="w-3/4"
              >
                <option value="">Chọn ngành hàng phụ</option>
                {subCategory.map((cate) => (
                  <option key={cate.id} value={cate.id}>
                    {cate.name}
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
          <Button variant="primary" onClick={() => updateProduct(productId)}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
