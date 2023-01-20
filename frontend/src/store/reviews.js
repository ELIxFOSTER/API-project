import { csrfFetch } from "./csrf";

const normalizer = (data) => {
    const normalData = {}
    data.forEach((element) => normalData[element.id] = element)
    return normalData
}

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'


//* Action Creators *//
const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}


//* Thunks *//
export const getReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const reviewsJson = await response.json()
        const normalReviews = normalizer(reviewsJson.Reviews)
        dispatch(loadReviews(normalReviews))
        return normalReviews.Reviews
    }
}

//?
export const EditReview = (reviewData, reviewId) => async() => {
    const updatedReview = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData)
    })

    const actualReview = await updatedReview.json()
    return actualReview
}

//?
export const CreateNewReview = (reviewData, spotId) => async () => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewData)
    })

    if (response.ok) {
        const newReviewData = await response.json()
        return newReviewData
    }
}

//?
export const deleteReviewThunk = (reviewId) => async() => {
    return await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
}

const initialState = { allReviews: {} }

const reviewsReducer = (state = initialState, action) => {
    const reviewsState = { ...state }
    switch (action.type) {
        case LOAD_REVIEWS: {
            reviewsState.allReviews = action.reviews
            return reviewsState
        }
        default:
            return state
    }
}

export default reviewsReducer
