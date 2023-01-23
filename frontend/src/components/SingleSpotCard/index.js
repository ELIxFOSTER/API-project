import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as spotsActions from '../../store/spots'
import './SingleSpotCard.css'
import { NavLink } from 'react-router-dom';
import star from '../../images/star.png'
import { useParams } from 'react-router-dom';


export default function SpotCard( { spot }) {
    const [random, setRandom] = useState('')

    const {listings} = useParams()

    if (listings) console.log('WORKS')

    let milesAway;

    useEffect(() => {
        setRandom(Math.floor(Math.random()*(999-100+1)+100));
    }, [])

    console.log('yo',milesAway)

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
                <span className='spot-title'>{spot.city}, {spot.state}</span>
                <div className='rating-star-container' >
                    {listings ? (
                        <div className='live-container'>
                        <i id='live-dot' class="fa-solid fa-circle"></i>
                        <span className='live-text' >Live</span>
                        </div>
                    ): (
                        <div className='side-container'>
                        <i class="fa-solid fa-star" id="card-star"></i>
                        <span className='avg-rating'>{spot.avgRating}</span>
                        </div>
                    )}
                </div>
            </div>
            <div classname='spot-details-container' >
                <span className='spot-details'>{random} miles away</span>
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
