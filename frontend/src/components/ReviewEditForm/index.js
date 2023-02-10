import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { EditReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { getSpotDetails } from "../../store/spots";
import { getReviews } from "../../store/reviews";

export default function ReviewEditForm({ userReview, spotById }) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const reviewId = userReview.id
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState([])

    const refresh = async () => {
        console.log('ayooo', spotById)
        await dispatch(getSpotDetails(spotById.id))
        await dispatch(getReviews(spotById.id))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrors({})
        let reviewData = {
            review,
            stars
        }

        let newReview = await dispatch(EditReview(reviewData, reviewId))
        .catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) {
                setErrors(data.errors)
            }
        })

        if (newReview) {
            closeModal()
            refresh()
        }
    }


    return (
        <>
        <h1>Edit Review</h1>
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.review ? errors.review : null}
                {errors.stars ? errors.stars : null}
            </ul>
            <label>Review label
                <input
                type='textarea'
                value={review}
                onChange={(e) => setReview(e.target.value)}
                />
                <input
                type='number'
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                />
            </label>
            <button >Update</button>
        </form>
        </>
    )
}
