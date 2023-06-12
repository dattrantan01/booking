export const baseURL = "http://localhost:8080/api/";

export const PATHS = {
  base: "/",
  login: "/login",
  home: "/register",
  explore: "/explore",
  bookings: "/bookings",
  bookingsStatus: "/bookings/:status",
  roomDetails: "/room/:id",
  reservationDetailWithSearchParams:
    "/reservation/:roomId?start=startDate&end=endDate&quantity=guests",
  reservationDetail: "/reservation/:roomId",
  dashboard: "/dashboard",
  rooms: "/manage/rooms",
  reservations: "/manage/reservation",
  manageBookings: "/manage/bookings",
  roomAdd: "/manage/room-add",
};
