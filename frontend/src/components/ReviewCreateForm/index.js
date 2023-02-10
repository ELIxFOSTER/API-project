import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CreateNewReview, getReviews } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { getSpotDetails } from "../../store/spots";
import "./ReviewCreateForm.css";

export default function ReviewCreateForm({ spot }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();


  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);

  const refresh = async () => {
    await dispatch(getReviews(spot.id));
    await dispatch(getSpotDetails(spot.id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    const reviewData = {
      review,
      stars,
    };

    let newReview = await dispatch(CreateNewReview(reviewData, spot.id)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
          console.log("these", errors);
        }
      }
    );

    if (newReview) {
      closeModal();
      refresh();
    }
  };

  return (
    <div className="login-form-wrapper">
      <div className="login-top-bar-container">
        <div className="login-x-icon-box">
          <i onClick={closeModal} class="fa-solid fa-x" id="review-x-icon"></i>
        </div>
        <div className="login-title-box">
          <h4>Leave a review</h4>
        </div>
      </div>
      <div className="welcome-login-form-box">
        <div className="welcome-login-box">
          <h1>How was your stay?</h1>
        </div>
        <div className="login-form-box"></div>
        <form onSubmit={handleSubmit} className="login-form">
          <textarea
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            placeholder="Comments"
          />
          <input
            type="number"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
            placeholder="Star review"
          />
          <ul className='errors-ul'>
            {errors.review ? <li>{errors.review}</li> : null}
            {errors.stars ? <li>{errors.stars}</li> : null}
          </ul>
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
}
