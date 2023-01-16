import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as spotsActions from '../../store/spots'
import { useSelector } from 'react-redux'

export default function ManageListings() {
const dispatch = useDispatch()
const [spots, setSpots] = useState([])

const currUserSpots = useSelector((state) => Object.values(state.spots.AllSpots))
// const currUserSpots = []
console.log(currUserSpots.length)

useEffect(() => {
    const fetchData = async () => {
        const response = await dispatch(spotsActions.getCurrentUserSpots())
        setSpots(response)
    }
    fetchData()
}, [dispatch])

    return (
        <>
        <h1>Manage Listings (edit and delete page)</h1>
            <NavLink to={'/create-from'}>
                <li>Create a new Spot!</li>
            </NavLink>
        {currUserSpots.length > 0 ? (
            currUserSpots.map((spot) => {
                return (
                    <>
                    <li>{spot.name}</li>
                    <li>{spot.price}</li>
                    <img src={spot.previewImage} />
                    </>
                )
            })
        ): (
            <>
                <li>No Listings found</li>
                    <NavLink to={'/create-from'}>
                        <button>Start Hosting!</button>
                    </NavLink>
            </>
        )}
        </>
    )
}
