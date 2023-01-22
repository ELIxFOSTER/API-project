import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateNewReview, getReviews } from "../../store/reviews";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { getSpotDetails } from "../../store/spots";

export default function ReviewCreateForm({ spot }) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const history = useHistory()
    // const spotSelector = useSelector((state) => state.spots.SpotDetails)
    console.log('x', spot)


    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState(true)

    const refresh = async () => {
        // await dispatch(getSpotDetails(spotId))
        await dispatch(getReviews(spot.id))
        await dispatch(getSpotDetails(spot.id))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrors({})
        const reviewData = {
            review,
            stars
        }

        let newReview = await dispatch(CreateNewReview(reviewData, spot.id))
        .catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) {
                setErrors(data.errors)
                console.log('these', errors)
                setSubmitted(false)
            }
        })

        if (newReview) {
            closeModal()
            refresh()
        }
    }


    return (
        <>
            <h1>Create Review</h1>
            <form onSubmit={handleSubmit} >
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
            <button >Submit</button>

            </form>
        </>
    )
}
