import React from "react";

export default function cart() {
  const addToCart = (key) => {
    let products = localStorage.getItem("products"); //

    if (products) {
      products = JSON.parse(products);

      console.log(products);

      let item = products[key];

      let cart = localStorage.getItem("cart");
      if (cart) {
        cart = JSON.parse(cart);
      }

      if (cart == null || cart[0] == null) {
        cart = [
          {
            product: item,
            quantity: 1,
          },
        ];
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        for (cart_item of cart) {
          if (cart_item.product.id == item.id) {
            cart_item.quantity += 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            return;
          }
        }
        cart.push({
          product: item,
          quantity: 1,
        });
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  };
  return <div>cart</div>;
}
