import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { EditReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { getSpotDetails } from "../../store/spots";
import { getReviews } from "../../store/reviews";
import './ReviewEditForm.css'

export default function ReviewEditForm({ userReview, spotById }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const reviewId = userReview.id
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState(false)
    // const spot = useState((state) => state.spots.SpotDetails)

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

    // if (!Object.values(spo).length) return null

    return (
        <div className='review-edit-wrapper'>
            <div className='review-edit-top-bar-container'>
                <div className='review-edit-x-icon-box'>
                    <i onClick={closeModal} class="fa-solid fa-x" id="review-x-icon"></i>
                </div>
                <div className='review-edit-title-box'>
                    <h4>Edit review</h4>
                </div>
            </div>
            <div className='review-edit-form-box'>
                <div className='review-edit-box'>
                    <h1>Update review</h1>
                </div>
                <div className='review-edit-form-box'>
                <form onSubmit={handleSubmit}
                className='review-edit-form'
                >
                <textarea
                type='text'
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder='Comments'
                />
                <input
                type='number'
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                placeholder='Star rating'
                />
                <ul className='errors-ul'>
                {errors.review ? <li>{errors.review}</li>: null}
                {errors.stars ? <li>{errors.stars}</li> : null}
            </ul>
            <button >Update</button>
        </form>
                </div>
            </div>
        </div>
    )

    // return (
    //     <>
    //     <h1>Edit Review</h1>
        // <form onSubmit={handleSubmit}>
        //     <ul>
        //         {errors.review ? errors.review : null}
        //         {errors.stars ? errors.stars : null}
        //     </ul>
        //     <label>Review label
        //         <input
        //         type='textarea'
        //         value={review}
        //         onChange={(e) => setReview(e.target.value)}
        //         />
        //         <input
        //         type='number'
        //         value={stars}
        //         onChange={(e) => setStars(e.target.value)}
        //         />
        //     </label>
        //     <button >Update</button>
        // </form>
    //     </>
    // )
}
