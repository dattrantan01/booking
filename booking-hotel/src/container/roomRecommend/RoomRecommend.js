import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import http from "../../config/axiosConfig";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import FavoriteItem from "./FavoriteItem";

const RoomRecommend = () => {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  let idCustomer = user.id || "none";

  useEffect(() => {
    http.get(`rooms/favorite/customer/${idCustomer}`).then((res) => {
      setData(res.data);
    });
  }, [idCustomer]);
  return (
    <section className="mb-10 pl-[70px]">
      <h2 className="mb-10 text-3xl font-semibold">
        Rooms that might be right for you
      </h2>
      <div className="movie-list">
        <Swiper spaceBetween={20} slidesPerView={4.2}>
          {data?.length > 0 &&
            data.map((room, index) => {
              return (
                <SwiperSlide key={index}>
                  <FavoriteItem
                    key={room.id}
                    url={room.imageDtos[0].url}
                    address={`${room.address}, ${room.provinceName}`}
                    roomName={room.roomName}
                    roomTypeName={room.roomTypeName}
                    price={room.price}
                    id={room.id}
                    typeRoomId={room.typeRoomId}
                    averageRating={room.averageRating}
                  ></FavoriteItem>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </section>
  );
};

export default RoomRecommend;
