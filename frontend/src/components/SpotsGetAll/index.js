import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as spotsActions from '../../store/spots'
import SpotCard from '../SingleSpotCard';
import './SpotsAll.css'


export default function AllSpots() {
    const dispatch = useDispatch()
    const [spots, setSpots] = useState([])


    const allSpots = useSelector((state) => Object.values(state.spots.AllSpots))

    useEffect(() => {
            const  fetchData = async () => {
            const response = await dispatch(spotsActions.getAllSpots())
            setSpots(response)
        }
        fetchData()
        // return dispatch(spotsActions.getAllSpots())
    }, [dispatch])


    return (
        <>
            <h1>Home for Get All Spots</h1>
            <div className='all-spots' >
            {spots.map((spot) => {
                return (
                   <SpotCard key={spot.name} spot={spot} />
                )
            })}
            </div>
            <h1>Yo</h1>
        </>
    )
}
