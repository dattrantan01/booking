import React from "react";
import Table from "../../../components/table/Table";
import { fakeData, head } from "./helpers";

const RoomsManage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Rooms</h1>
      <Table head={head} data={fakeData} />
    </div>
  );
};

export default RoomsManage;
