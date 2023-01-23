import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteSpotThunk, getSpotDetails } from "../../store/spots";
import { useSelector } from "react-redux";
import './Delete.css'


export default function DeleteSpot() {
const hisotry = useHistory()
const dispatch = useDispatch()
const { spotId } = useParams()

const spot = useSelector((state) => state.spots.SpotDetails)

useEffect(() => {
    dispatch(getSpotDetails(spotId))
}, [dispatch])

const handleClick = async (e) => {
    e.preventDefault()
    await dispatch(deleteSpotThunk(spotId))
    await hisotry.push('/listings')
}

    if (!Object.values(spot).length) return null

    return (
        <span className='delete-button' onClick={(e) => handleClick(e)} >Delete</span>
    )
}
