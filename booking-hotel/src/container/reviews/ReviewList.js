import { Rating } from "@mui/material";
import React from "react";

const ReviewList = ({ reviews }) => {
  return (
    <>
      <h2 className="text-xl font-semibold text-slate-600 mt-8">Reviews</h2>
      <div className="w-full px-5">
        {reviews &&
          reviews.map((comment, index) => (
            <div
              className="flex flex-col  bg-slate-100 p-3 my-5 rounded-md"
              key={index}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/dat-s-blog.appspot.com/o/avatars%2Fjisoo.jpg?alt=media&token=c7c2e937-e989-40a8-8a53-8eb7be63ba4b"
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span className="font-semibold">{comment.customerName}</span>
                </div>
                <div className="font-light text-xs ml-1">
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
