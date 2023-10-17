import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Apis, { authApi, endpoints } from "../configs/Apis";
import { Button, FloatingLabel, Form, Image } from "react-bootstrap";
import { useCart } from "../reducers/CartContext";
import { toastError, toastSuccess } from "./Toast";
import { ToastContainer } from "react-toastify";
import { MyUserContext } from "../App";
import cameraIcon from "../assets/image/camera.png";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { formatTime } from "../configs/formatTime";

export default function ProductDetails() {
  let { id } = useParams();
  const [user] = useContext(MyUserContext);
  const [productDetail, setProductDetail] = useState({});
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [selectedstar, setSelectedStar] = useState(null);
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  const createReview = async () => {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("imageUrl", image);
    formData.append("star", selectedstar);

    try {
      let res = await authApi().post(endpoints.create_review(id), formData);
      setReviews((prev) => [...prev, res.data]);
      toastSuccess("Đã gửi đánh giá");
    } catch (error) {
      console.log(error);
      toastError("Có lỗi xảy ra");
    }
  };

  const loadReviews = async () => {
    try {
      let res = await Apis.get(endpoints.reviews(id));
      setReviews(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  const loadProductDetail = async () => {
    try {
      let res = await Apis.get(endpoints.view_detail(id));
      setProductDetail(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  const { dispatch } = useCart();
  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: productDetail });
    toastSuccess("Đã thêm vào giỏ hàng");
  };

  useEffect(() => {
    loadProductDetail();
    loadReviews();
  }, []);

 

  return (
    <div className="container-background">
      <ToastContainer />
      <div className="container bg-white h-auto mt-3 shadow-md">
        <div className="w-full h-full flex">
          <div className="h-full flex flex-col w-2/5 justify-center ">
            <div className=" h-full flex justify-center">
              <img className="" src={productDetail.thumbnail} />
            </div>
            <div className=" h-full flex mt-3">
              <div>
                <img className="pr-3" src={productDetail.thumbnail} />
              </div>
              <div>
                <img className="pr-3" src={productDetail.thumbnail} />
              </div>
              <div>
                <img className="pr-3" src={productDetail.thumbnail} />
              </div>
            </div>
          </div>
          <div className="w-3/5 h-full p-3">
            <div className="text-2xl font-semibold">{productDetail.name}</div>
            <div className="flex">
              <div className="text-red-600 text-4xl font-semibold">{`$${productDetail.price}`}</div>
            </div>
            <div className="w-full h-full mt-4">
              <h3 className="m-3 p-3 bg-gray-100 font-semibold">
                MÔ TẢ SẢN PHẨM
              </h3>
              <div>
                <p>{productDetail.description}</p>
              </div>
            </div>
            <div className="flex my-3">
              <Link to={!user && "/dang-nhap"}>
                <Button variant="dark" className="p-3" onClick={addToCart}>
                  Mua ngay
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container bg-white shadow-md h-auto mt-5 ">
        <div className="p-2 ">
          <h2 className="m-3 p-3 bg-gray-100 font-semibold">
            Thông tin nhà bán
          </h2>
        </div>
        <div className="flex items-center">
          <div className="w-1/12">
            <Image
              className=""
              src={productDetail.shop && productDetail.shop.imageUrl}
              alt="Chưa có hình ảnh"
              roundedCircle
            />
          </div>
          <div className="w-11/12 text-xl font-bold text-red-500">
            {productDetail.shop && productDetail.shop.name}
            <div className="mt-2">
              <Button
                className="mr-2 border px-3 !font-semibold"
                variant="dark"
              >
                Chat ngay
              </Button>
              <Button className="border px-3 !font-semibold" variant="light">
                Xem shop
              </Button>
            </div>
          </div>
        </div>
      </div>

      

      <div className="container bg-white h-auto mt-5 shadow-md">
        <div className="w-full h-full p-3 ">
          <h3 className="m-3 p-3 bg-gray-100 font-semibold">
            ĐÁNH GIÁ SẢN PHẨM
          </h3>
          <div className="ml-3">
            {user ? (
              <Form className="relative">
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Chia sẻ ý kiến của bạn"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    placeholder="Leave a comment here"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        createReview();
                      }
                    }}
                  />
                  <input
                    id="imageInput"
                    className="!w-5/6 "
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </FloatingLabel>
                <label
                  htmlFor="imageInput"
                  className="cursor-pointer image-icon absolute right-4 top-3"
                >
                  <img className="w-8" src={cameraIcon} />
                </label>

                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <MDBIcon
                      key={star}
                      onClick={() => setSelectedStar(star)}
                      far
                      icon="star me-1 hover:!text-red-600"
                      className={`cursor-pointer me-1  ${
                        star <= selectedstar ? "!text-red-600 !font-bold" : ""
                      }`}
                    />
                  ))}
                </div>
              </Form>
            ) : (
              <Link className="text-xl" to={"/dang-nhap"}>
                Vui lòng đăng nhập để sử dụng tính năng này
              </Link>
            )}
            {image && (
              <img className="w-20 mt-2" src={URL.createObjectURL(image)} />
            )}

            <section className="h-auto">
              <MDBContainer className="py-5 !w-full">
                {reviews.map((review) => (
                  <MDBRow className="!w-full">
                    <MDBCol className="!w-full" md="11" lg="9" xl="7">
                      <div className="d-flex flex-start mb-4">
                        <img
                          className="rounded-circle shadow-1-strong me-3 w-1/12 !h-1/2"
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                          alt="avatar"
                        />

                        <MDBCard className="w-full">
                          <MDBCardBody className="">
                            <div>
                              <MDBTypography tag="h5">Johny Cash</MDBTypography>
                              <div>
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <MDBIcon
                                    key={star}
                                    far
                                    icon="star me-1"
                                    className={`cursor-pointer me-1  ${
                                      star <= review.star
                                        ? "!text-red-600 !font-bold"
                                        : ""
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="small mt-1">
                                {formatTime(review.createTime)}
                              </p>
                              <p>{review.content}</p>
                              <div>
                                <img className="w-2/12 h-auto" src={review.imageUrl} />
                              </div>
                            </div>
                          </MDBCardBody>
                        </MDBCard>
                      </div>
                    </MDBCol>
                  </MDBRow>
                ))}
              </MDBContainer>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}