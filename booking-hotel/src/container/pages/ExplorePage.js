import React, { useEffect, useState } from "react";
import RoomItem from "../RoomItem.js/RoomItem";
import { BsFilter } from "react-icons/bs";
import FilterRooms from "../filter/FilterRooms";
import { useSearch } from "../../context/search-context";
import http from "../../config/axiosConfig";

const ExplorePage = () => {
  const [rooms, setRooms] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { setFilter, filter } = useSearch();

  const filterQuery = ({ ...filter }) => {
    let filterList = "rooms/room-filter";
    const urlString = [];
    if (filter?.cityName) {
      const cityName = filter.cityName.replaceAll(" ", "_");
      urlString.push(`cityName=${cityName}`);
    }
    if (filter?.typeRoomId) {
      urlString.push(`typeRoomId=${filter?.typeRoomId || ""}`);
    }
    if (filter?.cityId) {
      urlString.push(`provinceId=${filter?.cityId || ""}`);
    }
    if (filter?.minPrice) {
      urlString.push(`minPrice=${filter?.minPrice || ""}`);
    }
    if (filter?.maxPrice < 500) {
      urlString.push(`maxPrice=${filter?.maxPrice || ""}`);
    }
    if (filter?.roomName) {
      urlString.push(`roomName=${filter?.roomName || ""}`);
    }
    if (filter?.animal) {
      urlString.push(`animal=${filter?.animal || false}`);
    }
    if (filter?.maxQuantityPeople) {
      urlString.push(`maxQuantityPeople=${filter?.maxQuantityPeople || ""}`);
    }

    if (urlString.length !== 0) {
      filterList = filterList.concat(`?${urlString.join("&")}`);
    }
    return filterList;
  };

  useEffect(() => {
    http.get(filterQuery(filter)).then((response) => {
      setRooms(response?.data);
    });
  }, [filter]);

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
      typeRoomId: filterValue.roomTypesId,
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
        {rooms.map((item) => (
          <RoomItem room={item} />
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
