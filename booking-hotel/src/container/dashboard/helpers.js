import { PATHS } from "../../utils/paths";
import { AiOutlineHome, AiOutlineCarryOut } from "react-icons/ai";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";

export const sidebarLinks = [
  {
    title: "Rooms",
    url: PATHS.rooms,
    icon: <AiOutlineHome />,
  },
  {
    title: "Reservation",
    url: PATHS.reservations,
    icon: <AiOutlineCarryOut />,
  },
];
