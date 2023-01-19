import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as spotsActions from '../../store/spots'
import './SingleSpotCard.css'
import { NavLink } from 'react-router-dom';
import star from '../../images/star.png'


export default function SpotCard( { spot }) {
    return (
        <>
        <div className='spot-card'>
        <NavLink to={`/spots/${spot.id}`}
        style={{ textDecoration: 'none', color: 'black'}}
        >
            <div className='spot-image-container'>
                <img className='spot-card-img' src={spot.previewImage} ></img>
            </div>
            <div className='spot-title-container' >
                <span className='spot-title'>{spot.name}</span>
                <div className='rating-star-container' >
                    <img src={star} className='star-icon'></img>
                    <span className='avg-rating'>{spot.avgRating}</span>
                </div>
            </div>
            <div classname='spot-details-container' >
                <span className='spot-details'>{spot.city}, {spot.state}</span>
            </div>
            <div className='spot-price-container' >
                <span className='spot-price'>${spot.price}</span>
                <span className='spot-night'>night</span>
            </div>
        </NavLink>
        </div>
        </>
    )
}
