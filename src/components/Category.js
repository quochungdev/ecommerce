import React, { useEffect, useState } from "react";
import { Card, Carousel, CarouselItem, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Apis, { endpoints } from "../configs/Apis";

export default function Category() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const loadCategories = async () => {
      let res = await Apis.get(endpoints["categories"]);
      console.log(res.data);
      setCategories(res.data);
    };
    loadCategories();
  }, []);

  // Chia danh sách thành các phần con chứa tối đa 12 mục
  const categoriesMain = categories.filter((cate) => cate.categoryId === null);
  const chunkedCategories = categoriesMain.reduce(
    (resultArray, item, index) => {
      const chunkIndex = Math.floor(index / 12);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // Bắt đầu một phần con mới nếu cần
      }

      resultArray[chunkIndex].push(item);
      return resultArray;
    },
    []
  );

  return (
    <div className="mt-5 container h-full !px-0">
      <div className="bg-white border w-full h-1/5 p-3">
        <h2>DANH MỤC</h2>
      </div>
      <div className="w-full h-96">
        <Carousel data-bs-theme="dark">
          {chunkedCategories.map((chunk, index) => (
            <CarouselItem key={index}>
              <ul className="w-full h-full px-0 flex flex-row flex-wrap">
                {chunk.map((cate) => (
                  <Link
                    key={cate.id}
                    onClick={() => window.scrollTo(0, 0)}
                    to={`/san-pham/${cate.id}`}
                    className="w-2/12 !h-2/4 decoration-transparent"
                  >
                    <Card className="items-center bg-white">
                      <Card.Img
                        className="!w-2/3"
                        variant="top"
                        src={cate.imageUrl}
                      />
                      <Card.Title className="text-black !text-xs">
                        <span>{cate.name}</span>
                      </Card.Title>
                    </Card>
                  </Link>
                ))}
              </ul>
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
