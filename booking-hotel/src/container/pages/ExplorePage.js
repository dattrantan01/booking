import React from "react";
import RoomItem from "../RoomItem.js/RoomItem";

const ExplorePage = () => {
  return (
    <div className="w-full flex flex-col mt-[50px]">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-2xl font-[500] mb-4 ml-6">
          Explore a best place to enjoy your vaccation
        </h1>
        <input className="w-full py-5 px-8 rounded-md outline-none border border-gray-300 shadow-sm" />
      </div>
      <div className="mt-[50px] grid grid-cols-4 gap-x-12 w-full max-w-[1400px] gap-y-3 mx-auto">
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
        <RoomItem />
      </div>
    </div>
  );
};

export default ExplorePage;
