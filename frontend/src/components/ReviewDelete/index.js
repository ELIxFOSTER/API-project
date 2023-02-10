import React from "react";
import { deleteReviewThunk } from "../../store/reviews";
import { useDispatch } from "react-redux";
import { getReviews } from "../../store/reviews";
import { getSpotDetails } from "../../store/spots";

export default function DeleteReview({ userReview, spot }) {
    const dispatch = useDispatch()
    const reviewId = userReview.id


    const refresh = async() => {
        await dispatch(getSpotDetails(spot.id))
        await dispatch(getReviews(spot.id))
    }


    const handleClick = async(e) => {
        e.preventDefault()
        await dispatch(deleteReviewThunk(reviewId))
        refresh()
    }



    return (
        <span onClick={(e) => handleClick(e)} >Delete</span>
    )
}
