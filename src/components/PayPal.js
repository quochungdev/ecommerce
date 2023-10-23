import React, { useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useCart } from "../reducers/CartContext";
import { useState } from "react";
import { toastError } from "./Toast";

export default function Paypal( {buyOrder, totalCart, checkAddress, checkPayment}) {
  const paypal = useRef();
  const { cart } = useCart();
  const [isPaymentComplete, setPaymentComplete] = useState(false);
  // Tính tổng tiền của tất cả các đơn hàng trong giỏ hàng
  const totalAmount = cart.reduce((total, order) => total + order.total, 0);

  // Tạo purchase_unit cho đơn hàng tổng hợp
  const purchase_unit = {
    reference_id: "main_unit",
    description: "Tổng đơn hàng", // Mô tả tổng đơn hàng
    amount: {
      currency_code: "USD",
      value: totalCart, // Tổng tiền của tất cả các đơn hàng
    },
  };

  // Tạo đơn hàng tổng hợp
  const orderData = {
    intent: "CAPTURE",
    purchase_units: [purchase_unit],
  };
  const handlePayment = () => {
    // Hiển thị nút thanh toán PayPal và tạo đơn hàng tổng hợp
    if(cart.length > 0 && checkAddress !== null && checkPayment !== null) {
      window.paypal
      .Buttons({
        style: {
          color:  'blue',
          shape:  'pill',
          label:  'pay',
          height:  55,
          winth: 350,
      },
        createOrder: (data, actions, err) => {
          return actions.order.create(orderData);
        },
        onApprove: async (data, actions) => {
          const capturedOrder = await actions.order.capture();
          console.log(capturedOrder);
          buyOrder()
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
    setPaymentComplete(true);
    }else 
    toastError("Vui lòng nhập đầy đủ thông tin")
  };
  return (
    <div className="container bg-white border justify-center">
      <div className="w-full" ref={paypal}></div>
      {isPaymentComplete ? (
        <p></p>
      ) : (
        <Button
        className="p-4 !mx-0 text-xl w-full !font-bold !bg-black border" onClick={handlePayment}>Thanh toán bằng Paypal</Button>
      )}
    </div>
  );
}
