import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as spotsActions from '../../store/spots'
import { useSelector } from 'react-redux'
import Navigation from '../Navigation'
import SpotCard from '../SingleSpotCard'
import './ManageListings.css'

export default function ManageListings() {
const dispatch = useDispatch()
const [spots, setSpots] = useState([])

const currUserSpots = useSelector((state) => Object.values(state.spots.AllSpots))


useEffect(() => {
    const fetchData = async () => {
        const response = await dispatch(spotsActions.getCurrentUserSpots())
        setSpots(response)
    }
    fetchData()
}, [dispatch])

// if (!currUserSpots.length) return null

return (
    <div className='listing-page-wrapper'>
        <div>
            <span>Listings</span>
        </div>
        {currUserSpots.length > 0 ? (
            currUserSpots.map((spot) => {
                return (
                    <div>
                        <div>
                            <SpotCard key={spot.name} spot={spot} />
                        </div>
                    </div>
                )
            })
        ): (
            <div>
                <div>
                    <span>No Listings</span>
                </div>
                <div>
                    <span>List your home</span>
                </div>
            </div>
        )}
    </div>
)

    // return (
    //     <>
    //     <h1>Manage Listings (edit and delete page)</h1>
    //         <NavLink to={'/create-from'}>
    //             <li>Create a new Spot!</li>
    //         </NavLink>
    //     {currUserSpots.length > 0 ? (
    //         currUserSpots.map((spot) => {
    //             return (
    //                 <>
    //                 <NavLink to={`/spots/${spot.id}`}>
    //                     <li>{spot.name}</li>
    //                     <li>{spot.price}</li>
    //                     <img src={spot.previewImage} />
    //                 </NavLink>
    //                 </>
    //             )
    //         })
    //     ): (
    //         <>
    //             <li>No Listings found</li>
    //                 <NavLink to={'/create-from'}>
    //                     <button>Start Hosting!</button>
    //                 </NavLink>
    //         </>
    //     )}
    //     </>
    // )
}
