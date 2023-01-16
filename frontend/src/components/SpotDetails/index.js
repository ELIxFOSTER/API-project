import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getSpotDetails } from '../../store/spots'
import SpotName from './Name'



export default function SpotDetails() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spot = useSelector((state) => state.spots.SpotDetails)

    useEffect(() => [
        dispatch(getSpotDetails(spotId))
    ], [dispatch])

    return (
        <>
            <h1>Spot Details Here</h1>
            <h1>{spot.name}</h1>
            <h2>{spot.price}</h2>
        </>
    )
}
