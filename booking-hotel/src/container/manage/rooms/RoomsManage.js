import React, { useEffect, useMemo, useRef, useState } from "react";
import Table from "../../../components/table/Table";
import { fakeData, head } from "./helpers";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import http from "../../../config/axiosConfig";
import { BsSearch } from "react-icons/bs";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";
import usePagination from "../../../hooks/usePagination";

const RoomsManage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const userId = user?.id;
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const getListRoom = useRef({});
  const navigate = useNavigate();
  const PER_PAGE = 6;

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

  getListRoom.current = () => {
    setIsLoading(true);
    http
      .get(`rooms/get-by-customer-id/${userId}`)
      .then((res) => {
        console.log(res);
        if (!res.data) return;
        const roomsList = res?.data.map((item) => {
          return {
            id: item?.id,
            roomName: item?.roomName,
            roomType: item?.roomTypeName,
            address: `${item?.address}, ${item?.provinceName}`,
            price: `${item?.price}$`,
            max: item?.maxQuantityPeople,
          };
        });

        setRooms(roomsList);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getListRoom.current();
  }, [userId]);

  const handleDelete = (roomId) => {
    console.log("delete", roomId);
    http
      .delete(`rooms/delete/${roomId}`)
      .then((res) => {
        console.log("delete", res);
        toast.success("Delete Success");
        getListRoom.current();
      })
      .catch((err) => {
        console.log("err: ", err);
      });
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
    <div>
      <h1 className="text-2xl font-bold mb-5">Rooms</h1>
      <div className="relative max-w-[300px] w-full ">
        <input
          className="outline-none pl-5 py-2 pr-8 w-full mb-4 rounded-full border focus:border-primary focus:rounded-xl transition-all"
          placeholder=""
          value={search}
          onChange={handleSearch}
        />
        <div className="absolute right-3 top-3">
          <BsSearch />
        </div>
      </div>
      <Table
        head={head}
        data={currentData()}
        isLoading={isLoading}
        handleDelete={handleDelete}
      />
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

export default RoomsManage;
