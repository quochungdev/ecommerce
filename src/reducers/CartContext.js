import { createContext, useContext, useEffect, useReducer } from "react";
import cookie from "react-cookies";
import { act } from "react-dom/test-utils";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const userId = cookie.load("user") ? cookie.load("user").id : "nobody";
  const initialState = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  // Tạo một reducer để thêm sản phẩm vào giỏ hàng
  function cartReducer(state, action) {
    switch (action.type) {
      case "ADD_TO_CART":
        const { id, quantity: addQuantity = 1 } = action.payload;
        const existProduct = state.find(
          (product) => product.id === id
        );
        if (existProduct) {
          return state.map((product) =>
            product.id === id
              ? {
                  ...product,
                  quantity: product.quantity + addQuantity,
                  total: (product.quantity + addQuantity) * product.price,
                }
              : product
          );
        } else
          return [
            ...state,
            {
              ...action.payload,
              quantity: addQuantity,
              total: action.payload.price * addQuantity,
            },
          ];
      case "DELETE_CART": 
          return state = []

      case "UPDATE_CART":
        return state.map((product) =>
          product.id === action.payload.id
            ? {
                ...product,
                quantity: action.payload.quantity,
                total: action.payload.total,
              }
            : product
        );

      case "REMOVE_FROM_CART":
        return state.filter((product) => product.id !== action.payload.id);
      // Các case khác (ví dụ: REMOVE_FROM_CART) có thể được thêm ở đây
      default:
        return state;
    }
  }

  // Lưu trạng thái giỏ hàng vào localStorage khi có sự thay đổi
  useEffect(() => {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  }, [cart]);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
