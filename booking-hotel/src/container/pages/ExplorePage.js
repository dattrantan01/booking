import React, { useEffect, useState, useMemo } from "react";
import RoomItem from "../RoomItem.js/RoomItem";
import { BsFilter } from "react-icons/bs";
import FilterRooms from "../filter/FilterRooms";
import { useSearch } from "../../context/search-context";
import http from "../../config/axiosConfig";
import usePagination from "../../hooks/usePagination";
import { Pagination } from "@mui/material";

const ExplorePage = () => {
  const [rooms, setRooms] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { setFilter, filter } = useSearch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const PER_PAGE = 16;

  const searchData = useMemo(() => {
    const searchHandle = search.trim().toLowerCase();
    if (searchHandle === "") {
      return rooms;
    } else {
      if (rooms) {
        const roomsSearch = rooms.filter((room) => {
          return room.roomName?.toLowerCase().includes(searchHandle);
        });
        return roomsSearch;
      } else {
        return [];
      }
    }
  }, [search, rooms]);

  const count = Math.ceil(searchData.length / PER_PAGE);

  const { currentData, jump } = usePagination(searchData, PER_PAGE);

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

  const handlePagination = (e, page) => {
    setPage(page);
    console.log("page", page);
    jump(page);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    jump(1);
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
          Explore a best place to enjoy your vacation
        </h1>
        <div className="w-full flex flex-row items-center gap-5">
          <input
            onChange={handleSearch}
            value={search}
            className="w-full py-5 px-8 rounded-md outline-none border border-gray-300 shadow-sm"
          />
          <BsFilter
            className="w-10 h-10 cursor-pointer"
            onClick={handleShowFilter}
          />
        </div>
      </div>
      <div className="mt-[50px] grid grid-cols-4 gap-x-12 w-full max-w-[1400px] gap-y-3 mx-auto relative z-0">
        {currentData()?.map((item) => (
          <RoomItem room={item} />
        ))}
      </div>
      <div className="flex justify-end mt-5">
        <Pagination
          count={count}
          variant="outlined"
          color="primary"
          page={page}
          onChange={handlePagination}
        />
      </div>
    </div>
  );
};

export default ExplorePage;
