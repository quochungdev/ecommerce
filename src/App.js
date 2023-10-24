import React, { createContext, useReducer, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { Carousel, Image } from "react-bootstrap";
import CarouselMain from "./components/CarouselMain";
import Register from "./components/Register";
import Products from "./components/Products";
import MyUserReducer from "./reducers/MyUserContext";
import cookie from "react-cookies";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Chat from "./components/Chat/Chat";
import { ScrollToTop } from "./components/ScrollToTop";

export const MyUserContext = createContext();

function App() {
  const [user, dispatch] = useReducer(
    MyUserReducer,
    cookie.load("user") || null
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };


  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <BrowserRouter>
        <Routes>
          {/* Sử dụng MainLayout cho các trang user */}

          <Route
            path="/*"
            element={
              <MainLayout
                searchKeyword={searchKeyword}
                handleSearch={handleSearch}
              />
            }
          />
          {/* Sử dụng AdminLayout cho các trang admin */}
          {user && user.roleName === "ROLE_ADMIN" ? (
            <Route
              path="/admin/*"
              element={
                <AdminLayout
                  searchKeyword={searchKeyword}
                  handleSearch={handleSearch}
                />
              }
            />
          ) : (
            // Chuyển hướng người dùng đến '/home' nếu không phải admin
            <Route path="/*" element={<Navigate to="/home" replace />} />
          )}
        </Routes>
      </BrowserRouter>
    </MyUserContext.Provider>
  );
}

export default App;
