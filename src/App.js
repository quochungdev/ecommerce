import React, { createContext, useReducer, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
          <Route
            path="/*"
            element={
              <MainLayout
                searchKeyword={searchKeyword}
                handleSearch={handleSearch}
              />
            }
          />
          <Route
            path="/admin/*"
            element={
              <AdminLayout
                searchKeyword={searchKeyword}
                handleSearch={handleSearch}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </MyUserContext.Provider>
  );
}

export default App;
