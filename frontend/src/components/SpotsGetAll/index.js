import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import SpotCard from '../SingleSpotCard';
import './SpotsAll.css'


export default function AllSpots() {
    const dispatch = useDispatch()

    const allSpots = useSelector((state) => state.spots.AllSpots)
    const spots = Object.values(allSpots)
    console.log('steven', spots)


    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    if (!spots.length) return null

    return (
        <>
        <div className='all-spots-card-wrapper' >
            <div className='all-spots-card-container' >
            {spots.map((spot) => {
                return (
                   <SpotCard key={spot.name} spot={spot} />
                )
            })}
            </div>
        </div>
        </>
    )
}
