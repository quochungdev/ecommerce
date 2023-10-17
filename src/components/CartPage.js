import React, { useContext, useEffect, useState } from "react";
import { useCart } from "../reducers/CartContext";
import minusIcon from "../assets/image/minus.png";
import plusIcon from "../assets/image/plus.png";
import cartIcon from "../assets/image/shopping-cart.png";
import { Button, Image } from "react-bootstrap";
import Apis, { authApi, endpoints } from "../configs/Apis";
import { MyUserContext } from "../App";
import { toastError, toastSuccess } from "./Toast";
import { ToastContainer } from "react-toastify";
import ModalCreateAddress from "../components/UserInFo/ModalCreateAddress";
import ModalSelectAddress from "./ModalSelectAddress";
import PayPal from "./PayPal";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [showPaypal, setShowPaypal] = useState(false);
  const navigate = useNavigate();
  const { cart, dispatch } = useCart();
  const [user] = useContext(MyUserContext);
  const handleDecrease = (productId) => {
    const newQuantity =
      cart.find((product) => product.id === productId && product.quantity > 0)
        ?.quantity - 1 || 0;
    const newPrice = cart.find((product) => product.id === productId)?.price;
    const updateProduct = {
      id: productId,
      quantity: newQuantity,
      total: newQuantity * newPrice,
    };
    dispatch({ type: "UPDATE_CART", payload: updateProduct });
  };
  const handleIncrease = (productId) => {
    const newQuantity =
      cart.find(
        (product) => product.id === productId && product.quantity <= product.qty
      )?.quantity + 1 || 0;
    const newPrice = cart.find((product) => product.id === productId)?.price;
    const updateProduct = {
      id: productId,
      quantity: newQuantity,
      total: newQuantity * newPrice,
    };
    dispatch({ type: "UPDATE_CART", payload: updateProduct });
  };

  const [userAddress, setUserAddress] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [payments, setPayments] = useState([]);
  const loadVouchers = async () => {
    try {
      let res = await Apis.get(endpoints["vouchers"]);
      setVouchers(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  const loadPayments = async () => {
    try {
      let res = await Apis.get(endpoints["payments"]);
      setPayments(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  const loadAddressUser = async () => {
    try {
      let res = await authApi().get(endpoints["user_address"]);
      setUserAddress(res.data);
      console.log(res.data);
    } catch (ex) {
      console.log(ex);
    }
  };
  console.log(cart);
  let totalAmount = cart.reduce((total, product) => total + product.total, 0);
  useEffect(() => {
    loadAddressUser();
    loadVouchers();
    loadPayments();
  }, []);

  const [selectedVoucherId, setSelectedVoucherId] = useState(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const handleAddressSelected = (address) => {
    setSelectedAddress(address);
  };

  const createOrder = async () => {
    if (!selectedPaymentId || !selectedAddress) {
      toastError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    try {
      let res = await authApi().post(endpoints["order_pay"], {
        infoProduct: cart,
        payment: selectedPaymentId,
        voucher: selectedVoucherId,
        address: selectedAddress.id,
      });
      console.log(res.data);
      localStorage.removeItem(`cart_${user.id}`);
      toastSuccess("Thanh toán thành công");
      navigate("/cart/success");
    } catch (error) {
      toastError("Thêm thất bại");
      console.log(error);
    }
  };
  let totalCart = selectedVoucherId && (totalAmount - (totalAmount * (selectedVoucherId.value/100)))

  return (
    <>
      <div className="bg-orange-300 h-20 flex items-center ">
        <ToastContainer />
        <div className="container flex">
          <Image src={cartIcon} />
          <h2 className="mx-3">Giỏ Hàng</h2>
        </div>
      </div>
      <div className="container-background min-h-screen">
        <div className="container mt-3 bg-white border">
          <div className="p-4 text-xl font-bold text-red-500">
            Địa chỉ nhận hàng
          </div>
          <div className="flex">
            <div className="p-4 text-xl ">
              {selectedAddress ? (
                `${selectedAddress.address}, ${selectedAddress.ward}, ${selectedAddress.city}`
              ) : (
                <div className="text-red-500">
                  Bạn chưa chọn địa chỉ nhận hàng
                </div>
              )}
            </div>
            <ModalSelectAddress onAddressSelected={handleAddressSelected} />
          </div>
        </div>
        <div className="container mt-3 bg-white flex justify-between border">
          <div className="p-4 text-xl font-bold">Sản Phẩm</div>
          <div className="p-4 text-xl font-bold">Đơn Giá</div>
          <div className="p-4 text-xl font-bold">Số Lượng</div>
          <div className="p-4 text-xl font-bold">Thành Tiền</div>
          <div className="p-4 text-xl font-bold">Thao Tác</div>
        </div>
        <div className="mt-3">
          {cart.length > 0 ? (
            cart.map((c) => (
              <div className="container bg-white flex justify-between flex-wrap border">
                <>
                  <div className="p-4 text-xl font-bold flex w-1/5">
                    <div>
                      <img className="h-3/5" src={c.thumbnail} />
                    </div>
                    <div className="">{c.name}</div>
                  </div>
                  <div className="p-4 text-xl font-bold w-1/5">{c.price}</div>
                  <div className="p-4 text-xl font-bold w-1/5 flex h-full">
                    <Button
                      onClick={() => handleDecrease(c.id)}
                      className="w-1/5 bg-white border"
                    >
                      <img src={minusIcon} />
                    </Button>
                    <input
                      className="w-1/5 border text-center"
                      value={c.quantity}
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="0"
                      max="5"
                    />
                    <Button
                      onClick={() => handleIncrease(c.id)}
                      className="w-1/5 bg-white border"
                    >
                      <img src={plusIcon} />
                    </Button>
                  </div>
                  <div className="p-4 text-xl font-bold w-1/5">{c.total}</div>
                  <div className="p-4 text-xl font-bold w-1/5">Thao Tác</div>
                </>
              </div>
            ))
          ) : (
            <div className="text-center font-bold text-red-500 text-2xl ">
              Chưa có sản phẩm nào trong giỏ hàng
            </div>
          )}
        </div>
        <div className="container mt-3 bg-white  border">
          <div className="p-4 text-2xl font-bold ">Voucher</div>
          <div className="flex mb-4">
            {vouchers.map((voucher) => (
              <Button
                variant="none"
                className={`p-4 mx-3 text-xl text-black bg-red-400 !font-bold !border !border-red-500 flex ${
                  selectedVoucherId?.id === voucher.id
                    ? " !bg-yellow-500  !border"
                    : ""
                }`}
                onClick={() => setSelectedVoucherId(voucher)}
              >
                <div>{voucher.name}</div>
              </Button>
            ))}
          </div>
        </div>
        <div className="container mt-3 bg-white  border flex flex-col">
          <div className="flex">
            <div className="px-4 py-2 text-2xl font-semibold  ">Tổng tiền: </div>
            <div className=" py-2 text-2xl font-semibold  text-red-600">
              ${totalAmount}
            </div>
          </div>
          <div className="flex">
            <div className="px-4 py-2 text-xl font-semibold  ">Giảm giá: </div>
            <div className=" py-2 text-xl font-semibold  text-red-600">
              {`${selectedVoucherId ? selectedVoucherId.value : 0}%`}
            </div>
          </div>
          <div className="flex">
            <div className="px-4 py-2 text-3xl font-bold ">Thành tiền: </div>
            <div className="px-4 py-2 text-3xl font-bold text-red-600">
              ${totalCart ? totalCart : totalAmount}
            </div>
          </div>
        </div>
        <div className="container mt-3 bg-white  border">
          <div className="p-4 text-2xl font-bold ">Phương thức thanh toán</div>
          <div className="flex mb-4">
            {payments.map((p) => (
              <Button
                variant="none"
                className={`p-4 mx-3 text-xl text-black bg-red-400 !font-bold !border !border-red-500 flex ${
                  selectedPaymentId?.id === p.id
                    ? "!bg-yellow-500  !border "
                    : ""
                }`}
                onClick={() => {
                  setSelectedPaymentId(p);
                  if (p.name === "Paypal") {
                    setShowPaypal(true);
                  } else {
                    setShowPaypal(false);
                  }
                }}
              >
                <div>{p.name}</div>
              </Button>
            ))}
          </div>
        </div>
        <div className="container mt-3 bg-white border flex justify-center">
          {showPaypal ? (
            <PayPal
              checkPayment={selectedPaymentId}
              checkAddress={selectedAddress}
              totalCart={totalCart}
              buyOrder={createOrder}
            />
          ) : (
            <Button
              onClick={createOrder}
              className=" p-4 !mx-0 text-xl w-full !font-bold !bg-black border "
            >
              <div>Thanh toán bằng tiền mặt</div>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
