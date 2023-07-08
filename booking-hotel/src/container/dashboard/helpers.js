import { PATHS } from "../../utils/paths";
import { AiOutlineHome, AiOutlineCarryOut } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

export const sidebarLinks = [
  {
    title: "Profile",
    url: PATHS.manage,
    icon: <FaUserCircle />,
  },
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
