import React, {useState, useEffect} from "react";
import { deleteReviewThunk } from "../../store/reviews";
import { useDispatch } from "react-redux";

export default function DeleteReview({ userReview }) {
    const dispatch = useDispatch()
    const reviewId = userReview.id


    const handleClick = async(e) => {
        e.preventDefault()
        await dispatch(deleteReviewThunk(reviewId))
        window.location.reload(false)   //! idk if this is allowed
    }

    return (
        <span onClick={(e) => handleClick(e)} >Delete Review</span>
    )
}
