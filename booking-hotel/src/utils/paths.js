export const baseURL = "http://localhost:8080/api/";

export const PATHS = {
  base: "/",
  login: "/login",
  register: "/register",
  home: "/register",
  explore: "/explore",
  bookings: "/bookings",
  bookingsStatus: "/bookings/:status",
  roomDetails: "/rooms/:id",
  reservationDetailWithSearchParams:
    "/reservation/:roomId?start=startDate&end=endDate&quantity=guests&isPet=pet",
  reservationDetail: "/reservation/:roomId",
  dashboard: "/dashboard",

  rooms: "/manage/rooms",
  roomUpdate: "/manage/rooms/:id",
  manage: "/manage",
  reservations: "/manage/reservation",
  reservationsStatus: "/manage/reservation/:status",
  manageBookings: "/manage/bookings",
  roomAdd: "/manage/room-add",
};
