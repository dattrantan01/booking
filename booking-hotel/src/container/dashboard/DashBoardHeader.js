import React from "react";
import { useAuth } from "../../context/authContext";
import "./styles.scss";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../utils/paths";

const DashBoardHeader = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    navigate(PATHS.roomAdd);
  };

  return (
    <div className="dashboard-header">
      <div className="flex flex-row gap-4">
        <Button onClick={handleCreateRoom}>Create room</Button>
        <div className="w-[50px] h-[50px]">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/dat-s-blog.appspot.com/o/avatars%2Fjisoo.jpg?alt=media&token=c7c2e937-e989-40a8-8a53-8eb7be63ba4b"
            }
            alt=""
            className="rounded-full object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoardHeader;
