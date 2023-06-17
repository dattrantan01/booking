import React, { useEffect, useState } from "react";
import http from "../../config/axiosConfig";
import { SwiperSlide, Swiper } from "swiper/react";
import Card from "./Card";
import "swiper/css";

const RoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  useEffect(() => {
    http.get("room-types").then((res) => {
      setRoomTypes(res.data);
    });
  }, []);

  return (
    <section className="mb-10 pl-[70px]">
      <h1 className="mb-2 text-3xl font-semibold">
        Find the room that fits your needs
      </h1>
      <h2 className="mb-[80px] text-lg font-light text-gray">
        We have a solution for every needs
      </h2>
      <div className="ml-5">
        <div className="movie-list">
          <Swiper spaceBetween={20} slidesPerView={4.2}>
            {roomTypes.length > 0 &&
              roomTypes.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Card
                      roomTypeName={item.name}
                      description={item.description}
                      url={item.url}
                      id={item.id}
                    ></Card>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default RoomTypes;
