import { Rating } from "@mui/material";
import React from "react";

const ReviewList = ({ reviews }) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-slate-600 mt-8">Reviews</h2>
      <div className="w-full">
        {reviews &&
          reviews.map((comment, index) => (
            <div
              className="flex flex-col  bg-slate-100 p-3 my-5 rounded"
              key={index}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-11 h-11">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdqXZFnoB9eMvcBSXMRQrtLBL_JhTfjZFbtcu9DiBoJfu4qqFZleZRD_6WTtfoMXkNZB0&usqp=CAU"
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    {comment.customerName}
                  </span>
                </div>
                <div
                  style={{
                    fontWeight: "200",
                    fontSize: "12px",
                    marginLeft: "5px",
                  }}
                >
                  {comment.timeCreate}{" "}
                </div>
                <Rating
                  name="half-rating-read"
                  defaultValue={comment.rating}
                  precision={1}
                  readOnly
                />
              </div>
              <div className="mt-4">{comment.content}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ReviewList;
