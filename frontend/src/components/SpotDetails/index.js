import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getSpotDetails } from '../../store/spots'
import SpotDetailsCard from './SpotDetailsCard'
import { getReviews } from '../../store/reviews'


export default function SpotDetails() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spot = useSelector((state) => state.spots.SpotDetails)
    const reviews = useSelector((state) => state.reviews.allReviews)


    useEffect(() => {
        dispatch(getSpotDetails(spotId))
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(getReviews(spotId))
    }, [dispatch, spotId])

    if (!Object.values(spot).length) return null

    return (
        <>
            <SpotDetailsCard spot={spot} reviews={reviews}/>
        </>
    )
}
