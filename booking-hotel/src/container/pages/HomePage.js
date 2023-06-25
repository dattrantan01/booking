import React from "react";
import SearchBox from "../searchBox/SearchBox";
import RoomTypes from "../roomTypes/RoomTypes";
import RoomRecommend from "../roomRecommend/RoomRecommend";

const HomePage = () => {
  return (
    <>
      <section className="mb-[100px]">
        <div className="relative">
          <div className="image w-[100%] h-[550px]">
            <img
              src="https://images.unsplash.com/photo-1679040630230-d6d4bb460493?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="home"
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
          <div className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-10"></div>
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center mb-7">
              <span className="text-5xl text-white font-medium">
                The best booking place
              </span>
              <span className="text-xl text-white">
                Villa, Home Stay bookable directly online
              </span>
            </div>
            <SearchBox></SearchBox>
          </div>
        </div>
      </section>
      <RoomTypes />
      <RoomRecommend />
    </>
  );
};

export default HomePage;
