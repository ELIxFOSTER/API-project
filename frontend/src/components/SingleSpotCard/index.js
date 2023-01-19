import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as spotsActions from '../../store/spots'
import './SingleSpotCard.css'
import { NavLink } from 'react-router-dom';


export default function SpotCard( { spot }) {
    return (
        <>
        <NavLink to={`/spots/${spot.id}`}>
        <div className='spot-card'>
            <div>
                <img className='spot-card-img' src={spot.previewImage} ></img>
            </div>
            <div>
                <span>{spot.name}</span>
            </div>
            <div>
                <span>{spot.city}</span>
            </div>
            <div>
                <span>{spot.price}</span>
            </div>
        </div>
        </NavLink>
        </>
    )
}
