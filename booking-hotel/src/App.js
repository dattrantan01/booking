import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Layout from "./container/layout/Layout";
import HomePage from "./container/pages/HomePage";
import LoginPage from "./container/pages/LoginPage";
import { PATHS } from "./utils/paths";
import ExplorePage from "./container/pages/ExplorePage";
import RoomDetails from "./container/pages/RoomDetails";
import DashBoardLayout from "./container/dashboard/DashBoardLayout";
import RoomsManage from "./container/manage/rooms/RoomsManage";
import RoomAdd from "./container/manage/rooms/RoomAdd";
import BookingLayout from "./container/bookingLayout/BookingLayout";
import ReservationDetailPage from "./container/pages/ReservationDetailPage";
import BookingManagePage from "./container/pages/BookingManagePage";
import Reservations from "./container/manage/reservations/Reservations";
import ReservationsLayout from "./container/reservationsLayout/ReservationsLayout";
import { SearchProvider } from "./context/search-context";

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <Routes>
          <Route path={PATHS.base} element={<Layout />}>
            <Route path={PATHS.base} element={<HomePage />}></Route>
            <Route path={PATHS.explore} element={<ExplorePage />}></Route>
            <Route path={PATHS.roomDetails} element={<RoomDetails />}></Route>
            <Route path={PATHS.bookings} element={<BookingLayout />}>
              <Route
                path={PATHS.bookingsStatus}
                element={<BookingManagePage />}
              ></Route>
            </Route>
            <Route
              path={PATHS.reservationDetail}
              element={<ReservationDetailPage />}
            ></Route>
          </Route>
          <Route
            path={PATHS.manage}
            element={<DashBoardLayout></DashBoardLayout>}
          >
            <Route path={PATHS.rooms} element={<RoomsManage />}></Route>
            <Route path={PATHS.roomAdd} element={<RoomAdd />}></Route>
            <Route path={PATHS.reservations} element={<ReservationsLayout />}>
              <Route
                path={PATHS.reservationsStatus}
                element={<Reservations />}
              ></Route>
            </Route>
          </Route>
          <Route path={PATHS.login} element={<LoginPage />}></Route>
        </Routes>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
