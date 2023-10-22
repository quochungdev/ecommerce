import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import { toastError, toastSuccess } from "../../Toast";
import { UserShopContext } from "../../../layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import { MyUserContext } from "../../../App";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreateProductComp() {
  const [shop] = useContext(UserShopContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedSubCategory, setSelectedSubCategory] = useState(1);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState([]);
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleFileChange = (e) => {
    const selectedImages = e.target.files;
    setFiles(selectedImages);
  };

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

  const createProduct = async () => {
    if (isAddingProduct) {
      return;
    }

    setIsAddingProduct(true); // Đánh dấu rằng đang thêm sản phẩm

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("qty", qty);
    formData.append("thumbnail", image);
    formData.append("category_id", parseInt(selectedSubCategory));

    for (let i = 0; i < files.length; i++) {
      formData.append(`file`, files[i]);
    }

    if (!name || !desc || !price || !qty || !image || !selectedSubCategory) {
      toastError("Thêm thất bại");
      return;
    }
    try {
      let res = await authApi().post(endpoints["create_product"], formData);
      toastSuccess("Thêm thành công");
    } catch (error) {
      toastError("Thêm thất bại");
      console.log(error);
    } finally {
      setIsAddingProduct(false); // Đánh dấu rằng đã hoàn thành thêm sản phẩm
    }
  };

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
  return (
    <div className=" bg-white shadow-md h-auto m-10">
      <ToastContainer />
      <h2 className="text-center pt-8">Thêm sản phẩm</h2>
      <div className="p-5">
        <Form className="">
          <Form.Group className="mb-3 flex">
            <Form.Label className="w-1/6 text-center text-xl font-semibold">
              Tên sản phẩm
            </Form.Label>
            <Form.Control
              className="!w-5/6"
              placeholder="Nhập vào"
              type="text"
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </Form.Group>
          {/* <Form.Group className="mb-3 flex">
            <Form.Label className="w-1/6 text-center text-xl font-semibold">
              Mô tả
            </Form.Label>
            <Form.Control
              className="!w-5/6"
              placeholder="Nhập vào"
              onChange={(e) => setDesc(e.target.value)}
              as="textarea"
              autoFocus
            />
          </Form.Group> */}
          <Form.Group className="mb-3 flex">
            <Form.Label className="w-1/6 text-center text-xl font-semibold">Mô tả</Form.Label>
            <ReactQuill
              className="h-2/3"
              required
              theme="snow"
              value={desc}
              onChange={(newContent) => setDesc(newContent)}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập nội dung
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 flex">
            <Form.Label className="w-1/6 text-center text-xl font-semibold">
              Số lượng
            </Form.Label>
            <Form.Control
              className="!w-5/6"
              placeholder="Nhập vào"
              type="number"
              onChange={(e) => setQty(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3 flex">
            <Form.Label className="w-1/6 text-center text-xl font-semibold">
              Giá
            </Form.Label>
            <Form.Control
              className="!w-5/6"
              placeholder="Nhập vào"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3 flex">
            <Form.Label className="w-1/6 text-center text-xl font-semibold">
              Hình ảnh
            </Form.Label>
            <Form.Control
              className="!w-5/6"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              placeholder="Chọn file"
            />
            {image && <img className="w-20" src={URL.createObjectURL(image)} />}
          </Form.Group>
          <Form.Group className="mb-3 flex">
            <Form.Label className="w-1/6 text-center text-xl font-semibold">
              Hình ảnh phụ
            </Form.Label>
            <Form.Control
              className="!w-5/6"
              type="file"
              name="file"
              accept="image/*"
              onChange={handleFileChange}
              placeholder="Chọn file"
              multiple
            />
          </Form.Group>
          <Form.Group className="mb-3 flex">
            <Form.Label className="w-1/6 text-center text-xl font-semibold">
              Danh mục gốc
            </Form.Label>
            <Form.Control
              value={selectedCategory}
              onChange={handleCategoryChange}
              as="select"
              defaultValue="Chọn ngành hàng"
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
          <Form.Group className="mb-3 flex">
            <Form.Label className="w-1/6 text-center text-xl font-semibold">
              Danh mục phụ
            </Form.Label>
            <Form.Control
              value={selectedSubCategory}
              onChange={handleSubCategoryChange}
              as="select"
              className="!w-5/6"
            >
              <option value="">Chọn Danh mục phụ</option>
              {subCategory.map((cate) => (
                <option key={cate.id} value={cate.id}>
                  {cate.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <div className="w-full flex justify-center">
            <Button
              variant=""
              className="w-2/3 text-center text-white !font-semibold !bg-orange-500"
              onClick={createProduct}
              disabled={isAddingProduct === true}
            >
              Tạo sản phẩm
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
