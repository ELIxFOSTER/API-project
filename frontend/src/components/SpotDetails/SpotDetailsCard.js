import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSpotDetails } from "../../store/spots";
import { NavLink, useParams } from "react-router-dom";
import DeleteSpot from "../DeleteSpot";
import { useSelector } from "react-redux";
import selfCheckIn from '../../images/selfCheckIn.png'

export default function SpotDetailCard({ spot }) {
    const sessionUser = useSelector(state => state.session.user)

    return (
        <div>
            <div>
                <div>
                    <h1>{spot.name}</h1>
                </div>
                <div>
                    <div>{spot.city}</div>
                    <div>{spot.country}</div>
                </div>
                <div>
                    {sessionUser && spot.ownerId === sessionUser.id ? (
                        <>
                        <NavLink to={`/edit-spot/${spot.id}`} >
                            <span>Edit</span>
                        </NavLink>
                        <DeleteSpot />
                        </>
                    ) : (null)}
                </div>
            </div>
            <div>
                {/* //* Reviews here and SUPER HOST */}
            </div>
            <div>
                {spot.SpotImages.map((image) => {
                    return (
                        <div>
                            <img src={image.url}></img>
                        </div>
                    )
                })}
            </div>
            <div>
                <div>
                    <span>Entire House hosted by {spot.Owner.id}</span>
                    <span>14 guests, 4 bedrooms, 9 beds</span>
                    {/* <span>PROFILE PICTURE</span> //* profile picture */}
                </div>
            </div>
            <div>
                <div>
                    {/* <img src={selfCheckIn} ></img> */}
                    <span>Self check-in</span>
                </div>
                <div>
                    <img src={'frontend/src/images/superhost-icon.png'} ></img>
                    <span>{spot.Owner.name} is a Superhost</span>
                </div>
                <div>
                    {/* <img src={} ></img> */}
                    <span>7 day cancellation</span>
                </div>
            </div>

            <div>
                <img src={'frontend/src/images/air-cover-real.png'} ></img>
                <span>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</span>
            </div>
            <div>
                <span>{spot.description}</span>
            </div>
        </div>
    )
}
