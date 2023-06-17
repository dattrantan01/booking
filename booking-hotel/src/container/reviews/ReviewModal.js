import React, { useState } from "react";
import ReactDOM from "react-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from "../../components/button/Button";
import { Rating } from "@mui/material";

const ReviewModal = ({ handleClose, handleReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  return ReactDOM.createPortal(
    <div className="modal fixed inset-0 z-50 flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black bg-opacity-30 overlay"></div>
      <div
        onClick={handleClose}
        className="w-8 h-8 absolute top-5 right-5 cursor-pointer z-60"
      >
        <AiOutlineCloseCircle className="w-full h-full" />
      </div>
      <div className="relative z-10 rounded-lg w-full max-w-[700px] h-[400px] bg-white px-5 py-5 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-center">Reviews</h2>
          <div className="w-full flex flex-row gap-4 mb-5">
            <span className="font-medium text-lg">Rating:</span>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </div>
          <textarea
            className="border border-slate-200 w-full max-h-[220px] min-h-[220px] h-[220px] rounded p-4 outline-none focus:border-primary"
            value={comment}
            placeholder="Write your comment here . . ."
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <Button onClick={() => handleReview(rating, comment)}>OK</Button>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default ReviewModal;
