import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Apis, { authApi, endpoints } from "../configs/Apis";
import { Button, FloatingLabel, Form, Image } from "react-bootstrap";
import { useCart } from "../reducers/CartContext";
import { toastError, toastSuccess } from "./Toast";
import { ToastContainer } from "react-toastify";
import { MyUserContext } from "../App";
import cameraIcon from "../assets/image/camera.png";
import minusIcon from "../assets/image/minus.png";
import plusIcon from "../assets/image/plus.png";
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
  const [selectedImage, setSelectedImage] = useState(null); // State to track selected image
  const [showMore, setShowMore] = useState({});
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const toggleShowMore = (prodId) => {
    setShowMore((prev) => ({
      ...prev,
      [prodId]: !prev[prodId],
    }));
  };
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const changeBorderImage = (index) => {
    setSelectedImageIndex(index);
  };

  const createReview = async () => {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("imageUrl", image);
    formData.append("star", selectedstar);
    try {
      let res = await authApi().post(endpoints.create_review(id), formData);
      console.log(res.data);
      if (res.data === "") {
        toastError("Vui lòng mua hàng trước khi đánh giá");
        return;
      } else setReviews((prev) => [...prev, res.data]);
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
      const productDetailWithDefaultQuantity = {
        ...res.data,
        quantity: 1,
      };
      setProductDetail(productDetailWithDefaultQuantity);
    } catch (ex) {
      console.log(ex);
    }
  };

  console.log(productDetail);

  let subImageArray = [];

  if (productDetail.imageSet && Array.isArray(productDetail.imageSet)) {
    subImageArray = [
      productDetail.thumbnail,
      ...productDetail.imageSet.map((i) => i.imageUrl),
    ];
  }

  const { cart, dispatch } = useCart();
  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: productDetail });
    toastSuccess("Đã thêm vào giỏ hàng");
  };

  const decreaseQuantity = () => {
    if (productDetail.quantity > 1) {
      setProductDetail({
        ...productDetail,
        quantity: productDetail.quantity - 1,
      });
    }
  };

  const increaseQuantity = () => {
    if (productDetail.quantity <= productDetail.qty) {
      // Adjust the maximum quantity as needed
      setProductDetail({
        ...productDetail,
        quantity: productDetail.quantity + 1,
      });
    }
  };

  useEffect(() => {
    loadProductDetail();
    loadReviews();
  }, []);

  //  console.log( productDetail.imageSet.map(image => image.imageUrl))
  return (
    <div className="container-background mb-14">
      <ToastContainer />
      <div className="container bg-white h-auto mt-3 shadow-md">
        <div className="w-full h-full flex">
          <div className="h-full flex flex-col w-2/5 justify-center ">
            <div className="w-full h-full flex justify-center">
              <img
                className="w-full"
                src={selectedImage || productDetail.thumbnail} // Use the selected image or thumbnail
              />
            </div>
            <div className="h-36 flex mt-3 mb-5">
              {/* <img
                onClick={() => setSelectedImage(productDetail.thumbnail)}
                className={`relative border w-1/4 mr-3 cursor-pointer ${
                  selectedImageIndex === 0
                    ? `border-5 border-solid border-orange-600`
                    : ""
                }`}
                src={productDetail.thumbnail}
                alt=""
              /> */}
              {productDetail.imageSet &&
                subImageArray.map((s, index) => (
                  <>
                    <div
                      key={index}
                      className="relative border w-1/4 mr-3 cursor-pointer"
                      onClick={() => setSelectedImage(s)}
                    >
                      <img
                        onClick={() => changeBorderImage(index)}
                        className={`h-full  ${
                          index === selectedImageIndex
                            ? `border-5 border-solid border-orange-600`
                            : ""
                        }`}
                        src={s}
                      />
                    </div>
                  </>
                ))}
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
                {showMore[productDetail.id] ? (
                  <div
                    className="rendered-content"
                    dangerouslySetInnerHTML={{
                      __html: productDetail.description,
                    }}
                  />
                ) : (
                  <div
                    className="rendered-content"
                    dangerouslySetInnerHTML={{
                      __html: productDetail.description?.substring(0, 520),
                    }}
                  />
                )}
                {productDetail.description?.length > 180 && (
                  <a
                    className="decoration-emerald-500 pl-5"
                    onClick={() => toggleShowMore(productDetail.id)}
                  >
                    {showMore[productDetail.id] ? "Thu gọn" : "Xem thêm"}
                  </a>
                )}{" "}
              </div>
            </div>
            <div className="flex items-center">
              <div>Số lượng</div>
              <div className="p-4 text-xl font-semibold w-1/3 flex h-full">
                <Button
                  onClick={decreaseQuantity}
                  className="w-1/5 bg-white border"
                >
                  <img src={minusIcon} />
                </Button>
                <input
                  className="w-2/5 border text-center"
                  value={productDetail.quantity}
                  readOnly
                />
                <Button
                  onClick={increaseQuantity}
                  className="w-1/5 bg-white border"
                >
                  <img src={plusIcon} />
                </Button>
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
            Thông tin cửa hàng
          </h2>
        </div>
        <div className="flex items-center pb-5">
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
                <Button
                  onClick={createReview}
                  className="!bg-orange-500 !border-none !font-semibold"
                >
                  Đánh giá
                </Button>
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
                                <img
                                  className="w-2/12 h-auto"
                                  src={review.imageUrl}
                                />
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
