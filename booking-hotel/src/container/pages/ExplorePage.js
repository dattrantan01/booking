import React, { useState } from "react";
import RoomItem from "../RoomItem.js/RoomItem";
import { BsFilter } from "react-icons/bs";
import FilterRooms from "../filter/FilterRooms";
import { useSearch } from "../../context/search-context";

const ExplorePage = () => {
  const [rooms, setRooms] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { setFilter, filter } = useSearch();

  const handleShowFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handleCloseFilter = () => {
    setShowFilter(false);
  };

  const handleConfirm = (filterValue) => {
    setFilter({
      cityId: filterValue.cityId,
      animal: filterValue.isPet,
      minPrice: filterValue.price[0],
      maxPrice: filterValue.price[1],
      maxQuantityPeople: filterValue.persons,
      roomTypeId: filterValue.roomTypesId,
      roomTypeName: filterValue.roomTypesName,
      cityName: filterValue.cityName,
    });
    setShowFilter(false);
  };

  return (
    <div className="w-full flex flex-col mt-[50px]">
      {showFilter && (
        <FilterRooms
          handleClose={handleCloseFilter}
          handleConfirm={handleConfirm}
        />
      )}
      <div className="w-full max-w-[600px] mx-auto relative z-20">
        <h1 className="text-2xl font-[500] mb-4 ml-3">
          Explore a best place to enjoy your vaccation
        </h1>
        <div className="w-full flex flex-row items-center gap-5">
          <input className="w-full py-5 px-8 rounded-md outline-none border border-gray-300 shadow-sm" />
          <BsFilter
            className="w-10 h-10 cursor-pointer"
            onClick={handleShowFilter}
          />
        </div>
      </div>
      <div className="mt-[50px] grid grid-cols-4 gap-x-12 w-full max-w-[1400px] gap-y-3 mx-auto relative z-0">
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
